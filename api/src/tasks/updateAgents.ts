import { WithPgClient } from "graphile-worker"

export const updateAgents = () => {
  return async (
    _: unknown,
    { withPgClient }: { withPgClient: WithPgClient }
  ) => {
    await withPgClient(async (client) => {
      await client.query("SELECT update_agents()")
    })
  }
}
