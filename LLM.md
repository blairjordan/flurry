# Flurry LLM Prompt

## Notable Files

```
- **api/**
  - crontab, eslint.config.mjs
  - src/: graphiql.html, index.ts, lib/, services/, tasks/, types.d.ts

- **client/**
  - index.html, public/, scripts/split-image.sh
  - src/: App.tsx, AuthenticatedApp.tsx, Authentication.tsx
    - components/ (forms, modals, etc.)
    - context/AuthContext.tsx
    - game/: EventBus.ts, main.ts, PhaserGame.tsx, scenes/main.ts
    - graphql/: index.ts, mutations/, queries/, subscriptions/
    - hooks/, lib/, index.css, MainApp.tsx, main.tsx
    - redux/: actions.ts, initialState.ts, reducers.ts, store.ts
    - types/
  - tailwind.config.js, tsconfig.json, tsconfig.node.json
  - vite/: config.dev.mjs, config.prod.mjs

- **db/**
  - migrations/, package.json, scripts/createdb.sh

- **docker**
  - Dockerfile.api, Dockerfile.client

- **docs/**
  - items.md

- **root**
  - LLM.md, package.json, pnpm-workspace.yaml, README.md
```

## High-Level Overview

### `client/`

Contains the Phaser-based frontend and React UI:

- **PhaserGame.tsx** and related game logic in `game/`.
- React components in `src/components/`.
- GraphQL operations in `src/graphql/` (mutations, queries, subscriptions).
- Redux store/actions/reducers in `src/redux/`.
- Hooks, contexts, and other supporting libraries.

### `api/`

Houses the Node.js backend with:

- Express application setup (`src/index.ts`).
- PostGraphile integration via `postgraphileService.ts`.
- API-key authentication resolved in `postgraphileService.ts`.
- Services for external integrations (OpenAI, Cloudflare, Resend, etc.).
- Worker tasks (Graphile Worker) in `src/tasks/` which handle asynchronous or scheduled jobs.

### `db/`

Includes PostgreSQL migrations and scripts:

- Each migration may define new tables, views, or PL/pgSQL functions.
- Some functions use `@omit` for skipping exposure through PostGraphile.
- RLS (Row-Level Security) is used to enforce permission checks within the database.

## Key Backend Patterns

1. **PostGraphile** automatically exposes PostgreSQL schemas, tables, and functions as GraphQL queries, mutations, and subscriptions, respecting RLS policies and `@omit` annotations.
2. **Graphile Worker** handles background tasks triggered by:
   - Database notifications (`SELECT graphile_worker.add_job(...)`) in PL/pgSQL.
   - Direct dispatch in Node code.
3. **PL/pgSQL Functions** define server-side logic (e.g., to claim a desk), often with `SECURITY DEFINER` and explicit `GRANT EXECUTE`.
4. **RLS** ensures only the correct players can update or read their own data.

### Common Gotchas

1. **Subscriptions**: If a subscription returns `null` for `relatedNode` but has a `relatedNodeId`, it usually means:
   - The table is protected by RLS. Web socket connections are not authenticated.

---

## Example Flow: Claiming a Desk

### GraphQL Mutation (`client/src/graphql/mutations/claimDesk.graphql`)

```graphql
mutation ClaimDesk($deskMarkerId: BigInt!) {
  claimDesk(input: { deskMarkerId: $deskMarkerId }) {
    clientMutationId
  }
}
```

### Corresponding PL/pgSQL Function

```sql
CREATE OR REPLACE FUNCTION claim_desk(desk_marker_id BIGINT)
RETURNS VOID AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM markers WHERE id = desk_marker_id AND type = 'desk') THEN
    RAISE EXCEPTION 'Desk marker not found.';
  END IF;

  IF EXISTS (SELECT 1 FROM player_markers WHERE marker_id = desk_marker_id) THEN
    RAISE EXCEPTION 'Desk already claimed.';
  END IF;

  DELETE FROM player_markers
  WHERE player_id = current_player_id()
  AND marker_id IN (
    SELECT id
    FROM markers
    WHERE type = 'desk'
  );

  INSERT INTO player_markers (player_id, marker_id)
  VALUES (current_player_id(), desk_marker_id);
END;
$$
LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION claim_desk(BIGINT) TO authenticated_user;
```

### Redux Thunk in `client/src/redux/actions.ts`

```typescript
export const claimDesk = createAsyncThunk(
  "player/claimDesk",
  async (deskMarkerId: string, { dispatch }) => {
    try {
      await client.mutate({
        mutation: claimDeskMutation,
        variables: { deskMarkerId },
      })
      dispatch(fetchPlayer())
    } catch (error) {
      console.error("Failed to claim desk", error)
    }
  }
)
```

### Phaser Game Event Handling

Emitting an event from the Phaser scene:

