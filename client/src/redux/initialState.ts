import {
  GetCurrentPlayerQuery,
  Marker,
  Message,
  PlayerAlert,
} from "../types/generated"
import { Wallet } from "../types/wallet"

type PlayerType = NonNullable<GetCurrentPlayerQuery["currentPlayer"]>
type MessageType = NonNullable<Message>
type MarkerType = NonNullable<Marker>

export const initialState: {
  player: PlayerType | undefined
  remotePlayers: { [id: string]: PlayerType }
  privateMessages: MessageType[]
  globalMessages: MessageType[]
  markers: MarkerType[]
  alerts: PlayerAlert[]
  wallet: Wallet
} = {
  player: undefined,
  remotePlayers: {},
  privateMessages: [],
  globalMessages: [],
  markers: [],
  alerts: [],
  wallet: {
    address: undefined,
    connected: false,
    error: undefined,
  },
}
