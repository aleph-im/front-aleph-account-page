import {
    useCallback,
    useState,
} from 'react'
import { chainToId } from '@/hooks/common/useConnect'
import UniversalProvider from '@walletconnect/universal-provider'
import { WalletConnectModal } from '@walletconnect/modal'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import Provider from '@walletconnect/universal-provider'
  
export type WalletConnectReturn = {
    createClient: () => Promise<UniversalProvider | undefined>
    connect: (chain: Chain) => Promise<UniversalProvider>
    switchNetwork: (chain: Chain) => Promise<void>
    disconnect: () => Promise<void>
    removeListeners: () => void
}
  
export function useWalletConnect(): WalletConnectReturn {
    const [universalProvider, setUniversalProvider] = useState<UniversalProvider>()
    const [web3Modal, setWeb3Modal] = useState<WalletConnectModal>()
  
    const createClient = useCallback(async () => {
      try {
        if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_ID) return
        const provider = await UniversalProvider.init({
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
          metadata: {
            name: 'Aleph.im',
            description: 'Aleph.im: Web3 cloud solution',
            url: 'https://aleph.im/',
            icons: [],
          },
        })
  
        const web3Modal = new WalletConnectModal({
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
          //mobileWallets: []
        })
  
        await subscribeToEvents(provider)
        setUniversalProvider(provider)
        setWeb3Modal(web3Modal)

        return provider
      } catch (err) {
        throw err
      }
    }, [])

    const switchNetwork = useCallback(
      async (chain: Chain) => {
        if (!universalProvider) throw new Error('ethereumProvider is not initialized')
        if (!universalProvider.session) throw new Error('session is not initialized')
        
        await universalProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainToId(chain).toString(16)}` }],
        })
      },
      [universalProvider],
    )
  
    const disconnect = useCallback(async () => {
      if (!universalProvider) throw new Error('ethereumProvider is not initialized')
      
      await universalProvider.disconnect()
    }, [universalProvider])
  
    const connect = useCallback(
      async (chain: Chain): Promise<UniversalProvider> => {
        const provider = await createClient()
        if (!provider) throw new Error('wallet connect is not initialized')

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
  
        web3Modal?.closeModal()

        return provider
      },
      [universalProvider, createClient]
    )
    
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
  
      if (!ethereumProvider?.session) return        
      if (event.params?.event?.name === 'chainChanged') {
        await onSessionConnect(idToChain(event.params?.event?.data), ethereumProvider)
      }
    }, [onSessionConnect, ethereumProvider])*/
  
    const subscribeToEvents = useCallback(
      async (provider: Provider) => {
        if (typeof provider === 'undefined') {
          throw new Error('WalletConnect is not initialized')
        }
        provider.on('display_uri', displayUriListener)
        //provider.on("session_update", sessionEventListener)
        provider.on('session_delete', sessionDeleteListener)
      },
      [displayUriListener, sessionDeleteListener],
    )

    const removeListeners = useCallback(() => {
      if (!universalProvider) throw new Error('wallet connect is not initialized')

      universalProvider.off('display_uri', displayUriListener)
      universalProvider.off('session_update', displayUriListener)
      universalProvider.off('session_delete', sessionDeleteListener)
    },
    [displayUriListener, sessionDeleteListener])

    return {
      createClient,
      connect,
      switchNetwork,
      disconnect,
      removeListeners
    }
}