```typescript
// main.ts scene snippet
handleInteraction() {
  if (this.nearChairPosition !== null) {
    this.setSitting(true);
  } else if (this.nearDeskId !== null) {
    EventBus.emit("claim-desk", {
      deskMarkerId: this.nearDeskId,
    });
    EventBus.emit("show-info-text", { message: "" });
  }
}
```

Listening in `PhaserGame.tsx`:

```typescript
EventBus.on("claim-desk", claimDeskHandler)
```

Dispatching Redux action on event:

```typescript
const claimDeskHandler = ({ deskMarkerId }: { deskMarkerId: BigInt }) => {
  dispatch(claimDesk(deskMarkerId))
}
```

---

## Worker Service Example

In `api/src/services/workerService.ts`, we configure and run Graphile Worker:

```typescript
import { run, Runner } from "graphile-worker"
import {
  sendAgentMessage,
  createAssistant,
  updateAgents,
  createStream,
  abandonInactiveDesks,
  sendEmail,
} from "../tasks"
import { OpenAIService } from "./openai"

export const workerService = ({
  connectionString,
  openAIService,
  cloudflare,
  resend,
  concurrency = 5,
  pollInterval = 1000,
}: {
  connectionString: string
  openAIService: OpenAIService
  cloudflare: {
    accountID: string
    apiKey: string
    urlOverride: string
  }
  resend: {
    resendApiKey: string
    notificationEmailSender: string
    notificationEmailRecipient: string
  }
  concurrency?: number
  pollInterval?: number
}) => {
  const taskList = {
    send_agent_message: sendAgentMessage({ openAIService }),
    create_assistant: createAssistant({ openAIService }),
    update_agents: updateAgents(),
    create_stream: createStream(cloudflare),
    abandon_inactive_desks: abandonInactiveDesks(),
    send_email: sendEmail(resend),
  }

  return async () => {
    try {
      const runner: Runner = await run({
        connectionString,
        taskList,
        concurrency,
        pollInterval,
        crontab: `
          */1 * * * * update_agents
          0 * * * * abandon_inactive_desks
        `,
      })

      // Log successes/failures
      runner.events.on("job:success", ({ worker, job }) => {
        console.log(`Worker ${worker.workerId} processed job ${job.id}`)
      })

      runner.events.on("job:failed", ({ worker, job, error }) => {
        console.error(`Worker ${worker.workerId} failed job ${job.id}`, error)
      })

      return runner
    } catch (error) {
      console.error("Error starting worker:", error)
      throw error
    }
  }
}
```

---

## Dispatching a Worker Job from PostgreSQL

A typical pattern is using `graphile_worker.add_job()` inside a function or trigger:

```sql
CREATE OR REPLACE FUNCTION notify_new_player()
RETURNS TRIGGER AS
$$
BEGIN
  PERFORM graphile_worker.add_job(
    'send_email',
    json_build_object(
      'subject', 'New Player Registered',
      'content', format('A new player has registered: %s', NEW.username)
    ),
    queue_name := 'notifications'
  );

  RETURN NEW;
END;
$$
LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION notify_new_player() IS '@omit';

CREATE OR REPLACE TRIGGER player_registered_notification_trigger
AFTER INSERT ON players
FOR EACH ROW
EXECUTE FUNCTION notify_new_player();
```

---

## Adding or Updating Features

### File/Folder Organization

- **Client side changes** go into `client/src`.
- **API or GraphQL layer changes** go into `api/src`.
- **Database schema or function changes** require new SQL files in `db/migrations`.

### GraphQL and PostGraphile

- Add new PL/pgSQL functions for specialized logic; ensure `GRANT EXECUTE` is properly assigned.
- Use `@omit` if you want to hide a particular function or table from GraphQL introspection.
- For RLS, enable policies on relevant tables and check session-based user IDs.

### Worker Tasks

- Create a new file in `api/src/tasks/` for the job logic.
- Reference it in `api/src/services/workerService.ts` under `taskList`.
- Optionally create a CRON entry for scheduling using the `crontab` option in Graphile Worker.

### Phaser Game Integration

- Emit events from your Phaser scene (e.g., `EventBus.emit("some-event", data)`).
- Listen within React or in `PhaserGame.tsx` to dispatch Redux actions or call GraphQL operations.

### Front-End Redux

- Add a new thunk in `client/src/redux/actions.ts`.
- Create or update the relevant reducers in `reducers.ts` to handle new states or data flows.

---

## Instructions for Maintaining This Prompt

- Only update this prompt when software patterns evolve — not for every single feature. This prompt is meant to capture overarching patterns, not document every detail.

- When the implementation pattern shifts or a new pattern emerges, update this prompt with:

  - Code snippets or references that illustrate the change.
  - A brief explanation of the reasoning or structure behind it.
  - How it integrates with the existing system (any important notes on component wiring e.g., API, Database, any workers, React UI, the React <-> game event bridge, Redux actions/ state, auth, etc.).

- Important environment variables or integration keys should be documented separately in .env.example or in a top-level reference section.
