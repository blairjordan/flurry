import { postgraphile, makePluginHook } from "postgraphile"
import { default as PgPubsub } from "@graphile/pg-pubsub"
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter"
import { Pool } from "pg"
import type { PgRequest } from "@/types"

const pluginHook = makePluginHook([PgPubsub])

const readHeaderValue = (value: unknown): string | undefined => {
  if (typeof value === "string") {
    return value
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0]
  }

  return undefined
}

const extractApiKeyFromAuthorization = (
  authorizationHeader: string | undefined
): string | undefined => {
  if (!authorizationHeader) {
    return undefined
  }

  const trimmed = authorizationHeader.trim()
  if (!trimmed) {
    return undefined
  }

  const [scheme, ...rest] = trimmed.split(/\s+/)
  if (scheme.toLowerCase() === "bearer" && rest.length > 0) {
    return rest.join(" ")
  }

  return trimmed
}

const getApiKeyFromRequest = (req: PgRequest): string | undefined => {
  const headers = req.headers ?? {}
  const normalizedConnectionParams = req.normalizedConnectionParams ?? {}

  const headerApiKey =
    readHeaderValue(headers["x-api-key"]) || readHeaderValue(headers["api-key"])
  if (headerApiKey) {
    return headerApiKey
  }

  const connectionParamApiKey =
    readHeaderValue(normalizedConnectionParams["x-api-key"]) ||
    readHeaderValue(normalizedConnectionParams["api-key"])
  if (connectionParamApiKey) {
    return connectionParamApiKey
  }

  return extractApiKeyFromAuthorization(
    readHeaderValue(headers.authorization) ||
      readHeaderValue(normalizedConnectionParams.authorization)
  )
}

const findProviderIdByApiKey = async ({
  pool,
  serverSecretKey,
  apiKey,
}: {
  pool: Pool
  serverSecretKey: string
  apiKey: string
}): Promise<string | undefined> => {
  if (!serverSecretKey || !apiKey) {
    return undefined
  }

  const { rows } = await pool.query<{ provider_id: string }>(
    `
      SELECT provider_id
      FROM players
      WHERE md5(concat(provider_id, $2::text)) = $1::text
      LIMIT 1
    `,
    [apiKey, serverSecretKey]
  )

  return rows[0]?.provider_id
}

export const postgraphileService = ({
  graphqlRoute,
  connectionString,
  secretServerKey,
}: {
  graphqlRoute: string
  connectionString: string
  secretServerKey: string
}) => {
  const pool = new Pool({ connectionString })

  return postgraphile(pool, "public", {
    pgSettings: async (req: PgRequest) => {
      const settings: {
        role: string
        "custom.server_secret_key": string
        "player.provider_id"?: string
      } = {
        role: "anonymous",
        "custom.server_secret_key": secretServerKey || "",
      }

      const apiKey = getApiKeyFromRequest(req)
      if (!apiKey) {
        return settings
      }

      try {
        const providerId = await findProviderIdByApiKey({
          pool,
          apiKey,
          serverSecretKey: secretServerKey,
        })

        if (providerId) {
          settings.role = "authenticated_user"
          settings["player.provider_id"] = providerId
        }
      } catch (error) {
        console.error("Failed to resolve API key authentication", error)
      }

      return settings
    },
    ownerConnectionString: process.env.DATABASE_URL,
    graphqlRoute,
    pluginHook,
    subscriptions: true,
    simpleSubscriptions: true,
    watchPg: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    showErrorStack: "json",
    extendedErrors: ["hint", "detail", "errcode"],
    appendPlugins: [
      require("@graphile-contrib/pg-simplify-inflector"),
      ConnectionFilterPlugin,
    ],
    exportGqlSchemaPath: "schema.graphql",
    enableQueryBatching: true,
    legacyRelations: "omit",
  })
}
