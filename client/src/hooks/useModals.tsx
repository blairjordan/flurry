import { useState } from "react"

export const useModals = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isInventoryOpen, setIsInventoryOpen] = useState(false)
  const [isAIPromptOpen, setIsAIPromptOpen] = useState(false)
  const [isPlayerInfoOpen, setIsPlayerInfoOpen] = useState(false)
  const [isStreamSettingsOpen, setIsStreamSettingsOpen] = useState(false)
  const [isWalletOpen, setIsWalletOpen] = useState(false)

  const openSettings = () => setIsSettingsOpen(true)
  const closeSettings = () => setIsSettingsOpen(false)

  const openInventory = () => setIsInventoryOpen(true)
  const closeInventory = () => setIsInventoryOpen(false)

  const openAIPrompt = () => setIsAIPromptOpen(true)
  const closeAIPrompt = () => setIsAIPromptOpen(false)

  const openPlayerInfo = () => setIsPlayerInfoOpen(true)
  const closePlayerInfo = () => setIsPlayerInfoOpen(false)

  const openStreamSettings = () => setIsStreamSettingsOpen(true)
  const closeStreamSettings = () => setIsStreamSettingsOpen(false)

  const openWallet = () => setIsWalletOpen(true)
  const closeWallet = () => setIsWalletOpen(false)

  return {
    isSettingsOpen,
    openSettings,
    closeSettings,
    isInventoryOpen,
    openInventory,
    closeInventory,
    isAIPromptOpen,
    openAIPrompt,
    closeAIPrompt,
    isPlayerInfoOpen,
    openPlayerInfo,
    closePlayerInfo,
    isStreamSettingsOpen,
    openStreamSettings,
    closeStreamSettings,
    isWalletOpen,
    openWallet,
    closeWallet,
  }
}
