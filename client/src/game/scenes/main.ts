import {
  Direction,
  GridEngine,
  GridEngineConfig,
  NoPathFoundStrategy,
  PathBlockedStrategy,
  Position,
} from "grid-engine"
import * as Phaser from "phaser"
import { Marker, Player } from "../../types/generated"
import { EventBus } from "../EventBus"

const CHARACTER_SCALE = 0.8

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
}

const ASSETS = {
  tilesets: [
    { key: "room_builder", path: "assets/room_builder.png" },
    { key: "room_builder_office", path: "assets/room_builder_office.png" },
    { key: "modern_office", path: "assets/modern_office.png" },
    { key: "special", path: "assets/special.png" },
  ],
  tilemap: { key: "office-map", path: "assets/office.json" },
  player: {
    key: "player",
    path: "assets/characters.png",
    frameWidth: 52,
    frameHeight: 72,
    totalWidth: 156,
    totalHeight: 1728,
  },
  pet: {
    key: "pet",
    path: "assets/pets.png",
    frameWidth: 64,
    frameHeight: 64,
    totalWidth: 192,
    totalHeight: 256,
  },
}

enum PlayerState {
  Standing = "standing",
  Sitting = "sitting",
}

type PositionExtended = Position & {
  direction: Direction
  depth?: number
  state?: PlayerState
}

interface RemotePlayer {
  sprite: Phaser.Physics.Arcade.Sprite
  usernameText: Phaser.GameObjects.Text
  chatMessageText?: Phaser.GameObjects.Text
  chatMessageTimer?: Phaser.Time.TimerEvent
  position: PositionExtended
  sittingMask?: Phaser.Display.Masks.GeometryMask
  stream: Player["stream"]
  pet?: Phaser.Physics.Arcade.Sprite
}

type ObjectPosition = { x: number; y: number }

type Desk = Marker & {
  player: Player
  position: {
    topLeft: ObjectPosition
    bottomRight: ObjectPosition
    chair: ObjectPosition
  }
}

export class GameScene extends Phaser.Scene {
  private gridEngine!: GridEngine
  private playerSprite?: Phaser.Physics.Arcade.Sprite
  private petSprite?: Phaser.Physics.Arcade.Sprite
  private lastPosition: PositionExtended | null = null
  private eKey!: Phaser.Input.Keyboard.Key
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private wKey!: Phaser.Input.Keyboard.Key
  private sKey!: Phaser.Input.Keyboard.Key
  private aKey!: Phaser.Input.Keyboard.Key
  private dKey!: Phaser.Input.Keyboard.Key
  private tilemap!: Phaser.Tilemaps.Tilemap
  private sceneReady: boolean = false

  private currentPlayer: Player | null = null
  private remotePlayers: { [id: string]: RemotePlayer } = {}
  private nearDeskId: number | null = null
  private nearChairPosition: ObjectPosition | null = null
  private playerState: PlayerState = PlayerState.Standing
  private desks: Array<Desk> = []
  private deskLabels: Phaser.GameObjects.Text[] = []
  private playerChatText?: Phaser.GameObjects.Text
  private playerChatTimer?: Phaser.Time.TimerEvent
  private playerStatusText?: Phaser.GameObjects.Text
  private observerMode: boolean = false
  private observerSpeed: number = 12

  constructor(options?: { observerMode?: boolean }) {
    super(sceneConfig)
    this.observerMode = options?.observerMode === true
  }

  preload() {
    ASSETS.tilesets.forEach((tileset) =>
      this.load.image(tileset.key, tileset.path),
    )
    this.load.tilemapTiledJSON(ASSETS.tilemap.key, ASSETS.tilemap.path)
    this.load.spritesheet(ASSETS.player.key, ASSETS.player.path, {
      frameWidth: ASSETS.player.frameWidth,
      frameHeight: ASSETS.player.frameHeight,
    })
    this.load.spritesheet(ASSETS.pet.key, ASSETS.pet.path, {
      frameWidth: ASSETS.pet.frameWidth,
      frameHeight: ASSETS.pet.frameHeight,
    })
  }

