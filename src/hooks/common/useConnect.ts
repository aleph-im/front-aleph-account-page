import { useAppState } from '@/contexts/appState'
import { getAccountBalance, web3Connect } from '@/helpers/aleph'
import { AccountActionType } from '@/store/account'
import { useNotification } from '@aleph-front/core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import { useCallback, useEffect } from 'react'
import { useSessionStorage } from 'usehooks-ts'
import { useWalletConnect } from './useWalletConnect'

export type UseConnectReturn = {
  connect: (chain?: Chain, provider?: any) => Promise<Account | undefined>
  disconnect: () => Promise<void>
  switchNetwork: (chain?: Chain, provider?: any) => Promise<Account | undefined>
  isConnected: boolean
  account: Account | undefined
  selectedNetwork: Chain
}

type NotificationCardVariant = 'error' | 'success' | 'warning'

export enum ProviderEnum {
  Metamask = 'Metamask',
  WalletConnect = 'WalletConnect',
  Disconnected = 'DisconnectState',
}

export function useConnect(): UseConnectReturn {
  const walletConnect = useWalletConnect()
  const [state, dispatch] = useAppState()
  const noti = useNotification()
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

  const updateState = useCallback(
    async (chain: Chain, provider: any) => {
      const account = await web3Connect(chain, provider)
      if (!account) return

      dispatch({
        type: AccountActionType.ACCOUNT_CONNECT,
        payload: { account },
      })
      getBalance(account)
      setSelectedNetwork(chain)
      setCurrentProvider(
        provider.isWalletConnect
          ? ProviderEnum.WalletConnect
          : ProviderEnum.Metamask,
      )

      return account
    },
    [dispatch, getBalance, setSelectedNetwork, setCurrentProvider],
  )

  const connect = useCallback(
    async (chain?: Chain, providerType: ProviderEnum = ProviderEnum.Metamask) => {
      if (!chain) return

      try {
        let provider = metamaskProvider()
        if (providerType === ProviderEnum.WalletConnect) {
          provider = await walletConnect.connect(chain)
        }
        return await updateState(chain, provider)
      } catch (err) {
        const e = err as Error
        onNoti(e.message, 'error') // we assume because the user denied the connection
      }
    },
    [updateState, onNoti, walletConnect],
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
        let provider = metamaskProvider()
        if (providerType === ProviderEnum.WalletConnect) {
          provider = await walletConnect.connect(chain)
        }
  
        return await updateState(chain, provider)
      } catch (err) {
        const e = err as Error
        onNoti(e.message, 'error')
      }
    },
    [updateState, onNoti],
  )

  const { account } = state
  const isConnected = !!account.account?.address

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
    }

    await updateState(selectedNetwork, provider)
  }, [currentProvider, selectedNetwork, metamaskProvider, walletConnect.connect])
  
  useEffect(() => {
    autoLogin()

    // fix this clean-up function
    return () => {
      switch (currentProvider) {
        case ProviderEnum.Metamask:
          ;(window.ethereum as any)?.removeListener('accountsChanged', () => {
            disconnect()
          })
          break
        /*case ProviderEnum.WalletConnect:
          walletConnect.removeListeners()
          break
        default:
          console.log("No provider selected or provider not supported.")*/
      }
    }
  }, [])

  return {
    connect,
    disconnect,
    switchNetwork,
    isConnected,
    account: account.account,
    selectedNetwork,
  }
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
