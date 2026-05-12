import React, { createContext, useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  clearPlayer,
  clearRemotePlayers,
  fetchPlayer,
  setPlayer,
} from "../redux/actions"
import { AppDispatch } from "../redux/store"
import {
  clearStoredApiKey,
  getStoredApiKey,
  setStoredApiKey,
} from "../lib/api-key"

interface AuthContextProps {
  isAuthenticated: boolean | undefined
  isLoading: boolean
  loadingMessage: string
  login: (apiKey: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState("Initializing...")
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const checkApiKey = async () => {
      setIsLoading(true)
      setLoadingMessage("Checking API key...")

      const apiKey = getStoredApiKey()
      if (!apiKey) {
        setIsAuthenticated(false)
        setIsLoading(false)
        setLoadingMessage("")
        return
      }

      try {
        setLoadingMessage("Loading account data...")
        await dispatch(fetchPlayer()).unwrap()
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Stored API key is invalid:", error)
        clearStoredApiKey()
        setIsAuthenticated(false)
        dispatch(setPlayer(null))
      } finally {
        setIsLoading(false)
        setLoadingMessage("")
      }
    }

    void checkApiKey()
  }, [dispatch])

  const login = async (apiKey: string) => {
    const trimmedApiKey = apiKey.trim()
    if (!trimmedApiKey) {
      throw new Error("API key is required")
    }

    setStoredApiKey(trimmedApiKey)
    setIsLoading(true)
    setLoadingMessage("Loading account data...")

    try {
      await dispatch(fetchPlayer()).unwrap()
      setIsAuthenticated(true)
    } catch (error) {
      clearStoredApiKey()
      setIsAuthenticated(false)
      dispatch(setPlayer(null))
      throw error
    } finally {
      setIsLoading(false)
      setLoadingMessage("")
    }
  }

  const logout = () => {
    clearStoredApiKey()
    setIsAuthenticated(false)
    setIsLoading(false)
    setLoadingMessage("")
    dispatch(clearPlayer())
    dispatch(clearRemotePlayers())
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        loadingMessage,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
