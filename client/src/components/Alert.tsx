import { useCallback } from "react"
import Popup from "./Popup"

interface AlertOption {
  label: string
  value: string
}

interface AlertProps {
  title?: string | null
  message?: string | null
  options?: AlertOption[] | null
  onClose: () => void
  onResponse: (response: string) => void
}

export default function Alert({
  title,
  message,
  options,
  onClose,
  onResponse,
}: AlertProps) {
  const handleResponse = useCallback(
    (response: string) => {
      onResponse(response)
    },
    [onResponse],
  )

  return (
    <Popup onClose={onClose} title={title || undefined}>
      {message && <p className="mb-4 text-gray-300">{message}</p>}

      {options && options.length > 0 && (
        <div className="flex justify-center space-x-4">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleResponse(option.value)}
              className="pixel-font rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </Popup>
  )
}
