import UniversalProvider from '@walletconnect/universal-provider'
import { WalletConnectModal } from '@walletconnect/modal'
import {
  BaseConnectionProviderManager,
  BlockchainId,
  ProviderId,
  blockchains,
} from './base'
import { Future, sleep } from '@/helpers/utils'

const chains = Object.values(blockchains)
  .filter((b) => b.eip155)
  .map((b) => `eip155:${b.chainId}`)

export class WalletConnectConnectionProviderManager extends BaseConnectionProviderManager {
  protected provider?: UniversalProvider
  protected modal?: WalletConnectModal
  protected closeModalFuture = new Future()
  protected connectionUri?: string

  protected handleAccountChange = this.onAccount.bind(this)
  protected handleDisconnect = this.disconnect.bind(this)
  protected handleSessionUpdate = this.onSessionUpdate.bind(this)
  protected handleDisplayUrl = this.onDisplayUrl.bind(this)
  protected handleModalState = this.onModalState.bind(this)

  async isSupported(): Promise<boolean> {
    const provider = this.getProvider()
    return !!provider?.isWalletConnect
  }

  async connect(blockchainId: BlockchainId): Promise<void> {
    await this.init()

    const provider = this.getProvider()

    provider.on('display_uri', this.handleDisplayUrl)
    provider.on('session_update', this.handleSessionUpdate)
    provider.on('session_delete', this.handleDisconnect)

    if (!provider.session) {
      try {
        const r = await Promise.race([
          this.closeModalFuture.promise,
          provider.connect({
            optionalNamespaces: {
              eip155: {
                methods: [
                  'eth_requestAccounts',
                  'eth_sendTransaction',
                  'eth_signTransaction',
                  'eth_sign',
                  'personal_sign',
                  'eth_signTypedData',
                  'wallet_addEthereumChain',
                  'wallet_switchEthereumChain',
                ],
                chains,
                events: ['chainChanged', 'accountsChanged'],
              },
            },
          }),
        ])

        console.log(r)
      } finally {
        this.modal?.closeModal()
      }
    }

    await this.switchBlockchain(blockchainId, provider)
    await this.onAccount()
  }

  async disconnect(): Promise<void> {
    const provider = this.getProvider()

    provider.session && (await provider.disconnect())

    provider.off('display_uri', this.handleDisplayUrl)
    provider.off('session_update', this.handleSessionUpdate)
    provider.off('session_delete', this.handleDisconnect)

    // this.provider = undefined
    // this.modal = undefined
  }

  protected async onAccount(): Promise<void> {
    const provider = this.getProvider()

    const blockchain = await this.getBlockchain(provider)
    const account = await this.getAccount(provider)
    const balance = await this.getBalance(account)

    this.events.emit('account', {
      provider: ProviderId.WalletConnect,
      blockchain,
      account,
      balance,
    })
  }

  protected async onSessionUpdate(event: any) {
    // TODO
    console.log('session_update')

    // @note: Let the current task execute to update the provider object before reading from it
    sleep(0)
      .then(async () => {
        const provider = this.getProvider()
        const blockchainId = await this.getBlockchain(provider)

        const blockchain = blockchains[blockchainId]
        if (!blockchain) throw new Error('')

        this.events.emit('blockchain', {
          provider: ProviderId.WalletConnect,
          blockchain: blockchainId,
        })
      })
      .catch(() => 'ignore')
  }

  protected async init(): Promise<void> {
    const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string

    if (!this.modal) {
      this.modal = new WalletConnectModal({ projectId, chains })
      this.modal.subscribeModal(this.handleModalState)
    }

    if (!this.provider) {
      this.provider = await UniversalProvider.init({
        projectId,
        metadata: {
          name: 'Aleph.im',
          description: 'Aleph.im: Web3 cloud solution',
          url: 'https://aleph.im',
          icons: [],
        },
      })
    }
  }

  protected onDisplayUrl(uri: string) {
    this.connectionUri = uri

    if (!this.modal) return
    this.modal.closeModal()
    this.modal.openModal({ uri })
  }

  protected async onModalState({ open }: { open: boolean }) {
    if (open) return

    const future = this.closeModalFuture
    this.closeModalFuture = new Future()
    future.reject(new Error('User cancelled the action'))
  }

  protected getProvider(): UniversalProvider {
    if (!this.provider) throw new Error('WalletConnect is not initialized')
    return this.provider
  }
}
