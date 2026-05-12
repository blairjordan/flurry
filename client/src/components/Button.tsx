interface ButtonProps {
  onClick?: () => void
  color: "blue" | "red" | "gray"
  children: React.ReactNode
  type?: "button" | "submit"
  disabled?: boolean // Add disabled prop
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  color,
  children,
  type = "button",
  disabled = false, // Default to false
}) => {
  const colorClass = (() => {
    switch (color) {
      case "blue":
        return "bg-blue-600"
      case "red":
        return "bg-red-600"
      case "gray":
        return "bg-gray-600"
      default:
        return ""
    }
  })()

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${colorClass} ${
        disabled ? "cursor-not-allowed opacity-50" : "hover:scale-110"
      } ml-4 rounded px-4 py-2 font-pixel text-white shadow-lg transition-transform`}
    >
      {children}
    </button>
  )
}

export default Button
