import { web3Connect, getAccountBalance } from '@/helpers/aleph'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import { Providers } from './useConnection'

// note: web3Connect makes the initial connection to the provider
export async function getAccountInfo(chain: Chain, provider: Providers) {
  const account = await web3Connect(chain, provider)
  const balance = await getAccountBalance(account)
  return { account, balance }
}

export enum ProviderType {
  Metamask = 'Metamask',
  WalletConnect = 'WalletConnect',
}

export function chainToId(chain: Chain): number {
  switch (chain) {
    case Chain.ETH:
      return 1
    case Chain.AVAX:
      return 43114
    default:
      throw new Error('Chain not supported')
  }
}

export function idToChain(chain: number): Chain {
  switch (chain) {
    case 1:
      return Chain.ETH
    case 43114:
      return Chain.AVAX
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

export function chainNameToEnum(chainName?: string): Chain {
  switch (chainName) {
    case 'Ethereum':
      return Chain.ETH
    case 'Avalanche':
      return Chain.AVAX
    case 'Solana':
      return Chain.SOL
    default:
      return Chain.ETH
  }
}

export function chainEnumToName(chain: Chain): string {
  switch (chain) {
    case Chain.ETH:
      return 'Ethereum'
    case Chain.AVAX:
      return 'Avalanche'
    case Chain.SOL:
      return 'Solana'
    default:
      return 'Ethereum'
  }
}
