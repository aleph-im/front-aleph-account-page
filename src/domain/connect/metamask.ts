import {
  BaseConnectionProviderManager,
  BlockchainId,
  ProviderId,
  networks,
} from './base'
import { MetaMaskInpageProvider } from '@metamask/providers'

export class MetamaskConnectionProviderManager extends BaseConnectionProviderManager {
  protected handleAccountChange = this.onAccount.bind(this)
  protected handleBlockchainChange = this.onBlockchain.bind(this)

  async isSupported(): Promise<boolean> {
    const provider = this.getProvider()
    return !!provider?.isMetaMask
  }

  async connect(blockchainId: BlockchainId): Promise<void> {
    const provider = this.getProvider()

    provider.on('accountsChanged', this.handleAccountChange)
    provider.on('chainChanged', this.handleBlockchainChange)

    await this.switchBlockchain(blockchainId, provider)
    await this.onAccount()
  }

  async disconnect(): Promise<void> {
    const provider = this.getProvider()

    provider.off('accountsChanged', this.handleAccountChange)
    provider.off('chainChanged', this.handleBlockchainChange)
  }

  protected async onAccount(): Promise<void> {
    const provider = this.getProvider()

    const blockchain = await this.getBlockchain(provider)
    const account = await this.getAccount(provider)
    const balance = await this.getBalance(account)

    this.events.emit('account', {
      provider: ProviderId.Metamask,
      blockchain,
      account,
      balance,
    })
  }

  protected async onBlockchain(hexChainId: unknown): Promise<void> {
    const chainId = parseInt(hexChainId as string, 16)

    const blockchain = networks[chainId]
    if (!blockchain) throw new Error('')

    this.events.emit('blockchain', {
      provider: ProviderId.Metamask,
      blockchain: blockchain.id,
    })
  }

  protected getProvider(): MetaMaskInpageProvider {
    const provider = window.ethereum as any as MetaMaskInpageProvider
    if (!provider) throw new Error('Metamask is not installed')
    return provider
  }
}
