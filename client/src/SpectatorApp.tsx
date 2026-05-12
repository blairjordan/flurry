import { useMemo } from "react"
import { useSelector } from "react-redux"
import { PhaserGame } from "./game/PhaserGame"
import { RootState } from "./redux/store"

interface SpectatorAppProps {
  onBack?: () => void
}

const SpectatorApp = ({ onBack }: SpectatorAppProps) => {
  const remotePlayers = useSelector((state: RootState) => state.app.remotePlayers)
  const globalMessages = useSelector((state: RootState) => state.app.globalMessages)

  const players = useMemo(
    () => Object.values(remotePlayers).sort((a, b) => a.username.localeCompare(b.username)),
    [remotePlayers],
  )

  const liveStreams = useMemo(
    () =>
      players.filter(
        (player) =>
          player.stream?.status === "live" &&
          typeof player.stream.viewerUrl === "string" &&
          player.stream.viewerUrl.length > 0,
      ),
    [players],
  )

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden bg-gray-900 text-white">
      <div className="pixel-font flex items-center justify-between border-b-4 border-black bg-gray-800 px-4 py-3">
        <div>
          <p className="text-sm text-gray-300">Spectator Mode</p>
          <h1 className="text-xl text-white">Office Observer</h1>
        </div>
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="rounded border-4 border-black bg-purple-600 px-4 py-2 text-white shadow-lg transition-transform hover:scale-105"
          >
            Back
          </button>
        ) : null}
      </div>

      <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[1fr_360px]">
        <div className="relative min-h-0 border-r-0 border-black lg:border-r-4">
          <PhaserGame observerMode className="h-full w-full" />
          <div className="pointer-events-none absolute left-3 top-3 rounded border-2 border-black bg-black/70 px-3 py-2 text-xs text-white">
            Use Arrow Keys or WASD to pan camera
          </div>
        </div>

        <aside className="pixel-font min-h-0 overflow-y-auto border-t-4 border-black bg-gray-800 p-4 lg:border-t-0">
          <section className="mb-4 rounded border-2 border-black bg-gray-700 p-3">
            <h2 className="mb-1 text-lg text-white">Online Players</h2>
            <p className="mb-2 text-xs text-gray-300">{players.length} visible</p>
            <ul className="space-y-2">
              {players.map((player) => (
                <li key={player.id} className="rounded border border-black bg-gray-600 p-2">
                  <p className="text-white">{player.meta?.fullName || player.username}</p>
                  <p className="text-xs text-gray-200">
                    {[player.meta?.role, player.meta?.company].filter(Boolean).join(" at ") ||
                      "No profile details"}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-4 rounded border-2 border-black bg-gray-700 p-3">
            <h2 className="mb-2 text-lg text-white">Live Streams</h2>
            {liveStreams.length === 0 ? (
              <p className="text-xs text-gray-300">No active streams</p>
            ) : (
              <ul className="space-y-2">
                {liveStreams.map((player) => (
                  <li key={player.id}>
                    <a
                      className="text-blue-300 underline"
                      href={player.stream?.viewerUrl || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch {player.meta?.fullName || player.username}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded border-2 border-black bg-gray-700 p-3">
            <h2 className="mb-2 text-lg text-white">Global Chat (Read Only)</h2>
            <div className="max-h-64 overflow-y-auto rounded border border-black bg-gray-600 p-2">
              {globalMessages.length === 0 ? (
                <p className="text-xs text-gray-300">Waiting for messages...</p>
              ) : (
                [...globalMessages]
                  .slice(-40)
                  .reverse()
                  .map((message) => (
                    <div key={message.id} className="mb-2 text-sm">
                      <strong className="text-yellow-300">
                        {message.player?.meta?.fullName || message.player?.username || "Unknown"}
                      </strong>
                      : <span className="text-white">{message.message}</span>
                    </div>
                  ))
              )}
            </div>
          </section>
        </aside>
      </div>
    </main>
  )
}

export default SpectatorApp
