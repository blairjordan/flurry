import React from "react"
import Popup from "./Popup"
import Button from "./Button"
import { RootState } from "../redux/store"
import { useSelector } from "react-redux"

interface WalletFormProps {
  onClose: () => void
  connectWallet: () => void
}

const WalletForm: React.FC<WalletFormProps> = ({ onClose, connectWallet }) => {
  const wallet = useSelector((state: RootState) => state.app.wallet)

  return (
    <Popup onClose={onClose} title="Connect Wallet">
      {wallet.connected ? (
        <p className="mb-4 text-green-400">
          Connected Wallet: {wallet.address}
        </p>
      ) : (
        <p className="mb-4 text-gray-300">
          To use P2P transactions for donations, connect your Web3 wallet.
        </p>
      )}

      {wallet.error && <p className="mb-4 text-red-400">{wallet.error}</p>}

      <div className="flex justify-end">
        {!wallet.connected && (
          <Button
            onClick={connectWallet}
            color="blue"
            disabled={!!wallet.error}
          >
            Connect Wallet
          </Button>
        )}
        <Button onClick={onClose} color="red">
          Close
        </Button>
      </div>
    </Popup>
  )
}

export default WalletForm
