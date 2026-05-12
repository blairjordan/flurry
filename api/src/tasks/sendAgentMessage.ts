import { OpenAIService } from "@/services/openai"
import { JobHelpers } from "graphile-worker"

export type AgentMessagePayload = {
  messageId: string
  fromPlayerId: string
  toPlayerId: string
  message: string
  assistantId: string
}

export const isSendAgentMessagePayload = (
  payload: unknown
): payload is AgentMessagePayload => {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "messageId" in payload &&
    "fromPlayerId" in payload &&
    "toPlayerId" in payload &&
    "message" in payload &&
    "assistantId" in payload
  )
}

export const sendAgentMessage =
  ({ openAIService }: { openAIService: OpenAIService }) =>
  async (payload: unknown, helpers: JobHelpers) => {
    if (!isSendAgentMessagePayload(payload)) {
      throw new Error("Invalid payload structure.")
    }

    const { fromPlayerId, toPlayerId, message, assistantId } = payload

    openAIService.threadManager.runThread({
      assistantId,
      fromPlayerId,
      toPlayerId,
      message,
      callback: ({ response }) => {
        helpers.withPgClient(async (pgClient) => {
          // Write AI response to sender on behalf of offline player
          await pgClient.query(
            `INSERT INTO messages (player_id, target_player_id, message, is_ai_generated)
            VALUES ($1, $2, $3, true)`,
            [toPlayerId, fromPlayerId, response]
          )
        })
        console.log(response)
      },
    })
  }
