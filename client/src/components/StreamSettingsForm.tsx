import React, { useState, useEffect } from "react"
import Popup from "./Popup"
import Button from "./Button"
import Field from "./Field"
import { FaRegCopy } from "react-icons/fa"
import useClipboard from "../hooks/useClipboard"

interface StreamSettingsFormProps {
  onClose: () => void
  onStreamStart: () => void
  streamUrl: string
  streamKey: string
  status: "ready" | "disconnected" | "live" | string
  fetchPlayer: () => void
}

const StreamSettingsForm: React.FC<StreamSettingsFormProps> = ({
  onClose,
  onStreamStart,
  streamUrl,
  streamKey,
  status,
  fetchPlayer,
}) => {
  const { copied: urlCopied, copyToClipboard: copyUrl } = useClipboard()
  const { copied: keyCopied, copyToClipboard: copyKey } = useClipboard()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPlayer()
    }, 2000)

    return () => clearInterval(interval)
  }, [fetchPlayer])

  useEffect(() => {
    if (streamUrl && streamKey) {
      setLoading(false)
    }
  }, [streamUrl, streamKey])

  const handleAction = async (action: () => void) => {
    setLoading(true)
    setError(null)

    try {
      await action()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const isReady = status === "ready" || status === "disconnected"
  const isLive = status === "live"

  const shouldShowButton = !streamUrl && !streamKey && !loading

  return (
    <Popup onClose={onClose} title="Stream Settings">
      <div className="mb-4">
        <p className="mb-2 text-gray-300">
          {isReady
            ? "Your stream is ready to go live."
            : isLive && "🟢 You are live"}
        </p>

        {error && <p className="text-red-500">{error}</p>}

        {/* Stream URL */}
        <div className="relative mb-4">
          <div className="flex items-center justify-between">
            <label className="block text-gray-300">Stream URL</label>
            {urlCopied && (
              <span className="text-green-500">Copied to clipboard!</span>
            )}
          </div>
          <div className="relative">
            <Field
              value={streamUrl || "Create a stream to get a URL"}
              onChange={() => {}}
              className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
              type="input"
              disabled={!streamUrl}
            />
            {streamUrl && (
              <FaRegCopy
                onClick={() => copyUrl(streamUrl)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-400 hover:text-gray-200"
              />
            )}
          </div>
        </div>

        {/* Stream Key */}
        <div className="relative mb-4">
          <div className="flex items-center justify-between">
            <label className="block text-gray-300">Stream Key</label>
            {keyCopied && (
              <span className="text-green-500">Copied to clipboard!</span>
            )}
          </div>
          <div className="relative">
            <Field
              value={streamKey || "Create a stream to get a key"}
              onChange={() => {}}
              className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
              type="input"
              disabled={!streamKey}
            />
            {streamKey && (
              <FaRegCopy
                onClick={() => copyKey(streamKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-400 hover:text-gray-200"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {shouldShowButton && (
          <Button
            onClick={() => handleAction(onStreamStart)}
            color="blue"
            disabled={loading}
          >
            Start Stream
          </Button>
        )}
        {!shouldShowButton && loading && (
          <span className="flex items-center">
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2 border-white" />
            Loading...
          </span>
        )}
      </div>
    </Popup>
  )
}

export default StreamSettingsForm
