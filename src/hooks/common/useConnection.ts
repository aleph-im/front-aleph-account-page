import { getAccountBalance, web3Connect } from '@/helpers/aleph'
import { ConnectionActionType, ProviderEnum } from '@/store/connection'
import { StoreAction } from '@/store/store'
import { useNotification } from '@aleph-front/core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import { Dispatch, useCallback, useEffect } from 'react'
import { useSessionStorage } from 'usehooks-ts'
import { useWalletConnect } from './useWalletConnect'

type NotificationCardVariant = 'error' | 'success' | 'warning'
export function chainToId(chain: Chain): number {
  switch (chain) {
    case Chain.ETH:
      return 1
    case Chain.AVAX:
      return 43114
    default:
      return 1
  }
}

export function idToChain(chain: number): Chain {
  switch (chain) {
    case 1:
      return Chain.ETH
    case 43114:
      return Chain.AVAX
    default:
      return Chain.ETH
  }
}

export const useConnection = (dispatch: Dispatch<StoreAction>) => {
    const walletConnect = useWalletConnect({
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
        metadata: {
          name: 'Aleph.im',
          description: 'Aleph.im: Web3 cloud solution',
          url: 'https://aleph.im/',
          icons: [],
        }
    })
    
      const metamaskProvider = useCallback(() => {
        ;(window.ethereum as any)?.on('accountsChanged', function () {
          connect()
        })
    
        return window.ethereum
      }, [])
    
      const noti = useNotification()
    
      const [selectedNetwork, setSelectedNetwork] = useSessionStorage<Chain>(
        'selectedNetwork',
        Chain.ETH,
      )
      const [currentProvider, setCurrentProvider] = useSessionStorage<ProviderEnum>(
        'currentProvider',
        ProviderEnum.Disconnected,
      )
    
      const onNoti = useCallback(
        (error: string, variant: NotificationCardVariant) => {
          noti &&
            noti.add({
              variant,
              title: variant.charAt(0).toUpperCase() + variant.slice(1),
              text: error,
            })
        },
        [noti],
      )
    
      const getBalance = useCallback(
        async (account: Account) => {
          const balance = await getAccountBalance(account)
          dispatch({
            type: ConnectionActionType.SET_BALANCE,
            payload: { balance },
          })
        },
        [dispatch],
      )
    
      const connect = useCallback(
        async (chain?: Chain, providerType: ProviderEnum = ProviderEnum.Metamask) => {
          if (!chain) return
          
          try {
            const provider = providerType === ProviderEnum.Metamask ? metamaskProvider() : await walletConnect.connect(chain)
            const account = await web3Connect(chain, provider)
            if (!account) return
    
            dispatch({
              type: ConnectionActionType.CONNECT,
              payload: { account },
            })
            getBalance(account)
            setSelectedNetwork(chain)
            setCurrentProvider(providerType)
    
            return account
          } catch (err) {
            const e = err as Error
            onNoti(e.message, 'error') // we assume because the user denied the connection
          }
        },
        [dispatch, getBalance, setSelectedNetwork, setCurrentProvider, onNoti],
      )
    
      const disconnect = useCallback(async () => {
        if (currentProvider === ProviderEnum.WalletConnect) {
          await walletConnect.disconnect()
        }
    
        setCurrentProvider(ProviderEnum.Disconnected)
        dispatch({ type: ConnectionActionType.DISCONNECT, payload: null })
      }, [dispatch, currentProvider, walletConnect.disconnect])
    
      const switchNetwork = useCallback(
        async (chain?: Chain) => {
          if (!chain) return
    
          try {
            let provider
            
            if (currentProvider === ProviderEnum.WalletConnect) {
              provider = await walletConnect.switchNetwork(chain)
            } else {
              provider = metamaskProvider()
            }
      
            const account = await web3Connect(chain, provider)
            if (!account) return
    
            dispatch({
              type: ConnectionActionType.CONNECT,
              payload: { account },
            })
            getBalance(account)
            setSelectedNetwork(chain)
    
            return account
          } catch (err) {
            const e = err as Error
            onNoti(e.message, 'error')
          }
        },
        [dispatch, getBalance, setSelectedNetwork, setCurrentProvider, onNoti, walletConnect],
      )
    
      const autoLogin = useCallback(async () => {
        if (currentProvider === ProviderEnum.Disconnected) return
        
        let provider
    
        switch (currentProvider) {
          case ProviderEnum.Metamask:
            provider = metamaskProvider()
            break
    
          case ProviderEnum.WalletConnect:
            provider = await walletConnect.connect(selectedNetwork)
            if (!provider || !provider.session) return
            break
    
          default:
            console.log("No provider selected or provider not supported.")
            return
        }
    
        const account = await web3Connect(selectedNetwork, provider)
        if (!account) return
    
        dispatch({
          type: ConnectionActionType.CONNECT,
          payload: { account },
        })
        getBalance(account)
      }, [currentProvider, selectedNetwork, metamaskProvider, walletConnect.connect])
      
      useEffect(() => {
        autoLogin()
    
        return () => {
          if (currentProvider === ProviderEnum.Disconnected) return
          if (currentProvider === ProviderEnum.Metamask) {
            ;(window.ethereum as any)?.removeListener('accountsChanged', () => {
              disconnect()
            })
          }
        }
      }, [])

  return { connect, disconnect, switchNetwork };
};
