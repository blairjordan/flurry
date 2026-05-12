import React, { ReactNode } from "react"

interface PopupProps {
  onClose: () => void
  title?: string
  children: ReactNode
}

const Popup: React.FC<PopupProps> = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 font-pixel">
      <div className="relative mx-4 w-full min-w-[640px] max-w-sm rounded-md border border-gray-500 bg-gray-800 p-6 text-white shadow-lg sm:mx-6 lg:mx-0">
        {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
        {children}
        <button onClick={onClose} className="absolute right-4 top-4 text-white">
          &times;
        </button>
      </div>
    </div>
  )
}

export default Popup
