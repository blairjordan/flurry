import React, { useState } from "react"
import Popup from "./Popup"
import Button from "./Button"
import Field from "./Field"

interface AIPromptFormProps {
  onClose: () => void
  onSubmit: ({ aiPrompt }: { aiPrompt: string }) => void
  initialPrompt: string
}

const AIPromptForm: React.FC<AIPromptFormProps> = ({
  onClose,
  onSubmit,
  initialPrompt,
}) => {
  const [formData, setFormData] = useState({
    aiPrompt: initialPrompt || "",
  })

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: e.target.value }))
    }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit({
      aiPrompt: formData.aiPrompt.trim(),
    })
    onClose()
  }

  return (
    <Popup onClose={onClose} title="AI Prompt">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="mb-2 text-gray-300">
            Enter a prompt for your AI Agent to use when you're offline.
          </p>
          <Field
            value={formData.aiPrompt}
            onChange={handleInputChange("aiPrompt")}
            className="h-48 w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
            placeholder="Your AI Prompt"
            type="textarea"
          />
        </div>

        <div className="flex justify-end">
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

export default AIPromptForm