  create() {
    this.tilemap = this.make.tilemap({ key: ASSETS.tilemap.key })

    const tilesets = ASSETS.tilesets
      .map((tileset) => this.tilemap.addTilesetImage(tileset.key, tileset.key))
      .filter((tileset): tileset is Phaser.Tilemaps.Tileset => tileset !== null)

    const layerNames = [
      "ground",
      "shadows",
      "walls",
      "edges",
      "desks",
      "objects",
      "chairs",
      "benches",
      "chairs_behind",
    ]
    const layers = layerNames.map((name) =>
      this.tilemap.createLayer(name, tilesets, 0, 0),
    )

    if (layers.includes(null)) {
      console.warn("One or more layers are not available")
    }

    // Set collision for specific layers by setting the 'ge_collide' property
    ;[
      "walls",
      "edges",
      "desks",
      "objects",
      "chairs",
      "benches",
      "chairs_behind",
    ].forEach((layerName) => {
      const layer = this.tilemap.getLayer(layerName)?.tilemapLayer
      if (layer) {
        layer.forEachTile((tile) => {
          tile.properties.ge_collide = true
        })
      }
    })

    if (!this.observerMode) {
      this.createPlayer()
    }
    this.setupGridEngine(this.tilemap)
    this.setupCamera()

    if (this.playerSprite) {
      // Enable physics interactions between the player and collidable layers
      this.physics.add.collider(
        this.playerSprite,
        layers.filter((layer) => layer !== null),
      )
    }

    this.setupEventListeners()

    if (this.input.keyboard) {
      this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)

      this.cursors = this.input.keyboard.createCursorKeys()
      this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
      this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
      this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
      this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    this.sceneReady = true
    EventBus.emit("scene-ready")
  }

