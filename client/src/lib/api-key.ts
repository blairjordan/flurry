const API_KEY_STORAGE_KEY = "flurry.apiKey"

export const getStoredApiKey = (): string | null => {
  const key = localStorage.getItem(API_KEY_STORAGE_KEY)
  if (!key) {
    return null
  }

  const trimmed = key.trim()
  return trimmed.length > 0 ? trimmed : null
}

export const setStoredApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey.trim())
}

export const clearStoredApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY)
}
