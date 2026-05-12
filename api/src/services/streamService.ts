import { Router, Request, Response } from "express"
import { Pool } from "pg"

export const streamService = ({
  webhookRoute,
  connectionString,
}: {
  webhookRoute: string
  connectionString: string
}) => {
  const router = Router()
  const pool = new Pool({ connectionString })

  // This route should be accessible by Cloudflare Stream webhooks
  // Notifications > Destinations > Webhooks > Webhooks > Create
  router.post(webhookRoute, async (req: Request, res: Response) => {
    const { data } = req.body

    if (!data || !data.input_id) {
      console.error("Webhook received with invalid data:", req.body)

      // Still send a 200 response to Cloudflare
      // or else it won't create the webhook definition
      res.status(200).send("Invalid webhook payload")
      return
    }

    const inputId = data.input_id
    let status: string | null = null

    switch (data.event_type) {
      case "live_input.connected":
        status = "live"
        console.info(`🎥 Stream connected: Input ID ${inputId}`)
        break
      case "live_input.disconnected":
        status = "disconnected"
        console.info(`🔌 Stream disconnected: Input ID ${inputId}`)
        break
      case "live_input.errored":
        status = "error"
        console.error(`❌ Stream error: ${inputId}`, data.live_input_errored)
        break
      default:
        console.warn("Unhandled event type:", data.event_type)
    }

    if (status) {
      try {
        await pool.query(
          `
          UPDATE streams
          SET status = $1
          WHERE provider_id = $2
        `,
          [status, inputId]
        )
        console.info(
          `Stream status updated to "${status}" for provider ID ${inputId}`
        )
      } catch (error) {
        console.error("Failed to update stream status in database:", error)
        res.status(500).send("Failed to update stream status")
        return
      }
    }

    res.status(200).send()
  })

  return router
}
