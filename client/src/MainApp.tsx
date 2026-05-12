import { useEffect } from "react"
import SpectatorApp from "./SpectatorApp"

const isMobile = () =>
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

const MainApp = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get("redirect")
    if (!redirect) {
      return
    }

    if (redirect.startsWith("/")) {
      window.location.replace(redirect)
      return
    }

    try {
      const url = new URL(redirect)
      if (url.protocol === "http:" || url.protocol === "https:") {
        window.location.replace(url.toString())
      }
    } catch {
      // Ignore malformed redirect params.
    }
  }, [])

  if (isMobile()) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <p className="text-center text-lg leading-relaxed text-gray-700">
          This platform is not yet available on mobile devices.
        </p>
        <p className="text-center text-lg leading-relaxed text-gray-700">
          Please access it from a desktop or laptop for the best experience.
        </p>
      </div>
    )
  }

  return <SpectatorApp />
}

export default MainApp
