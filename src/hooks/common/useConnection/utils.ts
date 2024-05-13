import { web3Connect, getAccountBalance } from '@/helpers/aleph'
import { Blockchain } from '@aleph-sdk/core'
import { Providers } from './useConnection'

// note: web3Connect makes the initial connection to the provider
export async function getAccountInfo(chain: Blockchain, provider: Providers) {
  const account = await web3Connect(chain, provider)
  const balance = await getAccountBalance(account)
  return { account, balance }
}

export enum ProviderType {
  Metamask = 'Metamask',
  WalletConnect = 'WalletConnect',
}

export function chainToId(chain: Blockchain): number {
  switch (chain) {
    case Blockchain.ETH:
      return 1
    case Blockchain.AVAX:
      return 43114
    default:
      throw new Error('Chain not supported')
  }
}

export function idToChain(chain: number): Blockchain {
  switch (chain) {
    case 1:
      return Blockchain.ETH
    case 43114:
      return Blockchain.AVAX
    default:
      throw new Error('Chain not supported')
  }
}

export function walletToEnum(walletName?: string): ProviderType {
  switch (walletName) {
    case 'Metamask':
      return ProviderType.Metamask
    case 'Wallet Connect':
      return ProviderType.WalletConnect
    default:
      return ProviderType.Metamask
  }
}

export function chainNameToEnum(chainName?: string): Blockchain {
  switch (chainName) {
    case 'Ethereum':
      return Blockchain.ETH
    case 'Avalanche':
      return Blockchain.AVAX
    case 'Solana':
      return Blockchain.SOL
    default:
      return Blockchain.ETH
  }
}

export function chainEnumToName(chain: Blockchain): string {
  switch (chain) {
    case Blockchain.ETH:
      return 'Ethereum'
    case Blockchain.AVAX:
      return 'Avalanche'
    case Blockchain.SOL:
      return 'Solana'
    default:
      return 'Ethereum'
  }
}
