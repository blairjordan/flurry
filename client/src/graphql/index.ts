import acknowledgeAlert from "./mutations/acknowledgeAlert.graphql"
import claimDesk from "./mutations/claimDesk.graphql"
import createStream from "./mutations/createStream.graphql"
import insertMessage from "./mutations/insertMessage.graphql"
import ping from "./mutations/ping.graphql"
import updatePlayerMeta from "./mutations/updatePlayerMeta.graphql"
import updatePlayerPosition from "./mutations/updatePlayerPosition.graphql"
import updatePlayerPrivate from "./mutations/updatePlayerPrivate.graphql"
import updatePlayerWallet from "./mutations/updatePlayerWallet.graphql"
import getCurrentPlayer from "./queries/getCurrentPlayer.graphql"
import getMarkers from "./queries/getMarkers.graphql"
import getPrivateMessages from "./queries/getPrivateMessages.graphql"
import getUnacknowledgedAlerts from "./queries/getUnacknowledgedAlerts.graphql"
import globalChatUpdates from "./subscriptions/globalChatUpdates.graphql"
import markerUpdates from "./subscriptions/markerUpdates.graphql"
import playerUpdates from "./subscriptions/playerUpdates.graphql"

export const queries = {
  getCurrentPlayer,
  getMarkers,
  getPrivateMessages,
  getUnacknowledgedAlerts,
}

export const mutations = {
  updatePlayerPosition,
  claimDesk,
  updatePlayerMeta,
  ping,
  insertMessage,
  updatePlayerPrivate,
  createStream,
  updatePlayerWallet,
  acknowledgeAlert,
}

export const subscriptions = {
  playerUpdates,
  globalChatUpdates,
  markerUpdates,
}
