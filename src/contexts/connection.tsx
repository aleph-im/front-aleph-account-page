import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import { useAppState } from './appState'
import { getAccountBalance, web3Connect } from '@/helpers/aleph'
import { useWalletConnect } from '@/hooks/common/useWalletConnect'
import { AccountActionType } from '@/store/account'
import { useNotification } from '@aleph-front/core'
import { useSessionStorage } from 'usehooks-ts'

export type UseConnectValue = {
    connect: (chain?: Chain, provider?: any) => Promise<Account | undefined>
    disconnect: () => Promise<void>
    switchNetwork: (chain?: Chain, provider?: any) => Promise<Account | undefined>
    isConnected: boolean
    account: Account | undefined
    selectedNetwork: Chain
}

export type ConnectionProviderProps = {
    children: ReactNode
}

type NotificationCardVariant = 'error' | 'success' | 'warning'

export enum ProviderEnum {
    Metamask = 'Metamask',
    WalletConnect = 'WalletConnect',
    Disconnected = 'DisconnectState',
}

const noOpAsync = async () => undefined

const defaultValue: UseConnectValue = {
    connect: noOpAsync,
    disconnect: noOpAsync,
    switchNetwork: noOpAsync,
    isConnected: false,
    account: undefined,
    selectedNetwork: Chain.ETH,
}

export const ConnectionContext = createContext<UseConnectValue>(defaultValue)

export function ConnectionProvider({ children }: ConnectionProviderProps) {
  const walletConnect = useWalletConnect()
  const noti = useNotification()
  const [state, dispatch] = useAppState()
  const [selectedNetwork, setSelectedNetwork] = useSessionStorage<Chain>(
    'selectedNetwork',
    Chain.ETH,
  )
  const [currentProvider, setCurrentProvider] = useSessionStorage<ProviderEnum>(
    'currentProvider',
    ProviderEnum.Disconnected,
  )

  const metamaskProvider = useCallback(() => {
    ;(window.ethereum as any)?.on('accountsChanged', function () {
      connect()
    })

    return window.ethereum
  }, [])

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
        type: AccountActionType.ACCOUNT_SET_BALANCE,
        payload: { balance },
      })
    },
    [dispatch],
  )

  const connect = useCallback(
    async (chain?: Chain, providerType: ProviderEnum = ProviderEnum.Metamask) => {
      if (!chain) return

      try {
        let provider
        
        if (providerType === ProviderEnum.WalletConnect) {
          provider = await walletConnect.connect(chain)
        } else {
          provider = metamaskProvider()
        }
        
        const account = await web3Connect(chain, provider)
        if (!account) return

        dispatch({
          type: AccountActionType.ACCOUNT_CONNECT,
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
    dispatch({ type: AccountActionType.ACCOUNT_DISCONNECT, payload: null })
  }, [dispatch, currentProvider, walletConnect.disconnect])

  const switchNetwork = useCallback(
    async (chain?: Chain, providerType: ProviderEnum = ProviderEnum.Metamask) => {
      if (!chain) return

      try {
        let provider
        
        if (providerType === ProviderEnum.WalletConnect) {
          provider = await walletConnect.connect(chain)
        } else {
          provider = metamaskProvider()
        }
  
        const account = await web3Connect(chain, provider)
        if (!account) return

        dispatch({
          type: AccountActionType.ACCOUNT_CONNECT,
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

  const { account: { account } } = state
  const isConnected = !!account?.address

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
      type: AccountActionType.ACCOUNT_CONNECT,
      payload: { account },
    })
    getBalance(account)
  }, [currentProvider, selectedNetwork, metamaskProvider, walletConnect.connect])
  
  useEffect(() => {
    autoLogin()

    return () => {
      // note: wallet connect hook handles its own listeners
      if (currentProvider === ProviderEnum.Disconnected) return
      if (currentProvider === ProviderEnum.Metamask) {
        ;(window.ethereum as any)?.removeListener('accountsChanged', () => {
          disconnect()
        })
      }
    }
  }, [])

  const value = useMemo(() => ({
    connect,
    disconnect,
    switchNetwork,
    isConnected,
    account,
    selectedNetwork,
  }), [connect, disconnect, switchNetwork, isConnected, account, selectedNetwork]);

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  )
}

export function useConnect(): UseConnectValue {
  return useContext(ConnectionContext)
}

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
