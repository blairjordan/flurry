import { combineReducers, createReducer } from "@reduxjs/toolkit"
import { GetCurrentPlayerQuery, Marker, PlayerAlert } from "../types/generated"
import {
  addAlert,
  addGlobalMessage,
  addOrUpdateMarker,
  addPrivateMessage,
  clearPlayer,
  clearRemotePlayers,
  removeAlert,
  removeRemotePlayer,
  setAlerts,
  setPlayer,
  setPlayerMeta,
  setPlayerPrivate,
  setWallet,
  updatePosition,
  upsertRemotePlayer,
} from "./actions"
import { initialState } from "./initialState"

type PlayerType = NonNullable<GetCurrentPlayerQuery["currentPlayer"]>

export interface AppState {
  player?: PlayerType
  remotePlayers: Record<string, PlayerType>
  globalMessages: string[]
  privateMessages: string[]
  markers: Marker[]
  alerts: (PlayerAlert & { acknowledgedAt: string | null })[]
  wallet?: string
}

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setPlayer, (state, action) => {
      if (action.payload) {
        state.player = {
          ...state.player,
          ...action.payload,
        } as PlayerType
      }
    })
    .addCase(clearPlayer, (state) => {
      state.player = undefined
    })
    .addCase(clearRemotePlayers, (state) => {
      state.remotePlayers = {}
    })
    .addCase(updatePosition, (state, action) => {
      if (state.player) {
        state.player = {
          ...state.player,
          position: action.payload,
        } as PlayerType
      }
    })
    .addCase(upsertRemotePlayer, (state, action) => {
      if (action.payload) {
        state.remotePlayers[action.payload.id] = action.payload as PlayerType
      }
    })
    .addCase(removeRemotePlayer, (state, action) => {
      delete state.remotePlayers[action.payload]
    })
    .addCase(addGlobalMessage, (state, action) => {
      state.globalMessages.push(action.payload)
    })
    .addCase(addPrivateMessage, (state, action) => {
      state.privateMessages.push(action.payload)
    })
    .addCase(addOrUpdateMarker, (state, action) => {
      const existingMarkerIndex = state.markers.findIndex(
        (marker) => marker.id === action.payload.id,
      )
      if (existingMarkerIndex !== -1) {
        state.markers[existingMarkerIndex] = action.payload
      } else {
        state.markers.push(action.payload)
      }
    })
    .addCase(setPlayerMeta, (state, action) => {
      if (state.player) {
        state.player.meta = action.payload
      }
    })
    .addCase(setPlayerPrivate, (state, action) => {
      if (state.player) {
        state.player.playersPrivate = action.payload
      }
    })
    .addCase(setWallet, (state, action) => {
      state.wallet = action.payload
    })
    .addCase(addAlert, (state, action) => {
      if (
        !action.payload.acknowledgedAt &&
        !state.alerts.find((alert) => alert.id === action.payload.id)
      ) {
        state.alerts.push(action.payload)
      }
    })
    .addCase(removeAlert, (state, action) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload)
    })
    .addCase(setAlerts, (state, action) => {
      state.alerts = action.payload
    })
})

const rootReducer = combineReducers({
  app: appReducer,
})

export { appReducer, rootReducer }
