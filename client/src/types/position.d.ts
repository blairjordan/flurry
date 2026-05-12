import { Position } from "grid-engine"

export type PositionExtended = Position & { direction: string; depth: number }
