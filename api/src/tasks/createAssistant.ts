import { OpenAIService } from "@/services"
import { WithPgClient } from "graphile-worker"

type CreateAssistantPayload = {
  playerId: string
  aiPrompt: string
  assistantId: string | null
}

const PROMPT_APPEND = `Keep messages concise and under 150 words/tokens`

const isCreateAssistantPayload = (
  payload: unknown
): payload is CreateAssistantPayload => {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "playerId" in payload &&
    "aiPrompt" in payload &&
    "assistantId" in payload
  )
}

export const createAssistant = ({
  openAIService,
}: {
  openAIService: OpenAIService
}) => {
  return async (
    payload: unknown,
    { withPgClient }: { withPgClient: WithPgClient }
  ) => {
    if (!isCreateAssistantPayload(payload)) {
      console.error(
        "Invalid payload structure: CreateAssistantPayload",
        payload
      )
      return
    }

    const { playerId, assistantId: existingAssistantId, aiPrompt } = payload

    let playerInfoString = ""

    await withPgClient(async (client) => {
      const playerAgentDetails = await client.query(
        `
          SELECT
            player_name,
            player_role,
            player_company,
            player_position_state,
            desk_items
          FROM
            get_player_agent_details($1)
        `,
        [playerId]
      )

      const playerInfo = playerAgentDetails.rows[0] || {}

      if (playerInfo) {
        const { player_name, player_role, player_company, desk_items } =
          playerInfo
        playerInfoString = `
        Your Name: ${player_name}\n
        Your Current Role: ${player_role}\n
        Your Current Company: ${player_company}\n
        The following items exist on your desk: ${desk_items}\n`
      }
    })

    const instructions = `You are a person working in an office.\n
      You are sitting at your desk.\n
      ${playerInfoString}\n
      More details on how you should behave: ${aiPrompt}\n
      ${PROMPT_APPEND}
    `
    let assistant

    if (!existingAssistantId) {
      assistant = await openAIService.openai.beta.assistants.create({
        name: `player: ${playerId}`,
        instructions,
        model: "gpt-4o-mini",
      })

      console.info("Assistant created", {
        assistantId: assistant.id,
        playerId,
      })
    } else {
      assistant = await openAIService.openai.beta.assistants.update(
        existingAssistantId,
        {
          instructions,
        }
      )

      console.info("Assistant updated", {
        assistantId: assistant.id,
        playerId,
      })
    }

    await withPgClient(async (client) => {
      await client.query(
        `
          UPDATE players_private
          SET assistant_id = $1
          WHERE player_id = $2
        `,
        [assistant.id, playerId]
      )
    })
  }
}
