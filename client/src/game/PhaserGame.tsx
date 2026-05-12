import { debounce, throttle } from "lodash"
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingOverlay } from "../components/LoadingOverlay"
import {
  claimDesk,
  fetchMarkers,
  handleMarkerUpdates,
  handlePlayerUpdates,
  ping,
  subscribeToGlobalMessages,
  updatePlayerPosition,
} from "../redux/actions"
import { AppDispatch, RootState } from "../redux/store"
import { PositionExtended } from "../types/position"
import { EventBus } from "./EventBus"
import StartGame from "./main"

export interface IRefPhaserGame {
  game: Phaser.Game | null
  scene: Phaser.Scene | null
}

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void
  observerMode?: boolean
}

const PhaserGameComponent = (
  { currentActiveScene, observerMode = false, ...props }: IProps,
  ref: React.ForwardedRef<IRefPhaserGame>,
) => {
  const player = useSelector((state: RootState) => state.app.player)
  const remotePlayers = useSelector(
    (state: RootState) => state.app.remotePlayers,
  )
  const markers = useSelector((state: RootState) => state.app.markers)
  const dispatch = useDispatch<AppDispatch>()
  const game = useRef<Phaser.Game | null>(null!)
  const [lastPosition, setLastPosition] = useState<PositionExtended | null>(
    null,
  )
  const [infoText, setInfoText] = useState<string | null>(null)
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    if (!sceneReady) {
      return
    }

    if (!observerMode && !player?.id) {
      return
    }

    dispatch(handlePlayerUpdates(observerMode ? { observerMode: true } : undefined))
    dispatch(handleMarkerUpdates())
    dispatch(fetchMarkers("desk"))
    dispatch(subscribeToGlobalMessages())

    if (observerMode) {
      return
    }

    dispatch(ping())
    const pingInterval = setInterval(() => {
      dispatch(ping())
    }, 15_000)

    return () => clearInterval(pingInterval)
  }, [dispatch, observerMode, sceneReady, player?.id])

  useEffect(() => {
    if (!sceneReady) {
      return
    }

    if (markers) {
      const desks = markers
        .filter((marker) => marker.type === "desk")
        .map(({ id, props, playerMarkers: { nodes: playerMarkerNodes } }) => ({
          id,
          ...props,
          player:
            playerMarkerNodes.length > 0 ? playerMarkerNodes[0].player : null,
        }))

      EventBus.emit("set-desks", desks)
    }
  }, [markers, sceneReady])

  useEffect(() => {
    if (!sceneReady) {
      return
    }

    if (remotePlayers) {
      Object.values(remotePlayers).forEach((remotePlayer) => {
        EventBus.emit("create-remote-player", remotePlayer)
        EventBus.emit("update-player", {
          player: remotePlayer,
          isCurrentPlayer: false,
        })
      })
    }
  }, [remotePlayers, sceneReady])

  useEffect(() => {
    if (!sceneReady || observerMode) {
      return
    }

    if (player) {
      EventBus.emit("update-player", { player, isCurrentPlayer: true })
    }
  }, [observerMode, player, sceneReady])

  const throttledUpdatePlayerPosition = useCallback(
    throttle(
      (position: PositionExtended) => {
        if (!player) {
          console.warn("Player is null, cannot update position")
          return
        }

        dispatch(
          updatePlayerPosition({
            position,
          }),
        )
      },
      1000,
      { leading: true, trailing: true },
    ),
    [player, dispatch],
  )

  const debouncedClaimDesk = useCallback(
    debounce((deskMarkerId: BigInt) => {
      dispatch(claimDesk(deskMarkerId.toString()))
    }, 1000),
    [dispatch],
  )

  const handlePositionUpdate = useCallback(
    (position: PositionExtended) => {
      if (
        !lastPosition ||
        lastPosition.x !== position.x ||
        lastPosition.y !== position.y ||
        lastPosition.direction !== position.direction ||
        lastPosition.depth !== position.depth
      ) {
        setLastPosition(position)
        throttledUpdatePlayerPosition(position)
      }
    },
    [lastPosition, throttledUpdatePlayerPosition],
  )

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = StartGame("game-container", { observerMode })

      if (typeof ref === "function") {
        ref({ game: game.current, scene: null })
      } else if (ref) {
        ;(ref as React.MutableRefObject<IRefPhaserGame>).current = {
          game: game.current,
          scene: null,
        }
      }
    }

    const sceneReadyListener = () => {
      setSceneReady(true)
    }

    EventBus.on("scene-ready", sceneReadyListener)

    return () => {
      EventBus.removeListener("scene-ready", sceneReadyListener)
      if (game.current) {
        game.current.destroy(true)
        game.current = null
      }
    }
  }, [observerMode, ref])

  useEffect(() => {
    if (!observerMode && !player) {
      return
    }

    const sceneReadyHandler = (scene: Phaser.Scene) => {
      if (currentActiveScene && typeof currentActiveScene === "function") {
        currentActiveScene(scene)
      }

      if (typeof ref === "function") {
        ref({ game: game.current, scene })
      } else if (ref) {
        ;(ref as React.MutableRefObject<IRefPhaserGame>).current = {
          game: game.current,
          scene,
        }
      }
    }

    const positionUpdateHandler = (position: PositionExtended) => {
      handlePositionUpdate(position)
    }

    const claimDeskHandler = ({ deskMarkerId }: { deskMarkerId: BigInt }) => {
      debouncedClaimDesk(deskMarkerId)
    }

    const setInfoTextHandler = ({ message }: { message: string }) => {
      setInfoText(message)
    }

    EventBus.on("scene-ready", sceneReadyHandler)
    if (!observerMode) {
      EventBus.on("update-player-position", positionUpdateHandler)
      EventBus.on("claim-desk", claimDeskHandler)
    }
    EventBus.on("show-info-text", setInfoTextHandler)

    return () => {
      EventBus.removeListener("scene-ready", sceneReadyHandler)
      EventBus.removeListener("update-player-position", positionUpdateHandler)
      EventBus.removeListener("claim-desk", claimDeskHandler)
      EventBus.removeListener("show-info-text", setInfoTextHandler)
    }
  }, [observerMode, player?.id, ref, currentActiveScene, debouncedClaimDesk, handlePositionUpdate])

  if (!observerMode && !player) {
    return <LoadingOverlay message="Waiting for player data..." />
  }

  return (
    <div id="game-container" {...props}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {infoText && infoText !== "" && (
          <div className="pointer-events-auto rounded bg-black bg-opacity-70 px-4 py-2 text-white">
            <p className="text-center font-pixel">{infoText}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
  PhaserGameComponent,
)
