import { useState } from "react"

const useClipboard = (timeout = 3_000) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
    })
  }

  return { copied, copyToClipboard }
}

export default useClipboard
