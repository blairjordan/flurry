import { FormEvent, useState } from "react"
import { useAuth } from "./context/AuthContext"

const Authentication = () => {
  const { login } = useAuth()
  const [apiKey, setApiKey] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login(apiKey)
    } catch (_err) {
      setError("Invalid API key. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="pixel-font w-96 rounded-lg border-4 border-black bg-gray-800 p-6 shadow-lg">
        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          Welcome to Flurry
        </h2>
        <p className="mb-6 text-center text-sm text-gray-300">
          Enter your API key to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="API key"
            className="w-full rounded border-2 border-black bg-gray-700 px-3 py-3 text-white outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
            required
          />

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded border-4 border-black bg-blue-500 p-3 text-white shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign in with API key"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Authentication
