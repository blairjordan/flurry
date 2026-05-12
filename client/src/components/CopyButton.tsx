import { useState } from "react"
import { FaCopy, FaCheck } from "react-icons/fa"

interface CopyButtonProps {
  text: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="ml-2 flex items-center text-blue-500 hover:text-blue-300"
    >
      {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
    </button>
  )
}

export default CopyButton
