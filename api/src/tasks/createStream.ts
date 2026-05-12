import { JobHelpers } from "graphile-worker"
import { PoolClient } from "pg"

export type CreateStreamPayload = {
  playerId: string
  streamId: string
}

export const isCreateStreamPayload = (
  payload: unknown
): payload is CreateStreamPayload => {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "playerId" in payload &&
    "streamId" in payload
  )
}

type UpdateStreamStatusParams = {
  pgClient: PoolClient
  playerId: string
  status: string
  streamId: string
  streamKey?: string
  rtmpsUrl?: string
  viewerUrl?: string
  providerId?: string
}

const updateStreamStatus = async ({
  pgClient,
  playerId,
  status,
  streamId,
  streamKey,
  rtmpsUrl,
  viewerUrl,
  providerId,
}: UpdateStreamStatusParams) => {
  const query = `
    UPDATE streams
    SET 
      status = $1,
      stream_key = COALESCE($2, stream_key),
      rtmps_url = COALESCE($3, rtmps_url),
      viewer_url = COALESCE($4, viewer_url),
      provider_id = COALESCE($5, provider_id)
    WHERE player_id = $6
    AND id = $7
  `
  const values = [
    status,
    streamKey,
    rtmpsUrl,
    viewerUrl,
    providerId,
    playerId,
    streamId,
  ]
  await pgClient.query(query, values)
  console.info("Stream status updated.")
}

export const createStream =
  ({
    accountID,
    apiKey,
    urlOverride,
  }: {
    accountID: string
    apiKey: string
    urlOverride: string
  }) =>
  async (payload: unknown, helpers: JobHelpers) => {
    if (!isCreateStreamPayload(payload)) {
      throw new Error("Invalid payload structure.")
    }

    const { playerId, streamId } = payload as CreateStreamPayload & {
      streamId: string
    }

    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountID}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            meta: {
              name: `Stream player_id: ${playerId} - ${Date.now()}`,
            },
            recording: {
              mode: "automatic",
              requireSignedURLs: false,
              allowedOrigins: null,
              hideLiveViewerCount: false,
              deleteRecordingAfterDays: 30,
            },
          }),
        }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          `Failed to create stream: ${result.errors ? JSON.stringify(result.errors) : result.message}`
        )
      }

      const { streamKey, url: rtmpsUrl } = result.result.rtmps || {}
      const { url: viewerUrl } = result.result.rtmpsPlayback || {}
      const providerId = result.result.uid

      if (!streamKey || !rtmpsUrl || !viewerUrl || !providerId) {
        throw new Error("Required fields missing from Cloudflare API response.")
      }

      console.info(`📹 Stream ${providerId} created.`)

      await helpers.withPgClient((pgClient) =>
        updateStreamStatus({
          pgClient,
          playerId,
          status: "ready",
          streamId,
          streamKey,
          rtmpsUrl: urlOverride || rtmpsUrl,
          viewerUrl,
          providerId,
        })
      )
    } catch (error) {
      console.error("Error creating stream:", error)
      await helpers.withPgClient((pgClient) =>
        updateStreamStatus({
          pgClient,
          playerId,
          status: "error",
          streamId,
        })
      )
      throw error
    }
  }
