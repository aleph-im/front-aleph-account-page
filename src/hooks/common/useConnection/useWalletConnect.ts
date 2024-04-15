import { Dispatch, useCallback, useEffect, useRef, useState } from 'react'
import UniversalProvider from '@walletconnect/universal-provider'
import { WalletConnectModal } from '@walletconnect/modal'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import { chainToId, getAccountInfo, idToChain } from './utils'
import {
  ConnectionAction,
  ConnectionActionType,
  ConnectionState,
} from '@/store/connection'

export type WalletConnectProvider = {
  connect: (network: Chain) => Promise<UniversalProvider | undefined>
  switchNetwork: (network: Chain) => Promise<UniversalProvider>
  disconnect: () => Promise<void>
}

export const useWalletConnect = (
  state: ConnectionState,
  dispatch: Dispatch<ConnectionAction>,
): WalletConnectProvider => {
  const [universalProvider, setUniversalProvider] =
    useState<UniversalProvider>()
  const [web3Modal, setWeb3Modal] = useState<WalletConnectModal>()

  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
  }, [state])

  const createClient = useCallback(async () => {
    try {
      const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!
      const provider = await UniversalProvider.init({
        projectId,
        metadata: {
          name: 'Aleph.im',
          description: 'Aleph.im: Web3 cloud solution',
          url: 'https://aleph.im/',
          icons: [],
        },
      })
      const modal = new WalletConnectModal({ projectId })

      setWeb3Modal(modal)
      setUniversalProvider(provider)

      return { provider, modal }
    } catch (err) {
      throw err
    }
  }, [])

  const disconnect = useCallback(async () => {
    if (!universalProvider) return

    await universalProvider.disconnect()
  }, [universalProvider])

  const sessionEventListener = useCallback(
    async (event: any) => {
      const network = stateRef.current.network
      if (!network) return
      if (!universalProvider?.session) return

      const supportedChains = ['1']
      const namespaces = event.params.namespaces

      const availableChains = namespaces.eip155.chains.map(
        (chain: string) => chain.split(':')[1],
      )
      const currentChainId = chainToId(network).toString()
      const networkId = Number(
        availableChains.find(
          (chainId: string) =>
            chainId !== currentChainId && supportedChains.includes(chainId),
        ),
      )

      if (networkId) {
        const newNetwork = idToChain(networkId)
        const { account, balance } = await getAccountInfo(
          network,
          universalProvider,
        )
        dispatch({
          type: ConnectionActionType.SWITCH_NETWORK,
          payload: { network: newNetwork, account, balance },
        })
      } else {
        // notify user that the chain is not supported
      }
    },
    [universalProvider, dispatch],
  )

  const addListeners = useCallback(
    (provider: UniversalProvider) => {
      provider.on('display_uri', (uri: string) => web3Modal?.openModal({ uri }))
      provider.on('session_update', sessionEventListener)
      provider.on('session_delete', async () => await disconnect())
    },
    [web3Modal, disconnect],
  )

  const removeListeners = useCallback((provider: UniversalProvider) => {
    provider.off('display_uri', (uri: string) => web3Modal?.openModal({ uri }))
    provider.off('session_update', sessionEventListener)
    provider.off('session_delete', async () => await disconnect())
  }, [])

  const switchNetwork = useCallback(
    async (network: Chain) => {
      if (!universalProvider || !universalProvider.session)
        throw new Error('Provider or session not initialized')

      return universalProvider
    },
    [universalProvider],
  )

  const connect = useCallback(
    async (network: Chain) => {
      const { provider, modal } = await createClient()
      if (
        provider.session &&
        provider.session.expiry > Math.floor(Date.now() / 1000)
      ) {
        return provider
      }

      // note: defined a custom timeout for the wallet connect modal
      return new Promise<UniversalProvider | undefined>((resolve, reject) => {
        const timeoutDuration = 2000
        const timeout = setTimeout(() => {
          modal.closeModal()
          removeListeners(provider)
          reject(new Error('Timeout waiting for user to scan QR code'))
        }, timeoutDuration)

        const chainId = chainToId(network).toString()
        const eip155Methods = [
          'eth_sendTransaction',
          'eth_signTransaction',
          'eth_sign',
          'personal_sign',
          'eth_signTypedData',
          'wallet_addEthereumChain',
          'wallet_switchEthereumChain',
        ]
        const eip155Events = ['chainChanged', 'accountsChanged']
        provider
          .connect({
            namespaces: {
              eip155: {
                methods: eip155Methods,
                chains: [`eip155:${chainId}`],
                events: eip155Events,
              },
            },
          })
          .then(() => {
            clearTimeout(timeout)
            modal.closeModal()
            resolve(provider)
          })
          .catch((error) => {
            clearTimeout(timeout)
            modal.closeModal()
            removeListeners(provider)
            reject(error)
          })
      })
    },
    [createClient, removeListeners],
  )

  useEffect(() => {
    if (web3Modal && universalProvider) {
      addListeners(universalProvider)
      return () => {
        removeListeners(universalProvider)
      }
    }
  }, [web3Modal, universalProvider])

  return {
    connect,
    switchNetwork,
    disconnect,
  }
}
