import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { ethers } from "ethers"
import { EventBus } from "../game/EventBus"
import { mutations, queries, subscriptions } from "../graphql"
import client from "../lib/apollo-client"
import { switchToMoonbeam } from "../lib/walletUtils"
import {
  GetCurrentPlayerQuery,
  GetMarkersQuery,
  GetMarkersQueryVariables,
  GetPrivateMessagesQuery,
  GetUnacknowledgedAlertsQuery,
  Marker,
  MarkerUpdatesSubscription,
  Message,
  PlayerAlert,
  PlayersPrivate,
  PlayerUpdatesSubscription,
} from "../types/generated"
import { Wallet } from "../types/wallet"
import { RootState } from "./store"

const {
  getCurrentPlayer: getCurrentPlayerQuery,
  getMarkers: getMarkersQuery,
  getPrivateMessages: getPrivateMessagesQuery,
  getUnacknowledgedAlerts: getUnacknowledgedAlertsQuery,
} = queries
const {
  updatePlayerPosition: updatePlayerPositionMutation,
  claimDesk: claimDeskMutation,
  updatePlayerMeta: updatePlayerMetaMutation,
  ping: pingMutation,
  insertMessage: insertMessageMutation,
  updatePlayerPrivate: updatePlayerPrivateMutation,
  createStream: createStreamMutation,
  updatePlayerWallet: updatePlayerWalletMutation,
  acknowledgeAlert: acknowledgeAlertMutation,
} = mutations
const {
  playerUpdates: playerUpdatesSubscription,
  globalChatUpdates: globalChatUpdatesSubscription,
  markerUpdates: markerUpdatesSubscription,
} = subscriptions

type PlayerType = Omit<
  NonNullable<GetCurrentPlayerQuery["currentPlayer"]>,
  "playerMarkers"
>

export const setPlayer = createAction<PlayerType | null>("SET_PLAYER")
export const clearPlayer = createAction("CLEAR_PLAYER")
export const clearRemotePlayers = createAction("CLEAR_REMOTE_PLAYERS")
export const setPlayerMeta =
  createAction<Record<string, any>>("SET_PLAYER_META")
export const setPlayerPrivate = createAction<PlayersPrivate | null>(
  "SET_PLAYER_PRIVATE",
)
export const setWallet = createAction<Wallet>("SET_WALLET")

export const updatePosition = createAction<{ x: number; y: number }>(
  "UPDATE_POSITION",
)

export const upsertRemotePlayer = createAction<PlayerType>("ADD_REMOTE_PLAYER")
export const updateRemotePlayerPosition = createAction<{
  id: string
  position: { x: number; y: number }
}>("UPDATE_REMOTE_PLAYER_POSITION")
export const removeRemotePlayer = createAction<string>("REMOVE_REMOTE_PLAYER")
export const addGlobalMessage = createAction<Message>("ADD_GLOBAL_MESSAGE")
export const addPrivateMessage = createAction<Message>("ADD_PRIVATE_MESSAGE")

export const addOrUpdateMarker = createAction<Marker>("ADD_OR_UPDATE_MARKER")

export const fetchPlayer = createAsyncThunk(
  "player/fetchPlayer",
  async (_, { dispatch }) => {
    const maxRetries = 10
    const baseDelay = 1000
    const maxDelay = 30000
    const retryDelay = (attempt: number) => {
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)
      return delay + Math.random() * 1000
    }

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const { data } = await client.query<GetCurrentPlayerQuery>({
          query: getCurrentPlayerQuery,
          fetchPolicy: "network-only",
        })

        if (data?.currentPlayer) {
          console.log(
            "Player data successfully retrieved:",
            data.currentPlayer.id,
          )
          dispatch(setPlayer(data.currentPlayer))
          return data.currentPlayer
        } else {
          const delay = retryDelay(attempt)
          // This can happen if the post-signup trigger hasn't inserted the provider_id yet
          console.warn(
            `Attempt ${attempt + 1}/${maxRetries}: Player data not available yet. Retrying in ${Math.round(delay / 1000)}s`,
          )
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      } catch (error) {
        const delay = retryDelay(attempt)
        console.error(
          `Attempt ${attempt + 1}/${maxRetries}: Failed to fetch player data. Retrying in ${Math.round(delay / 1000)}s`,
          error,
        )
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }

    console.error("Exceeded maximum retries to fetch player data")
    dispatch(setPlayer(null))
    throw new Error(
      "Failed to fetch player data after maximum retries. If this is a new account, please try logging out and back in.",
    )
  },
)

export const ping = createAsyncThunk("player/ping", async () => {
  try {
    await client.mutate({
      mutation: pingMutation,
    })
  } catch (error) {
    console.error("Failed to ping", error)
  }
})

