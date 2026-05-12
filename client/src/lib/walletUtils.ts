interface MoonbeamParams {
  rpcUrl: string
  chainId: number
}

export const switchToMoonbeam = async ({ rpcUrl, chainId }: MoonbeamParams) => {
  const moonbeamNetwork = {
    chainId: `0x${chainId.toString(16)}`,
    chainName: "Moonbeam",
    nativeCurrency: {
      name: "GLMR",
      symbol: "GLMR",
      decimals: 18,
    },
    rpcUrls: [rpcUrl],
    blockExplorerUrls: ["https://moonscan.io/"],
  }

  try {
    // Request to switch network
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: moonbeamNetwork.chainId }],
    })
  } catch (switchError) {
    // If the network is not added, add it
    if ((switchError as { code: number }).code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [moonbeamNetwork],
        })
      } catch (addError) {
        console.error("Failed to add Moonbeam network:", addError)
        throw new Error("Could not add Moonbeam network.")
      }
    } else {
      console.error("Failed to switch to Moonbeam network:", switchError)
      throw new Error("Could not switch to Moonbeam network.")
    }
  }
}
