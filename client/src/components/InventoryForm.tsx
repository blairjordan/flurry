import React, { useState, useEffect } from "react"
import Popup from "./Popup"
import Button from "./Button"
import { PlayerItem, Item } from "../types/generated"
import client from "../lib/apollo-client"
import GetItemsQuery from "../graphql/queries/getItems.graphql"
import GridLayout, { Layout } from "react-grid-layout"
import "react-grid-layout/css/styles.css"

const ITEM_SPRITE_SHEET = "/assets/special.png"
const DESK_IMAGE = "/assets/desk.png"

const TILE_SIZE = 32
const SPRITESHEET_SIZE = 640
const DESK_WIDTH = 7
const DESK_HEIGHT = 2
const INVENTORY_HEIGHT = 5

// Manage the desk and inventory inside a single grid
const TOTAL_HEIGHT = DESK_HEIGHT + INVENTORY_HEIGHT

interface InventoryFormProps {
  onClose: () => void
  onSubmit: (data: { deskSpriteIndexes: number[] }) => void
  initialPlayerItems: PlayerItem[]
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  onClose,
  onSubmit,
  initialPlayerItems,
}) => {
  const [items, setItems] = useState<Item[]>([])
  const [playerItems, setPlayerItems] = useState<PlayerItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [layout, setLayout] = useState<any[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await client.query({
          query: GetItemsQuery,
        })
        if (data && data.items) {
          setItems(data.items.nodes)
        }
        setPlayerItems(initialPlayerItems)

        // TODO: Display these inventory items instead of all items.
        // We won't query all the items from the db, just the ones the player has.
        // This means we can get rid of the graphql query above, as well as
        // the items state.
        // Items is just being queried by gql for dev
        console.log(playerItems)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  useEffect(() => {
    const initialLayout = items.map((item, index) => ({
      i: item.itemKey,
      x: index % DESK_WIDTH,
      y: DESK_HEIGHT + Math.floor(index / DESK_WIDTH),
      w: item.props.sprites.composition[0]?.length || 1,
      h: item.props.sprites.composition.length || 1,
      isResizable: false,
      isDraggable: true,
    }))
    setLayout(initialLayout)
  }, [items])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const deskSpriteIndexes = new Array(DESK_WIDTH * DESK_HEIGHT).fill(0)

    layout.forEach(({ i, x, y }) => {
      if (y < DESK_HEIGHT) {
        const item = items.find((item) => item.itemKey === i)
        if (item) {
          item.props.sprites.composition.forEach(
            (row: number[], rowIndex: number) => {
              row.forEach((spriteIndex: number, colIndex: number) => {
                const index = (y + rowIndex) * DESK_WIDTH + (x + colIndex)
                deskSpriteIndexes[index] = spriteIndex
              })
            },
          )
        }
      }
    })

    onSubmit({ deskSpriteIndexes })
    onClose()
  }

  const isValidMove = (layout: Layout[], newItem: Layout) => {
    const isWithinBounds =
      newItem.x >= 0 &&
      newItem.y >= 0 &&
      newItem.x + newItem.w <= DESK_WIDTH &&
      newItem.y + newItem.h <= TOTAL_HEIGHT

    const hasCollision = layout.some(
      (item) =>
        item.i !== newItem.i &&
        newItem.x < item.x + item.w &&
        newItem.x + newItem.w > item.x &&
        newItem.y < item.y + item.h &&
        newItem.y + newItem.h > item.y,
    )

    return isWithinBounds && !hasCollision
  }

  const handleLayoutChange = (newLayout: Layout[]) => {
    const updatedLayout = newLayout.map((newItem) => {
      if (isValidMove(newLayout, newItem)) {
        return newItem
      }
      return newItem
    })

    setLayout(updatedLayout)
  }

  const renderSprite = (spriteIndex: number) => {
    const SPRITESHEET_COLUMNS = SPRITESHEET_SIZE / TILE_SIZE
    const spriteRow = Math.floor(spriteIndex / SPRITESHEET_COLUMNS)
    const spriteColumn = spriteIndex % SPRITESHEET_COLUMNS
    return (
      <div
        className="h-8 w-8 bg-no-repeat"
        style={{
          backgroundImage: `url(${ITEM_SPRITE_SHEET})`,
          backgroundPosition: `-${spriteColumn * TILE_SIZE}px -${spriteRow * TILE_SIZE}px`,
        }}
      />
    )
  }

  return (
    <Popup onClose={onClose} title="Your Desk">
      <p>Drag items from your inventory to your desk to place them.</p>
      <style>
        {`
          .react-grid-placeholder {
            background: rgba(173, 216, 230, 0.5) !important;
            border: none !important;
          }
        `}
      </style>
      <form onSubmit={handleSubmit}>
        <div
          className="relative"
          style={{
            width: DESK_WIDTH * TILE_SIZE,
            height: TOTAL_HEIGHT * TILE_SIZE,
          }}
        >
          <img
            src={DESK_IMAGE}
            alt="Desk"
            className="absolute left-0 top-0 w-full"
            style={{
              height: `${(DESK_HEIGHT / TOTAL_HEIGHT) * 100}%`,
            }}
          />
          <div
            className="inventory-area pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center border-2 border-dashed border-gray-600 text-4xl text-white opacity-20"
            style={{
              top: `${(DESK_HEIGHT / TOTAL_HEIGHT) * 100}%`,
              height: `${(INVENTORY_HEIGHT / TOTAL_HEIGHT) * 100}%`,
            }}
          >
            <span>Inventory</span>
          </div>
          <GridLayout
            className="layout"
            layout={layout}
            cols={DESK_WIDTH}
            rowHeight={TILE_SIZE}
            margin={[0, 0]}
            width={DESK_WIDTH * TILE_SIZE}
            onLayoutChange={handleLayoutChange}
            compactType={null}
            preventCollision={true}
            isResizable={false}
            containerPadding={[0, 0]}
            maxRows={TOTAL_HEIGHT}
          >
            {items.map((item) => (
              <div
                key={item.itemKey}
                className="item"
                data-grid={{
                  x: layout.find((l) => l.i === item.itemKey)?.x || 0,
                  y: layout.find((l) => l.i === item.itemKey)?.y || 0,
                  w: item.props.sprites.composition[0]?.length || 1,
                  h: item.props.sprites.composition.length || 1,
                  isResizable: false,
                  isDraggable: true,
                }}
              >
                {item?.props.sprites.composition.map(
                  (row: number[], rowIndex: number) => (
                    <div key={rowIndex} className="flex">
                      {row.map((spriteIndex: number, colIndex: number) => (
                        <div key={colIndex} className="flex-none">
                          {renderSprite(spriteIndex)}
                        </div>
                      ))}
                    </div>
                  ),
                )}
              </div>
            ))}
          </GridLayout>
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit" color="blue">
            Save
          </Button>
          <Button onClick={onClose} color="red">
            Close
          </Button>
        </div>
      </form>
    </Popup>
  )
}

export default InventoryForm
