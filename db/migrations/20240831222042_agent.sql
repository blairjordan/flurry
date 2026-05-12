-- migrate:up
CREATE TABLE IF NOT EXISTS players_private (
  player_id BIGINT PRIMARY KEY REFERENCES players(id),
  ai_prompt TEXT,
  assistant_id TEXT,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
GRANT SELECT, UPDATE ON players_private TO authenticated_user;

CREATE OR REPLACE TRIGGER update_players_private_updated_at
BEFORE UPDATE ON players_private
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION upsert_players_private()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO players_private (player_id)
  VALUES (NEW.id)
  ON CONFLICT (player_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION upsert_players_private() IS '@omit';

CREATE TRIGGER insert_players_private_trigger
AFTER INSERT ON players
FOR EACH ROW
EXECUTE FUNCTION upsert_players_private();

-- 🔒 Can only SELECT own players_private record
DROP POLICY IF EXISTS players_private_crud_select ON players_private;
CREATE POLICY players_private_crud_select ON players_private
FOR SELECT
TO authenticated_user
USING (player_id = current_player_id());

-- 🔒 Can only UPDATE own players_private record
DROP POLICY IF EXISTS players_private_crud_update ON players_private;
CREATE POLICY players_private_crud_update ON players_private
FOR UPDATE
TO authenticated_user
USING (player_id = current_player_id())
WITH CHECK (player_id = current_player_id());
ALTER TABLE messages
ADD COLUMN IF NOT EXISTS is_direct_message BOOLEAN GENERATED ALWAYS AS (target_player_id IS NOT NULL) STORED;

-- 🤖 Enqueue agent send message job
CREATE OR REPLACE FUNCTION add_agent_job()
RETURNS TRIGGER AS $$
DECLARE
  assistant_id TEXT;
BEGIN

  SELECT pp.assistant_id
  INTO assistant_id
  FROM players_private pp
  WHERE pp.player_id = NEW.target_player_id
    AND pp.assistant_id IS NOT NULL;

  IF NEW.is_direct_message = true
    -- Target player is offline
    AND NOT (
      SELECT players_is_online(p)::BOOLEAN
      FROM players p
      WHERE p.id = NEW.target_player_id
    )
    AND assistant_id IS NOT NULL
    AND NOT NEW.is_ai_generated
  THEN

    PERFORM graphile_worker.add_job(
      'send_agent_message',
      json_build_object(
        'messageId', NEW.id,
        'fromPlayerId', NEW.player_id,
        'toPlayerId', NEW.target_player_id,
        'message', NEW.message,
        'assistantId', assistant_id
      ),
      queue_name := 'private_messages'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 🔫 Trigger for agent job
CREATE OR REPLACE TRIGGER insert_message_agent_trigger
AFTER INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION add_agent_job();

-- 👩‍💼 Enqueue assistant job
CREATE OR REPLACE FUNCTION add_assistant_job()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    NEW.ai_prompt IS NOT NULL
    AND TRIM(NEW.ai_prompt) <> ''
    AND (
      (
        TG_OP <> 'UPDATE')
        OR NEW.ai_prompt IS DISTINCT FROM OLD.ai_prompt
      )
  )
  THEN
    PERFORM graphile_worker.add_job(
      'create_assistant',
      json_build_object(
        'playerId', NEW.player_id,
        'aiPrompt', NEW.ai_prompt,
        'assistantId', NEW.assistant_id
      ),
      queue_name := 'assistants'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 🔫 Trigger for assistant job
CREATE OR REPLACE TRIGGER update_players_private_trigger
AFTER INSERT OR UPDATE ON players_private
FOR EACH ROW
EXECUTE FUNCTION add_assistant_job();

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 📮 Can only SELECT messages related to player (or global messages)
DROP POLICY IF EXISTS messages_crud_select ON messages;
CREATE POLICY messages_crud_select ON messages
FOR SELECT
TO authenticated_user, anonymous
USING (
  is_direct_message = FALSE OR
  (current_player_id() IS NOT NULL AND (
    target_player_id = current_player_id() OR
    player_id = current_player_id()
  ))
);

-- 📨 Can only INSERT messages from current player
DROP POLICY IF EXISTS messages_crud_insert ON messages;
CREATE POLICY messages_crud_insert ON messages
FOR INSERT
TO authenticated_user
WITH CHECK (player_id = current_player_id());

GRANT INSERT ON messages TO authenticated_user;

-- 🛠️ Update offline players with agents seated at their desks
CREATE OR REPLACE FUNCTION update_agents()
RETURNS VOID AS $$
BEGIN
    WITH original_timestamps AS (
        SELECT p.id,
               p.updated_at,
               (m.props->'position'->'chair'->>'x')::INTEGER AS chair_x,
               (m.props->'position'->'chair'->>'y')::INTEGER AS chair_y
        FROM players p
        INNER JOIN players_private pp ON p.id = pp.player_id
        INNER JOIN player_markers pm ON p.id = pm.player_id
        INNER JOIN markers m ON pm.marker_id = m.id
        WHERE players_is_online(p) = 'false'
        AND m.type = 'desk'
        AND (
          pp.ai_prompt IS NOT NULL
          AND TRIM(pp.ai_prompt) <> ''
        )
    )
    UPDATE players
    SET position = jsonb_build_object(
          'x', original_timestamps.chair_x,
          'y', original_timestamps.chair_y,
          'state', 'sitting',
          'direction', 'up'
      )
    FROM original_timestamps
    WHERE players.id = original_timestamps.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION update_agents() IS '@omit';

-- migrate:down
