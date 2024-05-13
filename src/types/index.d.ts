export {}

declare global {
  interface Window {
    ethereum: import('ethers').providers.Provider
    helia: import('@helia/interface').Helia | undefined
  }
}
