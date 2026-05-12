import express from "express"
import path from "path"
import cors from "cors"
import dotenv from "dotenv"
import crypto from "crypto"
import { Pool } from "pg"
import { validateEnv } from "./lib/validate"
import {
  postgraphileService,
  workerService,
  streamService,
  OpenAIService,
} from "./services"

dotenv.config()

const graphqlRoute = "/graphql"
const port = process.env.PORT || 3000

const env = validateEnv({
  required: {
    DATABASE_URL: "string",
    SERVER_SECRET_KEY: "string",
    OPENAI_API_KEY: "string",
    CLOUDFLARE_ACCOUNT_ID: "string",
    CLOUDFLARE_API_KEY: "string",
    CLOUDFLARE_STREAM_WEBHOOK_PATH: "string",
    CLOUDFLARE_CUSTOM_URL: "string",
    RESEND_API_KEY: "string",
    NOTIFICATION_EMAIL_SENDER: "string",
    NOTIFICATION_EMAIL_RECIPIENT: "string",
  },
})

const app = express()
const pool = new Pool({ connectionString: env.DATABASE_URL })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 🩺 Health check
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" })
})

app.get("/schema.graphql", (req, res) => {
  const schemaPath = path.resolve(process.cwd(), "schema.graphql")
  res.sendFile(schemaPath, (error) => {
    if (!error) {
      return
    }

    if (!res.headersSent) {
      res.status(404).json({
        error:
          "GraphQL schema file not found. Generate it by starting PostGraphile at least once.",
      })
    }
  })
})

app.post("/agents/register", async (req, res) => {
  const username =
    typeof req.body?.username === "string" ? req.body.username.trim() : ""
  if (!/^[a-zA-Z0-9_-]{3,30}$/.test(username)) {
    res.status(400).json({
      error:
        "Invalid username. Use 3-30 characters: letters, numbers, underscore, or hyphen.",
    })
    return
  }

  const providerId = crypto.randomUUID()
  const defaultMeta = {
    fullName: username,
    role: "Agent",
    company: "Independent",
    characterIndex: 0,
  }
  const defaultPosition = {
    x: 3,
    y: 3,
    direction: "down",
    state: "standing",
  }

  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const insertedPlayer = await client.query<{
      id: string
      username: string
      provider_id: string
    }>(
      `
        INSERT INTO players (provider_id, username, meta, position)
        VALUES ($1::text, $2::text, $3::jsonb, $4::jsonb)
        RETURNING id, username, provider_id
      `,
      [
        providerId,
        username,
        JSON.stringify(defaultMeta),
        JSON.stringify(defaultPosition),
      ],
    )

    const apiKeyResult = await client.query<{ api_key: string }>(
      `SELECT md5(concat($1::text, $2::text)) AS api_key`,
      [providerId, env.SERVER_SECRET_KEY],
    )

    await client.query("COMMIT")

    const protocol =
      (
        typeof req.headers["x-forwarded-proto"] === "string"
          ? req.headers["x-forwarded-proto"]
          : req.protocol
      )
        .split(",")[0]
        .trim() || "http"

    const host = req.get("host") || "localhost"
    const wsProtocol = protocol === "https" ? "wss" : "ws"

    res.status(201).json({
      playerId: insertedPlayer.rows[0]?.id,
      username: insertedPlayer.rows[0]?.username,
      apiKey: apiKeyResult.rows[0]?.api_key,
      graphqlHttpUrl: `${protocol}://${host}${graphqlRoute}`,
      graphqlWsUrl: `${wsProtocol}://${host}${graphqlRoute}`,
    })
  } catch (error) {
    await client.query("ROLLBACK")

    const err = error as { code?: string }
    if (err.code === "23505") {
      res.status(409).json({ error: "Username already exists." })
      return
    }

    console.error("Agent registration failed:", error)
    res.status(500).json({ error: "Failed to register agent." })
  } finally {
    client.release()
  }
})

// 📹 Cloudflare Stream middleware
app.use(
  streamService({
    webhookRoute: env.CLOUDFLARE_STREAM_WEBHOOK_PATH,
    connectionString: env.DATABASE_URL,
  })
)
console.info(
  `☁️ Cloudflare webhook handler: ${env.CLOUDFLARE_STREAM_WEBHOOK_PATH}`
)

app.use(
  postgraphileService({
    connectionString: env.DATABASE_URL,
    secretServerKey: env.SERVER_SECRET_KEY,
    graphqlRoute,
  })
)

app.get("/graphiql", (req, res) => {
  res.sendFile(path.join(__dirname, "graphiql.html"))
})

console.info(`🤖 Starting OpenAI thread manager`)
const openAIService = new OpenAIService({ openapiApiKey: env.OPENAI_API_KEY })

console.info(`🕹️ GraphQL API running @ http://localhost:${port}${graphqlRoute}`)
;(async () => {
  try {
    const startWorker = workerService({
      connectionString: env.DATABASE_URL,
      openAIService,
      cloudflare: {
        accountID: env.CLOUDFLARE_ACCOUNT_ID,
        apiKey: env.CLOUDFLARE_API_KEY,
        urlOverride: env.CLOUDFLARE_CUSTOM_URL,
      },
      resend: {
        resendApiKey: env.RESEND_API_KEY,
        notificationEmailSender: env.NOTIFICATION_EMAIL_SENDER,
        notificationEmailRecipient: env.NOTIFICATION_EMAIL_RECIPIENT,
      },
    })

    await startWorker()
  } catch (error) {
    console.error("Error starting worker:", error)
  }
})()
console.info(`🎧 Graphile Worker event listeners attached.`)

app.listen(port)