export const updatePlayerPosition = createAsyncThunk(
  "player/updatePlayerPosition",
  async (
    { position }: { position: { x: number; y: number } },
    { getState },
  ) => {
    const state = getState() as RootState
    const playerId = state.app.player?.id

    if (!playerId) {
      console.warn("Player ID is not available. Skipping position update.")
      return
    }

    try {
      await client.mutate({
        mutation: updatePlayerPositionMutation,
        variables: { id: playerId, position },
      })
    } catch (error) {
      console.error("Failed to update player position", error)
    }
  },
)

export const updatePlayerMeta = createAsyncThunk(
  "player/updatePlayerMeta",
  async (
    { id, meta }: { id: string; meta: Record<string, any> },
    { dispatch },
  ) => {
    try {
      const { data } = await client.mutate({
        mutation: updatePlayerMetaMutation,
        variables: { id, meta },
      })

      if (data && data.updatePlayer && data.updatePlayer.player) {
        const updatedMeta = data.updatePlayer.player.meta
        dispatch(setPlayerMeta(updatedMeta))
      }
    } catch (error) {
      console.error("Failed to update player meta", error)
    }
  },
)

export const updatePlayerPrivate = createAsyncThunk(
  "player/updatePlayerPrivate",
  async (
    { playerId, aiPrompt }: { playerId: string; aiPrompt: string },
    { dispatch },
  ) => {
    try {
      const { data } = await client.mutate({
        mutation: updatePlayerPrivateMutation,
        variables: { playerId, aiPrompt },
      })

      if (
        data &&
        data.updatePlayersPrivate &&
        data.updatePlayersPrivate.playersPrivate
      ) {
        const updatedPlayerPrivate = data.updatePlayersPrivate.playersPrivate
        dispatch(setPlayerPrivate(updatedPlayerPrivate))
      }
    } catch (error) {
      console.error("Failed to update player private", error)
    }
  },
)

export const handlePlayerUpdates = createAsyncThunk(
  "player/handlePlayerUpdates",
  async (
    options: { observerMode?: boolean } | undefined,
    { dispatch, getState },
  ) => {
    const state = getState() as RootState
    const playerId = state.app.player?.id
    const observerMode = options?.observerMode === true

    client
      .subscribe<PlayerUpdatesSubscription>({
        query: playerUpdatesSubscription,
      })
      .subscribe({
        // TODO: compare player item hashes, update items if changed
        // TODO: compare player meta hash instead of updating in state all the time

        next(response) {
          const updatedPlayer = response.data?.listen.relatedNode
          if (updatedPlayer && updatedPlayer.__typename === "Player") {
            if (!playerId) {
              if (observerMode) {
                if (updatedPlayer.isOnline) {
                  dispatch(
                    upsertRemotePlayer(updatedPlayer as unknown as PlayerType),
                  )
                } else {
                  dispatch(removeRemotePlayer(updatedPlayer.id))
                }
                return
              }

              console.warn(
                "Player ID is not available. Skipping player update.",
              )
              return
            }

            if (updatedPlayer.id === playerId) {
              dispatch(setPlayer(updatedPlayer as unknown as PlayerType))
            } else {
              if (updatedPlayer.isOnline) {
                dispatch(
                  upsertRemotePlayer(updatedPlayer as unknown as PlayerType),
                )
              } else {
                dispatch(removeRemotePlayer(updatedPlayer.id))
              }
            }
          }
        },
        error(err) {
          console.error("Player subscription error", err)
        },
      })
  },
)

export const handleMarkerUpdates = createAsyncThunk(
  "marker/handleMarkerUpdates",
  async (_, { dispatch }) => {
    client
      .subscribe<MarkerUpdatesSubscription>({
        query: markerUpdatesSubscription,
      })
      .subscribe({
        next(response) {
          const updatedMarker = response.data?.listen.relatedNode as Marker
          if (updatedMarker) {
            dispatch(addOrUpdateMarker(updatedMarker))
          }
        },
        error(err) {
          console.error("Marker subscription error", err)
        },
      })
  },
)

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({
    message,
    targetPlayerId,
  }: {
    message: string
    targetPlayerId?: number
  }) => {
    try {
      await client.mutate({
        mutation: insertMessageMutation,
        variables: { message, targetPlayerId: targetPlayerId || null },
      })
    } catch (error) {
      console.error("Failed to send message", error)
    }
  },
)

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
  },
)

export const subscribeToGlobalMessages = createAsyncThunk(
  "chat/subscribeToGlobalMessages",
  async (_, { dispatch }) => {
    client
      .subscribe({
        query: globalChatUpdatesSubscription,
      })
      .subscribe({
        next(response) {
          const message = response.data?.listen.relatedNode
          if (message) {
            dispatch(addGlobalMessage(message))
            // Emit to EventBus for the game scene
            EventBus.emit("chat-message", {
              playerId: message.player?.id || "unknown",
              message: message.message,
            })
          }
        },
        error(err) {
          console.error("Global chat subscription error:", err)
        },
      })
  },
)

