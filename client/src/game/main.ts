import { GridEngine } from "grid-engine"
import { Game } from "phaser"
import { GameScene } from "./scenes/main"

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  title: "Flurry",
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: GameScene,
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 0 },
      // debug: true, // Enable this to see the collision boxes
    },
  },
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },
  parent: "game",
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
}

const StartGame = (
  parent: string,
  options?: {
    observerMode?: boolean
  },
) => {
  const observerMode = options?.observerMode === true
  return new Game({
    ...config,
    parent,
    scene: new GameScene({ observerMode }),
  })
}

export default StartGame