  private createPlayer() {
    this.playerSprite = this.physics.add.sprite(96, 96, ASSETS.player.key)
    this.playerSprite.setScale(CHARACTER_SCALE)

    // Add status text for current player
    this.playerStatusText = this.add.text(96, 96, "", {
      fontSize: "12px",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 4, y: 2 },
    })
    this.playerStatusText.setOrigin(0.5, 1)
    this.playerStatusText.setDepth(1000)
  }

  private updatePetPosition() {
    if (!this.gridEngine) return

    if (!this.petSprite) {
      return
    }

    const playerPosition = this.gridEngine.getPosition("player")

    if (!this.gridEngine.isMoving("pet")) {
      this.gridEngine
        .moveTo("pet", playerPosition, {
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        })
        .subscribe({
          complete: () => {
            this.gridEngine.turnTowards(
              "pet",
              this.gridEngine.getFacingDirection("player"),
            )
          },
        })
    }
  }

  private updateRemotePetPositions() {
    for (const playerId in this.remotePlayers) {
      const remotePlayer = this.remotePlayers[playerId]
      if (!remotePlayer.pet) continue

      const remotePlayerPosition = this.gridEngine.getPosition(playerId)

      const petId = `${playerId}-pet`
      if (!this.gridEngine.isMoving(petId)) {
        this.gridEngine
          .moveTo(petId, remotePlayerPosition, {
            noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
            pathBlockedStrategy: PathBlockedStrategy.WAIT,
          })
          .subscribe({
            complete: () => {
              this.gridEngine.turnTowards(
                petId,
                this.gridEngine.getFacingDirection(playerId),
              )
            },
          })
      }
    }
  }

  private createRemotePet = (playerData: Player) => {
    if (!playerData.playerPets?.nodes?.length) {
      return null
    }

    const firstPetData = playerData.playerPets.nodes[0]
    const petCharacterIndex = firstPetData.pet?.spriteIndex ?? 0

    const startX = (playerData.position?.x ?? 0) + 1
    const startY = playerData.position?.y ?? 0

    const petSprite = this.physics.add.sprite(startX * 32, startY * 32, "pet")
    petSprite.setScale(CHARACTER_SCALE)
    petSprite.setData("characterIndex", petCharacterIndex)

    this.gridEngine.addCharacter({
      id: `${playerData.id}-pet`,
      sprite: petSprite,
      walkingAnimationMapping: petCharacterIndex,
      startPosition: { x: startX, y: startY },
    })

    return petSprite
  }

  private setupCamera() {
    if (!this.observerMode && this.playerSprite) {
      this.cameras.main.startFollow(this.playerSprite, true)
      this.cameras.main.setFollowOffset(
        -this.playerSprite.width / 2,
        -this.playerSprite.height / 2,
      )
      return
    }

    this.cameras.main.stopFollow()
    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    )
    this.cameras.main.centerOn(
      this.tilemap.widthInPixels / 2,
      this.tilemap.heightInPixels / 2,
    )
  }

  private setupGridEngine(officeTilemap: Phaser.Tilemaps.Tilemap) {
    const gridEngineConfig: GridEngineConfig = {
      characters: this.observerMode
        ? []
        : [
        {
          id: "player",
          sprite: this.playerSprite!,
          walkingAnimationMapping: 0,
          startPosition: { x: 3, y: 3 },
        },
      ],
    }

    this.gridEngine.create(officeTilemap, gridEngineConfig)
  }

  private placeItemsOnDesk = (desk: Desk, spriteIndexes: number[]) => {
    const { topLeft, bottomRight } = desk.position
    const deskWidth = bottomRight.x - topLeft.x + 1

    const tileset = this.tilemap.tilesets.find(
      (tileset) => tileset.name === "special",
    )
    if (!tileset) {
      console.error("Tileset 'special' not found")
      return
    }

    const firstGid = tileset.firstgid

    spriteIndexes.forEach((spriteIndex, idx) => {
      const x = topLeft.x + (idx % deskWidth)
      const y = topLeft.y + Math.floor(idx / deskWidth)

      if (spriteIndex > 0 && x <= bottomRight.x && y <= bottomRight.y) {
        this.tilemap.putTileAt(spriteIndex + firstGid, x, y, true, "objects")
      }
    })
  }

  private updateCharacterSprite = (
    id: string,
    sprite: Phaser.Physics.Arcade.Sprite,
    newCharacterIndex: number,
    position: Position,
  ) => {
    if (sprite.getData("characterIndex") !== newCharacterIndex) {
      sprite.setData("characterIndex", newCharacterIndex)
      this.gridEngine.removeCharacter(id)
      this.gridEngine.addCharacter({
        id: id,
        sprite: sprite,
        walkingAnimationMapping: newCharacterIndex,
        startPosition: position,
      })
    }
  }

  private setupEventListeners() {
    EventBus.emit("scene-ready", this)
    EventBus.on("create-remote-player", this.createRemotePlayer, this)
    EventBus.on("update-player", this.updateRemotePlayer, this)
    EventBus.on("remove-remote-player", this.removeRemotePlayer, this)
    EventBus.on("set-desks", this.setDesks, this)
    EventBus.on(
      "chat-message",
      ({ playerId, message }: { playerId: string; message: string }) => {
        this.displayChatMessage(playerId, message)
      },
    )
  }

  private setDesks = (desks: Desk[]) => {
    this.desks = desks
    if (this.sceneReady) {
      this.createDeskLabels()
      this.updateDeskItems()
    }
  }

  private updateDeskItems = () => {
    const objectsLayer = this.tilemap.getLayer("objects")?.tilemapLayer
    if (!objectsLayer) {
      return
    }

    // Clear items from all desks
    this.desks.forEach((desk) => {
      const { topLeft, bottomRight } = desk.position
      for (let y = topLeft.y; y <= bottomRight.y; y++) {
        for (let x = topLeft.x; x <= bottomRight.x; x++) {
          objectsLayer.removeTileAt(x, y)
        }
      }
    })

    // Place items on desks that have players and items
    this.desks.forEach((desk) => {
      if (
        desk.player &&
        desk.player.meta &&
        desk.player.meta.deskSpriteIndexes
      ) {
        const spriteIndexes = desk.player.meta.deskSpriteIndexes
        this.placeItemsOnDesk(desk, spriteIndexes)
      }
    })
  }

  private createDeskLabels = () => {
    // TODO: only remove labels we need to update
    this.deskLabels.forEach((deskLabel) => deskLabel.destroy())

    this.desks.forEach((desk) => {
      if (desk.player && this.tilemap.layers.length > 0) {
        const { username, meta } = desk.player
        const name = meta?.fullName || username
        const role = meta?.role || ""
        const company = meta?.company || ""
        const labelText = `${name}\n${role}${role && company ? ", " : ""}${company}`
        const deskPosition = desk.position
        const topLeftPixel = {
          x: this.tilemap.tileToWorldX(deskPosition.topLeft.x),
          y: this.tilemap.tileToWorldY(deskPosition.topLeft.y),
        }
        const bottomRightPixel = {
          x: this.tilemap.tileToWorldX(deskPosition.bottomRight.x),
          y: this.tilemap.tileToWorldY(deskPosition.bottomRight.y),
        }
        if (!(topLeftPixel.x && bottomRightPixel.x && topLeftPixel.y)) {
          return
        }
        const centerX = (topLeftPixel.x + bottomRightPixel.x) / 2 + 15
        const centerY = topLeftPixel.y - 5

        const text = this.add.text(centerX, centerY, labelText, {
          fontSize: "12px",
          color: "#ffffff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: { x: 4, y: 2 },
        })
        this.deskLabels.push(text)
        text.setOrigin(0.5, 1)
        text.setDepth(1000)
      }
    })
  }

  private createRemotePlayer = (playerData: Player) => {
    if (
      !this.sceneReady ||
      !this.physics.add ||
      !playerData.id ||
      this.remotePlayers[playerData.id] ||
      !(
        playerData.position?.x &&
        playerData.position?.y &&
        playerData.position?.direction
      )
    ) {
      return
    }

    const { position } = playerData
    const characterIndex = playerData.meta?.characterIndex || 0

    const sprite = this.physics.add
      .sprite(position.x, position.y, ASSETS.player.key)
      .setInteractive()
      .setName(playerData.id)
      .setScale(CHARACTER_SCALE)
      .on("pointerover", (_pointer: Phaser.Input.Pointer) => {
        this.input.setDefaultCursor("pointer")
      })
      .on("pointerout", (_pointer: Phaser.Input.Pointer) => {
        this.input.setDefaultCursor("default")
      })
      .on("pointerup", (_pointer: Phaser.Input.Pointer) => {
        EventBus.emit("player-clicked", playerData.id)
      })

    const usernameText = this.add.text(
      position.x,
      position.y,
      playerData.meta?.fullName || playerData.username,
      {
        fontSize: "12px",
        color: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 4, y: 2 },
      },
    )
    usernameText.setOrigin(0.5, 1)
    usernameText.setDepth(1000)

    this.gridEngine.addCharacter({
      id: playerData.id,
      sprite: sprite,
      walkingAnimationMapping: characterIndex,
      startPosition: position,
    })

    const petSprite = this.createRemotePet(playerData)

    this.remotePlayers[playerData.id] = {
      sprite,
      usernameText,
      position,
      stream: playerData.stream,
      pet: petSprite || undefined,
    }
  }

  private formatPlayerStatusText(player: Player): string {
    const username = player.meta?.fullName || player.username
    let status = ""

    // Calculate if status is within past 15 minutes
    if (player.meta?.status?.timestamp) {
      const currentTime = Date.now()
      const timeElapsed = currentTime - player.meta.status.timestamp
      if (timeElapsed <= 15 * 60 * 1000) {
        status = player.meta.status.state || ""
      }
    }

    return `${username}${status !== "" ? `\n${status}` : ""}${player.stream?.status === "live" ? `\n🟢 Live` : ""}`
  }

  private updateRemotePlayer = ({
    player,
    isCurrentPlayer,
  }: {
    player: Player
    isCurrentPlayer: boolean
  }) => {
    if (!this.textures.exists(ASSETS.player.key)) {
      console.warn("Player texture not loaded yet.")
      return
    }

    if (isCurrentPlayer) {
      if (!this.playerSprite) {
        return
      }

      if (!this.currentPlayer) {
        this.currentPlayer = player
      }

      const newCharacterIndex = player.meta?.characterIndex || 0

      // Replace player sprite if character index has changed
      if (this.playerSprite.getData("characterIndex") !== newCharacterIndex) {
        this.playerSprite.setData("characterIndex", newCharacterIndex)
        this.gridEngine.removeCharacter("player")
        this.gridEngine.addCharacter({
          id: "player",
          sprite: this.playerSprite,
          walkingAnimationMapping: newCharacterIndex,
          startPosition: player.position,
        })
      }

      // Update current player's status text
      if (this.playerStatusText) {
        this.playerStatusText.setText(this.formatPlayerStatusText(player))
        this.playerStatusText.setPosition(
          this.playerSprite.x + this.playerSprite.width / 2.5,
          this.playerSprite.y,
        )
        this.playerStatusText.setDepth(1000)
      }

      const hasPet = player.playerPets?.nodes?.length > 0

      if (hasPet) {
        const petCharacterIndex =
          player.playerPets.nodes[0].pet?.spriteIndex || 0

        if (!this.petSprite) {
          this.petSprite = this.physics.add.sprite(160, 96, ASSETS.pet.key)
          this.petSprite.setScale(CHARACTER_SCALE)
          this.petSprite.setData("characterIndex", petCharacterIndex)

          this.gridEngine.addCharacter({
            id: "pet",
            sprite: this.petSprite,
            walkingAnimationMapping: petCharacterIndex,
            startPosition: { x: 5, y: 3 },
          })
        } else if (
          this.petSprite.getData("characterIndex") !== petCharacterIndex
        ) {
          this.petSprite.setData("characterIndex", petCharacterIndex)
          const petPosition =
            this.gridEngine.getPosition("pet") || player.position
          this.gridEngine.removeCharacter("pet")
          this.gridEngine.addCharacter({
            id: "pet",
            sprite: this.petSprite,
            walkingAnimationMapping: petCharacterIndex,
            startPosition: petPosition,
          })
        }
      }
    }
    const remotePlayer = this.remotePlayers[player.id]

    if (!remotePlayer) {
      return
    }

    if (this.gridEngine.isMoving(player.id)) {
      this.gridEngine.stopMovement(player.id)
    }

    const newCharacterIndex = player.meta?.characterIndex || 0

    // Replace remote player sprite if character index has changed
    if (remotePlayer.sprite.getData("characterIndex") !== newCharacterIndex) {
      remotePlayer.sprite.setData("characterIndex", newCharacterIndex)
      this.gridEngine.removeCharacter(player.id)
      this.gridEngine.addCharacter({
        id: player.id,
        sprite: remotePlayer.sprite,
        walkingAnimationMapping: newCharacterIndex,
        startPosition: player.position,
      })
      this.updateCharacterSprite(
        player.id,
        remotePlayer.sprite,
        newCharacterIndex,
        player.position,
      )
    }

    if (player.playerPets?.nodes?.length > 0) {
      const petCharacterIndex = player.playerPets.nodes[0].pet?.spriteIndex || 0

      if (!remotePlayer.pet) {
        const pet = this.createRemotePet(player)
        if (pet) {
          remotePlayer.pet = pet
        }
      }

      if (remotePlayer.pet) {
        if (remotePlayer.pet.getData("characterIndex") !== petCharacterIndex) {
          remotePlayer.pet.setData("characterIndex", petCharacterIndex)

          const petPosition =
            this.gridEngine.getPosition(`${player.id}-pet`) || player.position

          this.gridEngine.removeCharacter(`${player.id}-pet`)

          this.gridEngine.addCharacter({
            id: `${player.id}-pet`,
            sprite: remotePlayer.pet,
            walkingAnimationMapping: petCharacterIndex,
            startPosition: petPosition,
          })
        }

        const remotePlayerPosition = this.gridEngine.getPosition(player.id)
        this.gridEngine.moveTo(`${player.id}-pet`, remotePlayerPosition, {
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        })
      }
    }

    remotePlayer.position = player.position

    if (remotePlayer.position.state === PlayerState.Sitting) {
      // Force player into sitting position (avoiding collision)
      this.gridEngine.setPosition(player.id, player.position)

      this.setSittingMask(
        player.position,
        remotePlayer.sprite,
        PlayerState.Sitting,
        player.id,
        (mask) => {
          this.remotePlayers[player.id].sittingMask = mask
        },
      )
    }

    if (remotePlayer.position.state === PlayerState.Standing) {
      this.setSittingMask(
        player.position,
        remotePlayer.sprite,
        PlayerState.Standing,
      )
      this.remotePlayers[player.id].sittingMask = undefined
    }

    this.gridEngine.moveTo(player.id, player.position)
    this.gridEngine.moveTo(player.id, player.position).subscribe({
      complete: () => {
        this.gridEngine.turnTowards(player.id, player.position.direction)
      },
    })

    remotePlayer.sprite.setDepth(remotePlayer.position.depth || 0)
    remotePlayer.usernameText.setText(this.formatPlayerStatusText(player))
  }

  private removeRemotePlayer = (playerId: string) => {
    const remotePlayer = this.remotePlayers[playerId]
    if (remotePlayer) {
      this.gridEngine.removeCharacter(playerId)
      remotePlayer.sprite.destroy()
      remotePlayer.usernameText.destroy()

      if (remotePlayer.pet) {
        this.gridEngine.removeCharacter(`${playerId}-pet`)
        remotePlayer.pet.destroy()
      }

      delete this.remotePlayers[playerId]
    }
  }

  handleKeyboardInput() {
    if (this.observerMode) {
      this.handleObserverKeyboardInput()
      return
    }

    if (!this.input.keyboard) {
      throw new Error("Input keyboard is not available")
    }

    if (this.playerState === PlayerState.Sitting) {
      if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
        this.setSitting(false)
      }
      return
    }

    if (this.cursors.left.isDown || this.aKey.isDown) {
      this.gridEngine.move("player", Direction.LEFT)
    } else if (this.cursors.right.isDown || this.dKey.isDown) {
      this.gridEngine.move("player", Direction.RIGHT)
    } else if (this.cursors.up.isDown || this.wKey.isDown) {
      this.gridEngine.move("player", Direction.UP)
    } else if (this.cursors.down.isDown || this.sKey.isDown) {
      this.gridEngine.move("player", Direction.DOWN)
    } else {
      this.gridEngine.stopMovement("player")
    }

    this.triggerPositionUpdate()

    if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
      this.handleInteraction()
    }
  }

  private handleObserverKeyboardInput() {
    const camera = this.cameras.main

    let dx = 0
    let dy = 0

    if (this.cursors.left.isDown || this.aKey.isDown) {
      dx -= this.observerSpeed
    }
    if (this.cursors.right.isDown || this.dKey.isDown) {
      dx += this.observerSpeed
    }
    if (this.cursors.up.isDown || this.wKey.isDown) {
      dy -= this.observerSpeed
    }
    if (this.cursors.down.isDown || this.sKey.isDown) {
      dy += this.observerSpeed
    }

    if (dx !== 0 || dy !== 0) {
      camera.scrollX += dx
      camera.scrollY += dy
    }
  }

  handleInteraction() {
    if (this.nearChairPosition !== null) {
      this.setSitting(true)
    } else if (this.nearDeskId !== null) {
      EventBus.emit("claim-desk", {
        deskMarkerId: this.nearDeskId,
      })
      EventBus.emit("show-info-text", { message: "" })
    }
  }

  setChairCollission(position: Position, collide: boolean) {
    const chairLayer = this.tilemap.getLayer("chairs")?.tilemapLayer
    if (!chairLayer) return

    const chairTile = chairLayer.getTileAt(position.x, position.y)

    if (!chairTile) {
      return
    }

    chairTile.properties.ge_collide = collide
  }

  setSitting(isSitting: boolean) {
    if (!this.nearChairPosition) {
      return
    }

    if (
      (isSitting && this.playerState === PlayerState.Sitting) ||
      (!isSitting && this.playerState === PlayerState.Standing)
    ) {
      return
    }

    this.gridEngine.setPosition(
      "player",
      isSitting
        ? this.nearChairPosition
        : {
            x: this.nearChairPosition.x + 1,
            y: this.nearChairPosition.y,
          },
    )

    this.setSittingMask(
      this.nearChairPosition,
      this.playerSprite!,
      isSitting ? PlayerState.Sitting : PlayerState.Standing,
    )

    this.playerState = isSitting ? PlayerState.Sitting : PlayerState.Standing

    this.triggerPositionUpdate()
  }

  setSittingMask(
    position: Position,
    playerSprite: Phaser.Physics.Arcade.Sprite,
    playerState: PlayerState,
    playerId: string = "player",
    callback?: (mask: Phaser.Display.Masks.GeometryMask) => void,
  ) {
    this.setChairCollission(position, false)

    const sitFn = () => {
      switch (playerState) {
        case PlayerState.Sitting:
          this.gridEngine.turnTowards(playerId, Direction.UP)
          const maskGraphics = this.add.graphics()
          maskGraphics.fillRect(
            playerSprite.x,
            playerSprite.y - playerSprite.height / 2,
            playerSprite.width,
            playerSprite.height - 24,
          )

          const mask = maskGraphics.createGeometryMask()
          playerSprite.setMask(mask)

          if (callback) {
            callback(mask)
          }
          break

        case PlayerState.Standing:
          playerSprite.clearMask()
          break

        default:
          break
      }
    }

    this.time.delayedCall(100, sitFn)

    this.setChairCollission(position, true)
  }

  update() {
    this.handleKeyboardInput()
    if (!this.observerMode) {
      this.updatePlayerNearDeskOrChair()
      this.updatePetPosition()
    }
    this.updateTextPositions()
    this.updateRemotePetPositions()
  }

  private triggerPositionUpdate() {
    const currentPosition: PositionExtended = {
      ...this.gridEngine.getPosition("player"),
      direction: this.gridEngine.getFacingDirection("player"),
      state: this.playerState,
    }

    if (
      !this.lastPosition ||
      this.lastPosition.x !== currentPosition.x ||
      this.lastPosition.y !== currentPosition.y ||
      this.lastPosition.direction !== currentPosition.direction ||
      this.lastPosition.depth !== currentPosition.depth ||
      this.lastPosition.state !== currentPosition.state
    ) {
      EventBus.emit("update-player-position", currentPosition)
      this.lastPosition = currentPosition
    }
  }

  private updatePlayerNearDeskOrChair() {
    if (this.playerState === PlayerState.Sitting) {
      EventBus.emit("show-info-text", { message: "Press E to stand up" })
      return
    }

    const position = this.gridEngine.getPosition("player")

    let message = ""
    this.nearDeskId = null
    this.nearChairPosition = null

    for (const desk of this.desks) {
      const { topLeft, bottomRight, chair } = desk.position
      const isDeskNearby = this.isPlayerNearDesk(position, topLeft, bottomRight)
      const isChairNearby = this.isPlayerNearChair(position, chair)
      const isOwner = this.isCurrentPlayerOwner(desk)

      if (isDeskNearby) {
        this.nearDeskId = desk.id

        if (!desk.player) {
          message = "Press E to claim desk"
        } else if (isOwner && isChairNearby) {
          this.nearChairPosition = chair
          message = "Press E to sit at your chair"
        }
        break
      }
    }

    EventBus.emit("show-info-text", { message })
  }

  private isPlayerNearDesk(
    position: { x: number; y: number },
    topLeft: ObjectPosition,
    bottomRight: ObjectPosition,
  ): boolean {
    return (
      position.x >= topLeft.x - 1 &&
      position.x <= bottomRight.x + 1 &&
      position.y >= topLeft.y - 1 &&
      position.y <= bottomRight.y + 1
    )
  }

  private isPlayerNearChair(
    position: { x: number; y: number },
    chair: ObjectPosition,
  ): boolean {
    return (
      (Math.abs(position.x - chair.x) <= 1 && position.y === chair.y) ||
      (Math.abs(position.y - chair.y) <= 1 && position.x === chair.x)
    )
  }

  private isCurrentPlayerOwner(desk: Desk): boolean {
    return (
      !!this.currentPlayer &&
      desk.player &&
      desk.player.id === this.currentPlayer.id
    )
  }

  private updateTextPositions() {
    // Update current player's text positions (when local player exists).
    if (this.playerSprite && this.playerStatusText) {
      this.playerStatusText.setPosition(
        this.playerSprite.x + this.playerSprite.width / 2.5,
        this.playerSprite.y,
      )
      this.playerStatusText.setDepth(1000)
    }

    if (this.playerSprite && this.playerChatText) {
      this.playerChatText.setPosition(
        this.playerSprite.x + this.playerSprite.width / 2.5,
        this.playerSprite.y - 30,
      )
      this.playerChatText.setDepth(1001)
    }

    // Update remote players' text positions
    for (const playerId in this.remotePlayers) {
      const remotePlayer = this.remotePlayers[playerId]
      const sprite = remotePlayer.sprite
      const usernameText = remotePlayer.usernameText
      const chatText = remotePlayer.chatMessageText

      usernameText.setPosition(sprite.x + sprite.width / 2.5, sprite.y)
      usernameText.setDepth(1000)

      if (chatText) {
        chatText.setPosition(sprite.x + sprite.width / 2.5, sprite.y - 30)
        chatText.setDepth(1001)
      }
    }
  }

  private displayChatMessage(
    playerId: string,
    message: string,
    duration: number = 10000,
  ) {
    const isCurrentPlayer =
      playerId === this.currentPlayer?.id || playerId === "player"
    if (isCurrentPlayer && !this.playerSprite) {
      return
    }
    const truncatedMessage =
      message.length > 50 ? message.substring(0, 47) + "..." : message

    const textConfig = {
      fontSize: "14px",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 4, y: 2 },
      wordWrap: { width: 200 },
    }

    if (isCurrentPlayer) {
      // Remove existing chat message if any
      if (this.playerChatText) {
        this.playerChatText.destroy()
      }
      if (this.playerChatTimer) {
        this.playerChatTimer.destroy()
      }

      // Create new chat message
      this.playerChatText = this.add.text(
        this.playerSprite.x + this.playerSprite.width / 2.5,
        this.playerSprite.y - 30,
        truncatedMessage,
        textConfig,
      )
      this.playerChatText.setOrigin(0.5, 1)
      this.playerChatText.setDepth(1001) // Above usernames

      // Set timer to remove the message
      this.playerChatTimer = this.time.delayedCall(duration, () => {
        if (this.playerChatText) {
          this.playerChatText.destroy()
          this.playerChatText = undefined
        }
      })
    } else {
      const remotePlayer = this.remotePlayers[playerId]
      if (!remotePlayer) return

      // Remove existing chat message if any
      if (remotePlayer.chatMessageText) {
        remotePlayer.chatMessageText.destroy()
      }
      if (remotePlayer.chatMessageTimer) {
        remotePlayer.chatMessageTimer.destroy()
      }

      // Create new chat message
      remotePlayer.chatMessageText = this.add.text(
        remotePlayer.sprite.x + remotePlayer.sprite.width / 2.5,
        remotePlayer.sprite.y - 30,
        truncatedMessage,
        textConfig,
      )
      remotePlayer.chatMessageText.setOrigin(0.5, 1)
      remotePlayer.chatMessageText.setDepth(1001) // Above usernames

      // Set timer to remove the message
      remotePlayer.chatMessageTimer = this.time.delayedCall(duration, () => {
        if (remotePlayer.chatMessageText) {
          remotePlayer.chatMessageText.destroy()
          remotePlayer.chatMessageText = undefined
        }
      })
    }
  }
}
