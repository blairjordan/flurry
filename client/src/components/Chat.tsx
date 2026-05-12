import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { FaEnvelope } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { fetchPrivateMessages, sendMessage } from "../redux/actions"
import { AppDispatch, RootState } from "../redux/store"
import { Message, Player } from "../types/generated"
import Field from "./Field"

interface LocalMessage extends Message {
  read: boolean
}

interface PrivateThread {
  playerId: number
  username: string
  isActive: boolean
  hasNew: boolean
  type: "private"
}

interface GlobalThread {
  isActive: boolean
  type: "global"
}

type ChatThread = PrivateThread | GlobalThread

const isPrivateThread = (thread: ChatThread): thread is PrivateThread =>
  thread.type === "private"

const Chat = forwardRef<
  { addPrivateThread: (player: Player) => void },
  { playerId: number }
>(({ playerId }, ref) => {
  const [messageInput, setMessageInput] = useState("")
  const [activeThread, setActiveThread] = useState<ChatThread>({
    isActive: true,
    type: "global",
  })
  const [privateThreads, setPrivateThreads] = useState<PrivateThread[]>([])
  const [localPrivateMessages, setLocalPrivateMessages] = useState<
    LocalMessage[]
  >([])
  const [readMessageIds, setReadMessageIds] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("readMessageIds") || "[]"),
  )

  const globalMessages = useSelector(
    (state: RootState) => state.app.globalMessages,
  )
  const privateMessages = useSelector(
    (state: RootState) => state.app.privateMessages,
  )

  const dispatch = useDispatch<AppDispatch>()
  const isSubscribed = useRef(false)
  const chatHistoryRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch messages and subscribe to updates
  useEffect(() => {
    if (!isSubscribed.current) {
      dispatch(fetchPrivateMessages())
      isSubscribed.current = true
    }

    const fetchMessagesInterval = setInterval(() => {
      dispatch(fetchPrivateMessages())
    }, 5_000)

    return () => clearInterval(fetchMessagesInterval)
  }, [dispatch])

  // Update local private messages based on read status and active thread
  useEffect(() => {
    const updatedMessages = privateMessages.map((msg) => ({
      ...msg,
      read:
        readMessageIds.includes(msg.id) ||
        (isPrivateThread(activeThread) &&
          msg.player?.id === activeThread.playerId),
    }))

    setLocalPrivateMessages(updatedMessages)

    if (isPrivateThread(activeThread)) {
      const newReadMessageIds = updatedMessages
        .filter((msg) => msg.read)
        .map((msg) => msg.id)

      if (
        JSON.stringify(newReadMessageIds) !== JSON.stringify(readMessageIds)
      ) {
        setReadMessageIds(newReadMessageIds)
        localStorage.setItem(
          "readMessageIds",
          JSON.stringify(newReadMessageIds),
        )
      }
    }
  }, [privateMessages, activeThread, readMessageIds])

  // Update private threads based on local private messages
  useEffect(() => {
    const threads = Array.from(
      new Set(localPrivateMessages.map((msg) => msg.player?.id)),
    )
      .filter(Boolean)
      .map((playerId) => {
        const playerMessages = localPrivateMessages.filter(
          (msg) => msg.player?.id === playerId,
        )
        const hasUnreadMessages = playerMessages.some((msg) => !msg.read)

        return {
          playerId,
          username: playerMessages[0]?.player?.username || "Unknown",
          hasNew: hasUnreadMessages,
          isActive: false,
          type: "private" as const,
        }
      })

    setPrivateThreads((prevThreads) => {
      const mergedThreads = threads.map((newThread) => {
        const existingThread = prevThreads.find(
          (thread) => thread.playerId === newThread.playerId,
        )
        return existingThread
          ? { ...newThread, isActive: existingThread.isActive }
          : newThread
      })

      const extraThreads = prevThreads.filter(
        (thread) => !threads.some((t) => t.playerId === thread.playerId),
      )

      return [...mergedThreads, ...extraThreads]
    })
  }, [localPrivateMessages])

  // Scroll chat history to the bottom when messages update
  useEffect(() => {
    chatHistoryRef.current?.scrollTo(0, chatHistoryRef.current.scrollHeight)
  }, [globalMessages, localPrivateMessages, activeThread])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setMessageInput(e.target.value)

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const targetPlayerId = isPrivateThread(activeThread)
      ? activeThread.playerId
      : undefined

    dispatch(sendMessage({ message: messageInput, targetPlayerId }))
    setMessageInput("")
  }

  const handleThreadClick = (thread: PrivateThread) => {
    setActiveThread(thread)

    const updatedMessages = localPrivateMessages.map((msg) =>
      msg.player?.id === thread.playerId ? { ...msg, read: true } : msg,
    )
    setLocalPrivateMessages(updatedMessages)

    const newReadMessageIds = updatedMessages
      .filter((msg) => msg.read)
      .map((msg) => msg.id)

    setReadMessageIds(newReadMessageIds)
    localStorage.setItem("readMessageIds", JSON.stringify(newReadMessageIds))

    setPrivateThreads((prevThreads) =>
      prevThreads.map((t) =>
        t.playerId === thread.playerId ? { ...t, hasNew: false } : t,
      ),
    )
  }

  const renderMessages = () => {
    const messagesToRender = isPrivateThread(activeThread)
      ? localPrivateMessages.filter(
          (msg) =>
            (msg.player?.id === playerId &&
              msg.targetPlayerId === activeThread.playerId) ||
            (msg.player?.id === activeThread.playerId &&
              msg.targetPlayerId === playerId),
        )
      : globalMessages

    return messagesToRender.map(({ id, player, message }) => (
      <div key={id} className="chat-message mb-2">
        <strong
          className={
            playerId === player?.id ? "text-green-600" : "text-yellow-400"
          }
        >
          {player?.meta?.fullName || player?.username}
        </strong>
        : {message}
      </div>
    ))
  }

  useImperativeHandle(ref, () => ({
    addPrivateThread: (player: Player) => {
      setPrivateThreads((prevThreads) => {
        const existingThread = prevThreads.find(
          (thread) => thread.playerId === player.id,
        )
        if (!existingThread) {
          const newThread: PrivateThread = {
            playerId: player.id,
            username: player.username,
            isActive: true,
            hasNew: false,
            type: "private",
          }
          return [...prevThreads, newThread]
        }
        return prevThreads
      })

      setActiveThread({
        playerId: player.id,
        username: player.username,
        isActive: true,
        hasNew: false,
        type: "private",
      })
    },
  }))

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter") handleSendMessage()
    if (event.key === "Escape") inputRef.current?.blur()
    if (event.key === " ") {
      event.stopPropagation()
    }
  }

  return (
    <div className="chat-container text-md flex h-full flex-col bg-gray-800 p-4 font-pixel text-white">
      {/* Threads */}
      <div className="mb-4 flex w-fit justify-evenly space-x-4">
        <div
          key="global"
          className={`relative max-w-fit cursor-pointer rounded p-2 shadow-lg transition-transform hover:scale-110 ${
            activeThread.type === "global" ? "bg-blue-500" : "bg-gray-500"
          }`}
          onClick={() => setActiveThread({ isActive: true, type: "global" })}
        >
          Global
        </div>

        {privateThreads
          .filter((thread) => thread.playerId !== playerId)
          .map((thread) => (
            <div
              key={thread.playerId}
              className={`relative max-w-fit cursor-pointer rounded p-2 shadow-lg transition-transform hover:scale-110 ${
                isPrivateThread(activeThread) &&
                activeThread.playerId === thread.playerId
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
              onClick={() => handleThreadClick(thread)}
            >
              {thread.username}
              {thread.hasNew && (
                <span className="absolute right-0 top-0 -mr-2 -mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs">
                  <FaEnvelope />
                </span>
              )}
            </div>
          ))}
      </div>

      {/* Chat history */}
      <div
        ref={chatHistoryRef}
        className="chat-history flex-grow overflow-y-scroll rounded bg-gray-700 p-2"
      >
        {renderMessages()}
      </div>

      {/* Input field */}
      <div className="chat-input mt-4 flex">
        <Field
          ref={inputRef}
          value={messageInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="input-field mr-2 flex-1 rounded bg-gray-600 p-2 text-white"
          placeholder="Type your message...(Press [Esc] to return to game)"
        />
        <button
          onClick={handleSendMessage}
          className="send-button rounded bg-blue-600 p-2 font-pixel text-white shadow-lg transition-transform hover:scale-110"
        >
          Send
        </button>
      </div>
    </div>
  )
})

export default Chat
