import { useCallback, useEffect, useState } from 'react'
import UniversalProvider from '@walletconnect/universal-provider'
import { WalletConnectModal } from '@walletconnect/modal'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import Provider from '@walletconnect/universal-provider'
import { SignClientTypes } from "@walletconnect/types"
import { chainToId } from './useConnection'

export type WalletConnectReturn = {
  connect: (chain: Chain) => Promise<UniversalProvider>
  switchNetwork: (chain: Chain) => Promise<UniversalProvider>
  disconnect: () => Promise<void>
}

export type WalletConnectProps = {
  projectId: string
  metadata: SignClientTypes.Metadata
}

export const useWalletConnect = ({ projectId, metadata }: WalletConnectProps) => {
  const [universalProvider, setUniversalProvider] = useState<UniversalProvider>()
  const [web3Modal, setWeb3Modal] = useState<WalletConnectModal>()

  const disconnect = useCallback(async () => {
    if (!universalProvider) throw new Error('wallet connect is not initialized')

    await universalProvider.disconnect()
  }, [universalProvider])

  const displayUriListener = useCallback(
    async (uri: string) => {
      web3Modal?.openModal({ uri })
    },
    [web3Modal],
  )

  const sessionDeleteListener = useCallback(async () => {
    await disconnect()
  }, [disconnect])

  /*const sessionEventListener = useCallback(async (event: any) => {
    console.log("EVENT", "session_update", event)

    if (!universalProvider?.session) return        
    if (event.params?.event?.name === 'chainChanged') {
      await updateState(idToChain(event.params?.event?.data), universalProvider)
    }
  }, [updateState, universalProvider])*/

  const subscribeToEvents = useCallback(
    (provider: Provider) => {
      provider.on('display_uri', displayUriListener)
      //provider.on("session_update", sessionEventListener)
      provider.on('session_delete', sessionDeleteListener)
    },
    [displayUriListener, sessionDeleteListener],
  )

  const removeListeners = useCallback(() => {
    if (!universalProvider) throw new Error('wallet connect is not initialized')

    universalProvider.off('display_uri', displayUriListener)
    //universalProvider.off('session_update', sessionEventListener)
    universalProvider.off('session_delete', sessionDeleteListener)
  },
  [displayUriListener, sessionDeleteListener])

  const createClient = useCallback(async () => {
    try {
      const provider = await UniversalProvider.init({ projectId, metadata })
      const modal = new WalletConnectModal({ projectId })

      setWeb3Modal(modal)
      setUniversalProvider(provider)

      return { provider, modal }
    } catch (err) {
      throw err
    }
  }, [subscribeToEvents, setUniversalProvider, setWeb3Modal])

  const switchNetwork = useCallback(
    async (chain: Chain) => {
      if (!universalProvider) throw new Error('ethereumProvider is not initialized')
      if (!universalProvider.session) throw new Error('session is not initialized')
      
      await universalProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainToId(chain).toString(16)}` }],
      })

      return universalProvider
    },
    [universalProvider],
  )

  const connect = useCallback(
    async (chain: Chain): Promise<UniversalProvider> => {
      const { provider, modal } = await createClient()

      // auto-login
      if (provider.session && provider.session.expiry > Math.floor(Date.now() / 1000)) {
        return provider
      }

      const methods = [
        'eth_sendTransaction',
        'eth_signTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
        'wallet_addEthereumChain',
        'wallet_switchEthereumChain',
      ]
      const events = ['chainChanged', 'accountsChanged']
      await provider.connect({
        namespaces: {
          eip155: {
            methods,
            chains: [`eip155:${chainToId(chain)}`],
            events,
          },
        },
      })

      modal.closeModal()

      return provider
    },
    [createClient]
  )

  useEffect(() => {
    if (web3Modal && universalProvider) {
      subscribeToEvents(universalProvider)
      return () => {
        removeListeners()
      }
    }
  }, [web3Modal, universalProvider, subscribeToEvents, removeListeners])

  return {
    connect,
    switchNetwork,
    disconnect,
  }
}