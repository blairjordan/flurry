import { useEffect, useRef, useState } from "react"
import { FaCog, FaCubes, FaRobot, FaSignOutAlt, FaWifi } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import AIPromptForm from "./components/AIPromptForm"
import Alert from "./components/Alert"
import Chat from "./components/Chat"
import InventoryForm from "./components/InventoryForm"
import PlayerInfoForm from "./components/PlayerInfoForm"
import SettingsForm from "./components/SettingsForm"
import StreamSettingsForm from "./components/StreamSettingsForm"
import WalletForm from "./components/WalletForm"
import { useAuth } from "./context/AuthContext"
import { PhaserGame } from "./game/PhaserGame"
import { useModals } from "./hooks/useModals"
import { usePlayerClicked } from "./hooks/usePlayerClicked"
import {
  acknowledgeAlert,
  connectWallet,
  createStream,
  fetchPlayer,
  pollUnacknowledgedAlerts,
  updatePlayerMeta,
  updatePlayerPrivate,
} from "./redux/actions"
import { AppDispatch, RootState } from "./redux/store"
import { Player, PlayerItem } from "./types/generated"

export const ALERTS_POLL_INTERVAL = 10000

const AuthenticatedApp = () => {
  const { logout } = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const player = useSelector((state: RootState) => state.app.player)
  const remotePlayers = useSelector(
    (state: RootState) => state.app.remotePlayers,
  )
  const wallet = useSelector((state: RootState) => state.app.wallet)
  const currentAlert = useSelector((state: RootState) => state.app.alerts[0])

  const {
    isSettingsOpen,
    openSettings,
    closeSettings,
    isInventoryOpen,
    openInventory,
    closeInventory,
    isAIPromptOpen,
    openAIPrompt,
    closeAIPrompt,
    isPlayerInfoOpen,
    openPlayerInfo,
    closePlayerInfo,
    isStreamSettingsOpen,
    openStreamSettings,
    closeStreamSettings,
    isWalletOpen,
    openWallet,
    closeWallet,
  } = useModals()

  const [focusedPlayer, setFocusedPlayer] = useState<Player | null>(null)
  const chatRef = useRef<{ addPrivateThread: (player: Player) => void } | null>(
    null,
  )

  useEffect(() => {
    if (!wallet.connected) {
      dispatch(connectWallet())
    }
  }, [wallet.connected, dispatch])

  useEffect(() => {
    dispatch(pollUnacknowledgedAlerts())

    const interval = setInterval(() => {
      dispatch(pollUnacknowledgedAlerts())
    }, ALERTS_POLL_INTERVAL)

    return () => clearInterval(interval)
  }, [dispatch])

  usePlayerClicked((selectedPlayerId: Player["id"]) => {
    if (!remotePlayers[selectedPlayerId]) {
      console.error("Player not found")
      return
    }

    setFocusedPlayer(remotePlayers[selectedPlayerId] as Player)
    openPlayerInfo()
  })

  const handleSettingsSubmit = (meta: {
    fullName: string
    company: string
    role: string
  }) => {
    if (player) {
      dispatch(
        updatePlayerMeta({ id: player.id, meta: { ...player.meta, ...meta } }),
      )
    }
  }

  const handleDirectMessageClick = () => {
    if (focusedPlayer && chatRef.current) {
      chatRef.current.addPrivateThread(focusedPlayer)
    }
    closePlayerInfo()
  }

  if (!player) {
    return null
  }

  return (
    <>
      <div className="absolute right-4 top-4 z-10 flex space-x-2">
        <button
          onClick={openWallet}
          className={`pixel-font rounded-full border-4 border-black p-2 text-white shadow-lg transition-transform hover:scale-110 ${
            wallet.connected ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          {wallet.connected ? "Wallet Connected" : "Connect Wallet"}
        </button>
        <button
          onClick={openSettings}
          className="pixel-font rounded-full border-4 border-black bg-gray-500 p-2 text-white shadow-lg transition-transform hover:scale-110"
        >
          <FaCog size={24} />
        </button>
        <button
          onClick={openInventory}
          className="pixel-font rounded-full border-4 border-black bg-blue-500 p-2 text-white shadow-lg transition-transform hover:scale-110"
        >
          <FaCubes size={24} />
        </button>
        <button
          onClick={openAIPrompt}
          className="pixel-font rounded-full border-4 border-black bg-blue-500 p-2 text-white shadow-lg transition-transform hover:scale-110"
        >
          <FaRobot size={24} />
        </button>
        <button
          onClick={openStreamSettings}
          className="pixel-font rounded-full border-4 border-black bg-blue-500 p-2 text-white shadow-lg transition-transform hover:scale-110"
        >
          <FaWifi size={24} />
        </button>
        <button
          onClick={logout}
          className="pixel-font rounded-full border-4 border-black bg-red-500 p-2 text-white shadow-lg transition-transform hover:scale-110"
        >
          <FaSignOutAlt size={24} />
        </button>
      </div>
      {isSettingsOpen && (
        <SettingsForm
          onClose={closeSettings}
          onSubmit={handleSettingsSubmit}
          initialPlayerMeta={player.meta}
        />
      )}
      {isInventoryOpen && (
        <InventoryForm
          onClose={closeInventory}
          onSubmit={({ deskSpriteIndexes }) => {
            dispatch(
              updatePlayerMeta({
                id: player.id,
                meta: { ...player.meta, deskSpriteIndexes },
              }),
            )
          }}
          initialPlayerItems={player.playerItems.nodes as PlayerItem[]}
        />
      )}
      {isStreamSettingsOpen && (
        <StreamSettingsForm
          onClose={closeStreamSettings}
          onStreamStart={() => dispatch(createStream())}
          streamUrl={player.stream?.rtmpsUrl || ""}
          streamKey={player.currentStreamKey || ""}
          status={player.stream?.status || ""}
          fetchPlayer={() => dispatch(fetchPlayer())}
        />
      )}

      {isAIPromptOpen && (
        <AIPromptForm
          onClose={closeAIPrompt}
          initialPrompt={player.playersPrivate?.aiPrompt || ""}
          onSubmit={({ aiPrompt }) => {
            dispatch(
              updatePlayerPrivate({
                playerId: player.id,
                aiPrompt,
              }),
            )
          }}
        />
      )}
      {isPlayerInfoOpen && focusedPlayer && (
        <PlayerInfoForm
          player={focusedPlayer}
          onClose={closePlayerInfo}
          onDirectMessageClick={handleDirectMessageClick}
        />
      )}

      {isWalletOpen && (
        <WalletForm
          onClose={closeWallet}
          connectWallet={() => dispatch(connectWallet())}
        />
      )}

      {currentAlert && (
        <Alert
          title={currentAlert.alert?.title}
          message={currentAlert.alert?.message}
          options={currentAlert.alert?.options}
          onClose={() => {
            if (!currentAlert.alert?.options?.length) {
              dispatch(acknowledgeAlert({ playerAlertId: currentAlert.id }))
            }
          }}
          onResponse={(response) =>
            dispatch(
              acknowledgeAlert({ playerAlertId: currentAlert.id, response }),
            )
          }
        />
      )}

      <div className="flex h-screen flex-col overflow-hidden">
        <div className="h-[calc(100vh-33%)] flex-grow">
          <PhaserGame className="h-full w-full" />
        </div>
        <div className="h-[33%] w-full">
          <Chat playerId={player.id} ref={chatRef} />
        </div>
      </div>
    </>
  )
}

export default AuthenticatedApp
