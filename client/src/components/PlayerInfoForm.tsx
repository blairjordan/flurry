import { ethers } from "ethers"
import React, { useState } from "react"
import { Player } from "../types/generated"
import Button from "./Button"
import Popup from "./Popup"
import StreamViewer from "./StreamViewer"

interface PlayerInfoFormProps {
  onClose: () => void
  onDirectMessageClick: () => void
  player: Player
}

const PlayerInfoForm: React.FC<PlayerInfoFormProps> = ({
  onClose,
  onDirectMessageClick,
  player,
}) => {
  const [amount, setAmount] = useState<string>("")
  const [isSending, setIsSending] = useState<boolean>(false)
  const [transactionError, setTransactionError] = useState<string | null>(null)

  const handleDonate = async () => {
    if (!amount) {
      setTransactionError("Please enter a valid amount.")
      return
    }

    try {
      setIsSending(true)
      setTransactionError(null)

      if (!window.ethereum) {
        setTransactionError("MetaMask is not available.")
        return
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      const recipientAddress = player.wallets?.eth
      if (!recipientAddress) {
        setTransactionError("Recipient address is not set.")
        return
      }

      const parsedAmount = ethers.parseEther(amount)

      const transaction = await signer.sendTransaction({
        to: recipientAddress,
        value: parsedAmount,
      })

      console.info("Transaction sent:", transaction)
      alert(`Transaction sent! Hash: ${transaction.hash}`)
    } catch (error) {
      console.error("Transaction failed:", error)
      setTransactionError("Transaction failed. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  const InfoItem = ({ label, value }: { label: string; value: string }) =>
    value && (
      <p className="mb-2 text-gray-300">
        <span className="font-semibold">{label}:</span> {value}
      </p>
    )

  return (
    <Popup onClose={onClose} title={player.meta?.fullName || player.username}>
      {/* TODO: Add a front profile of the player. */}

      {/* FIXME: Need to differentiate "agent controlled" from "online" */}
      {player.isOnline ? (
        <p className="mb-4 text-green-400">Online</p>
      ) : (
        <p className="mb-4 text-red-400">Offline</p>
      )}

      {player.stream?.status === "live" && player.stream.providerId && (
        <div className="mb-4">
          <StreamViewer uid={player.stream.providerId} />
        </div>
      )}

      <div className="mb-4">
        {InfoItem({ label: "Role", value: player.meta?.role })}
        {InfoItem({ label: "Company", value: player.meta?.company })}
      </div>

      {player.wallets?.eth && (
        <div className="mb-8">
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount (GLMR)"
              className="w-64 rounded border border-gray-600 bg-gray-800 p-2 text-white"
              disabled={isSending}
            />
            <Button onClick={handleDonate} color="blue" disabled={isSending}>
              {isSending ? "Sending..." : "Donate"}
            </Button>
          </div>
          {transactionError && (
            <p className="mt-2 text-red-400">{transactionError}</p>
          )}
        </div>
      )}

      <div className="my-8 flex justify-center">
        <Button onClick={onDirectMessageClick} color="blue">
          Send Direct Message
        </Button>
      </div>

      <div className="flex justify-end">
        <Button onClick={onClose} color="red">
          Close
        </Button>
      </div>
    </Popup>
  )
}

export default PlayerInfoForm
