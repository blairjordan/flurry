import React, { useState } from "react"
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa"
import Button from "./Button"
import Field from "./Field"
import Popup from "./Popup"

interface SettingsFormProps {
  onClose: () => void
  onSubmit: (meta: {
    fullName: string
    company: string
    role: string
    characterIndex: number
  }) => void
  initialPlayerMeta: {
    fullName: string
    company: string
    role: string
    characterIndex: number
  }
}

// TODO: More character customisation.
const CHARACTER_SPRITES = [
  { name: "Character 1", index: 0 },
  { name: "Character 2", index: 1 },
  { name: "Character 3", index: 2 },
  { name: "Character 4", index: 3 },
  { name: "Character 5", index: 4 },
  { name: "Character 6", index: 5 },
]

const SettingsForm: React.FC<SettingsFormProps> = ({
  onClose,
  onSubmit,
  initialPlayerMeta,
}) => {
  const [formData, setFormData] = useState({
    fullName: initialPlayerMeta.fullName || "",
    company: initialPlayerMeta.company || "",
    role: initialPlayerMeta.role || "",
    characterIndex: initialPlayerMeta.characterIndex || 0,
  })

  const [errors, setErrors] = useState<{
    fullName?: string
    company?: string
    role?: string
  }>({})

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: e.target.value }))
    }

  const validate = () => {
    const errors: {
      fullName?: string
      company?: string
      role?: string
    } = {}
    if (formData.fullName.length < 3 || formData.fullName.length > 30) {
      errors.fullName = "Full Name must be between 3 and 30 characters"
    }
    if (formData.company.length < 3 || formData.company.length > 30) {
      errors.company = "Company must be between 3 and 30 characters"
    }
    if (formData.role.length < 3 || formData.role.length > 30) {
      errors.role = "Role must be between 3 and 30 characters"
    }
    return errors
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      onSubmit({
        fullName: formData.fullName.trim(),
        role: formData.role.trim(),
        company: formData.company.trim(),
        characterIndex: formData.characterIndex,
      })
      onClose()
    }
  }

  const handleCharacterChange = (direction: "prev" | "next") => {
    setFormData((prevData) => ({
      ...prevData,
      characterIndex:
        direction === "prev"
          ? (prevData.characterIndex + CHARACTER_SPRITES.length - 1) %
            CHARACTER_SPRITES.length
          : (prevData.characterIndex + 1) % CHARACTER_SPRITES.length,
    }))
  }

  return (
    <Popup onClose={onClose} title="Settings">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300">Character</label>
          <div className="flex items-center justify-center gap-4">
            <button type="button" onClick={() => handleCharacterChange("prev")}>
              <FaArrowCircleLeft size={20} />
            </button>
            <div
              className="h-20 w-14"
              style={{
                backgroundImage: "url(/assets/characters.png)",
                backgroundPosition: `-${52}px ${-formData.characterIndex * 288}px`,
                backgroundSize: "auto auto",
              }}
            />
            <button type="button" onClick={() => handleCharacterChange("next")}>
              <FaArrowCircleRight size={20} />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Name</label>
          <Field
            value={formData.fullName}
            onChange={handleInputChange("fullName")}
            className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
            placeholder="Your Full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-red-500">{errors.fullName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Company</label>
          <Field
            value={formData.company}
            onChange={handleInputChange("company")}
            className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
            placeholder="Your Company"
          />
          {errors.company && (
            <p className="mt-1 text-red-500">{errors.company}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Role</label>
          <Field
            value={formData.role}
            onChange={handleInputChange("role")}
            className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
            placeholder="Your role"
          />
          {errors.role && <p className="mt-1 text-red-500">{errors.role}</p>}
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

export default SettingsForm
