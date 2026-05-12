import { WithPgClient } from "graphile-worker"

export const abandonInactiveDesks = () => {
  return async (
    _: unknown,
    { withPgClient }: { withPgClient: WithPgClient }
  ) => {
    try {
      await withPgClient(async (client) => {
        const result = await client.query(
          `
          DELETE FROM player_markers
          USING players p, markers m
          WHERE player_markers.player_id = p.id
            AND player_markers.marker_id = m.id
            AND m.type = 'desk'
            AND p.updated_at < NOW() - INTERVAL '7 days'
          `
        )

        console.info(`Deleted ${result.rowCount} inactive desk player markers.`)
      })
    } catch (error) {
      console.error("Error abandoning inactive desks:", error)
      throw error
    }
  }
}
