import React, { forwardRef } from "react"
import CopyButton from "./CopyButton"

interface FieldProps {
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  placeholder?: string
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  className?: string
  type?: "input" | "textarea"
  disabled?: boolean
  showCopyButton?: boolean
}

const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
  (
    {
      value,
      onChange,
      placeholder,
      onKeyDown,
      className,
      type = "input",
      disabled,
      showCopyButton = false,
    },
    ref,
  ) => {
    const Element = type === "textarea" ? "textarea" : "input"

    return (
      <div className="relative flex w-full items-center">
        <Element
          ref={ref as React.Ref<HTMLInputElement & HTMLTextAreaElement>}
          value={value}
          onChange={onChange}
          onKeyDown={(event) => {
            event.stopPropagation()
            if (onKeyDown) onKeyDown(event)
          }}
          className={`${className} ${disabled ? "!important text-gray-500" : ""}`}
          placeholder={placeholder}
          disabled={disabled}
        />
        {showCopyButton && <CopyButton text={value} />}
      </div>
    )
  },
)

export default Field
