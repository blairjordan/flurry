import { useEffect } from "react"
import { EventBus } from "../game/EventBus"
import { Player } from "../types/generated"

export const usePlayerClicked = (
  onPlayerClicked: (selectedPlayerId: Player["id"]) => void,
) => {
  useEffect(() => {
    EventBus.on("player-clicked", onPlayerClicked)
    return () => {
      EventBus.off("player-clicked", onPlayerClicked)
    }
  }, [onPlayerClicked])
}