export const fetchPrivateMessages = createAsyncThunk(
  "chat/fetchPrivateMessages",
  async (_, { dispatch, getState }) => {
    const { app } = getState() as RootState
    const currentMessages = app.privateMessages

    try {
      const { data } = await client.query<GetPrivateMessagesQuery>({
        query: getPrivateMessagesQuery,
        fetchPolicy: "network-only",
      })

      if (data && data.messages) {
        data.messages.nodes.forEach((message) => {
          const isNewMessage = !currentMessages.some((m) => m.id === message.id)

          if (isNewMessage) {
            dispatch(addPrivateMessage(message as Message))
          }
        })
      }
    } catch (error) {
      console.error("Failed to fetch private messages", error)
    }
  },
)

export const fetchMarkers = createAsyncThunk(
  "marker/fetchMarkers",
  async (markerType: string, { dispatch }) => {
    try {
      const { data } = await client.query<
        GetMarkersQuery,
        GetMarkersQueryVariables
      >({
        query: getMarkersQuery,
        variables: { markerType },
      })

      if (data && data.markers) {
        data.markers.nodes.forEach((marker) => {
          dispatch(addOrUpdateMarker(marker as Marker))
        })
      }
    } catch (error) {
      console.error("Failed to fetch markers data", error)
    }
  },
)

export const createStream = createAsyncThunk(
  "stream/createStream",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: createStreamMutation,
      })

      const streamId = data?.createStream?.stream?.id

      if (streamId) {
        console.info("Stream created successfully:", streamId)
        return streamId
      } else {
        throw new Error("Stream creation failed.")
      }
    } catch (error) {
      console.error("Error creating stream:", error)
      return rejectWithValue(error)
    }
  },
)

export const connectWallet = createAsyncThunk(
  "wallet/connectWallet",
  async (_, { dispatch, getState }) => {
    if (!window.ethereum) {
      const errorWallet: Wallet = {
        address: undefined,
        connected: false,
        error: "MetaMask or another Web3 wallet is required.",
      }
      dispatch(setWallet(errorWallet))
      return
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      // Switch to Moonbeam Mainnet
      await switchToMoonbeam({
        rpcUrl: import.meta.env.VITE_MOONBEAM_RPC_URL,
        chainId: parseInt(import.meta.env.VITE_MOONBEAM_CHAIN_ID, 10),
      })

      const connectedWallet: Wallet = {
        address,
        connected: true,
        error: undefined,
      }
      dispatch(setWallet(connectedWallet))

      const state = getState() as RootState
      const playerId = state.app.player?.id

      if (playerId) {
        const wallets = { eth: address }
        await client.mutate({
          mutation: updatePlayerWalletMutation,
          variables: { id: playerId, wallets },
        })
        console.info("Wallet successfully updated in the database:", wallets)
        dispatch(fetchPlayer())
      }
    } catch (err) {
      console.error("Wallet connection failed:", err)
      const errorWallet: Wallet = {
        address: undefined,
        connected: false,
        error:
          (err instanceof Error ? err.message : "Unknown error") ||
          "Failed to connect wallet. Please try again.",
      }
      dispatch(setWallet(errorWallet))
    }
  },
)

export const addAlert = createAction<PlayerAlert>("ADD_ALERT")
export const removeAlert = createAction<string>("REMOVE_ALERT")

export const acknowledgeAlert = createAsyncThunk(
  "alert/acknowledgeAlert",
  async (
    { playerAlertId, response }: { playerAlertId: string; response?: string },
    { dispatch },
  ) => {
    try {
      await client.mutate({
        mutation: acknowledgeAlertMutation,
        variables: { playerAlertId, response },
      })
      dispatch(removeAlert(playerAlertId))
    } catch (error) {
      console.error("Failed to acknowledge alert", error)
    }
  },
)

export const setAlerts = createAction<PlayerAlert[]>("alerts/setAlerts")

export const pollUnacknowledgedAlerts = createAsyncThunk(
  "alerts/poll",
  async (_, { dispatch }) => {
    try {
      const { data } = await client.query<GetUnacknowledgedAlertsQuery>({
        query: getUnacknowledgedAlertsQuery,
        fetchPolicy: "network-only", // Don't use cache for polling
      })

      if (data?.playerAlerts?.nodes) {
        dispatch(setAlerts(data.playerAlerts.nodes as PlayerAlert[]))
      }
    } catch (error) {
      console.error("Failed to poll alerts:", error)
    }
  },
)
