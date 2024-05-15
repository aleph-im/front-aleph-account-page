import EventEmitter from 'events'
import { Blockchain as BlockchainId } from '@aleph-sdk/core'
import { Account } from '@aleph-sdk/account'
import {
  getAccountFromProvider as getETHAccount,
  ETHAccount,
} from '@aleph-sdk/ethereum'
import {
  getAccountFromProvider as getSOLAccount,
  SOLAccount,
} from '@aleph-sdk/solana'
import {
  getAccountFromProvider as getAVAXAccount,
  AvalancheAccount,
} from '@aleph-sdk/avalanche'
import { createFromAvalancheAccount } from '@aleph-sdk/superfluid'
import Err from '../../helpers/errors'
import { getERC20Balance, getSOLBalance } from '@/helpers/utils'
import UniversalProvider from '@walletconnect/universal-provider/dist/types/UniversalProvider'
import { MetaMaskInpageProvider } from '@metamask/providers'

export { BlockchainId }

// ------------------------

export enum ProviderId {
  Metamask = 'metamask',
  WalletConnect = 'wallet-connect',
}

export type Provider = {
  id: ProviderId
  name: string
}

export const providers: Record<ProviderId, Provider> = {
  [ProviderId.Metamask]: {
    id: ProviderId.Metamask,
    name: 'Metamask',
  },
  [ProviderId.WalletConnect]: {
    id: ProviderId.WalletConnect,
    name: 'WalletConnect',
  },
}

// ------------------------

export type Blockchain = {
  id: BlockchainId
  name: string
  chainId: number
  eip155: boolean
}

export const blockchains: Record<BlockchainId, Blockchain> = {
  [BlockchainId.ETH]: {
    id: BlockchainId.ETH,
    name: 'Ethereum',
    chainId: 1,
    eip155: true,
  },
  [BlockchainId.AVAX]: {
    id: BlockchainId.AVAX,
    name: 'Avalanche',
    chainId: 43114,
    eip155: true,
  },
  [BlockchainId.SOL]: {
    id: BlockchainId.SOL,
    name: 'Solana',
    chainId: 900,
    eip155: false,
  },
} as Record<BlockchainId, Blockchain>

export const networks: Record<number, Blockchain> = {
  1: blockchains.ETH,
  43114: blockchains.AVAX,
  900: blockchains.SOL,
}

// ------------------------

export abstract class BaseConnectionProviderManager {
  public events: EventEmitter = new EventEmitter()

  abstract isSupported(): Promise<boolean>
  abstract connect(blockchainId: BlockchainId): Promise<void>
  abstract disconnect(): Promise<void>

  async getBalance(account: Account): Promise<number> {
    if (account instanceof AvalancheAccount) {
      const superfluidAccount = createFromAvalancheAccount(account)
      try {
        const balance = await superfluidAccount.getALEPHBalance()
        return balance.toNumber()
      } catch {
        return 0
      }
    }
    if (account instanceof ETHAccount) {
      return getERC20Balance(account.address)
    }
    if (account instanceof SOLAccount) {
      return getSOLBalance(account.address)
    }

    throw Err.ChainNotYetSupported
  }

  protected async getAccount(
    provider: UniversalProvider | MetaMaskInpageProvider,
  ): Promise<Account> {
    const blockchainId = await this.getBlockchain(provider)

    switch (blockchainId) {
      case BlockchainId.ETH:
        return getETHAccount(provider as any)

      case BlockchainId.AVAX:
        return getAVAXAccount(provider as any)

      case BlockchainId.SOL:
        return getSOLAccount(provider as any)

      default:
        throw Err.ChainNotYetSupported
    }
  }

  protected async getBlockchain(
    provider: UniversalProvider | MetaMaskInpageProvider,
  ): Promise<BlockchainId> {
    let chainId = (await provider.request?.({
      method: 'eth_chainId',
    })) as number | string

    chainId = typeof chainId === 'string' ? parseInt(chainId, 16) : chainId

    const blockchain = networks[chainId]
    if (!blockchain) throw new Error('')

    return blockchain.id
  }

  protected async switchBlockchain(
    blockchainId: BlockchainId,
    provider: UniversalProvider | MetaMaskInpageProvider,
  ): Promise<void> {
    const blockchain = blockchains[blockchainId]
    if (!blockchain) throw new Error('')

    const chainId = `0x${blockchain.chainId.toString(16)}`

    await provider.request?.({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    })
  }
}
