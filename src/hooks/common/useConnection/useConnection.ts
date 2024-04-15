import { useNotification } from '@aleph-front/core'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import { Dispatch, useCallback, useEffect, useMemo, useRef } from 'react'
import { WalletConnectProvider, useWalletConnect } from './useWalletConnect'
import UniversalProvider from '@walletconnect/universal-provider'
import { MetamaskProvider, useMetamask } from './useMetamask'
import { useSessionStorage } from 'usehooks-ts'
import { ProviderType, getAccountInfo } from './utils'
import {
  ConnectionAction,
  ConnectionActionType,
  ConnectionState,
} from '@/store/connection'
import { ethers } from 'ethers'

export type ConnectionManagers = MetamaskProvider | WalletConnectProvider

export type Providers = UniversalProvider | ethers.providers.ExternalProvider

export type UseConnection = {
  connect: (chain: Chain, providerType: ProviderType) => Promise<void>
  switchNetwork: (chain: Chain) => Promise<void>
  disconnect: () => Promise<void>
}

type NotificationCardVariant = 'error' | 'success' | 'warning'

export const useConnection = (
  state: ConnectionState,
  dispatch: Dispatch<ConnectionAction>,
): UseConnection => {
  const [sessionNetwork, setSessionNetwork] = useSessionStorage<Chain>(
    'sessionNetwork',
    Chain.ETH,
  )
  const [sessionProvider, setSessionProvider] = useSessionStorage<
    ProviderType | undefined
  >('sessionProvider', undefined)

  const sessionProviderRef = useRef(sessionProvider)
  const sessionNetworkRef = useRef(sessionNetwork)
  useEffect(() => {
    sessionProviderRef.current = sessionProvider
    sessionNetworkRef.current = sessionNetwork
  }, [sessionProvider, sessionNetwork])

  // keep session storage in sync with main state
  // reacts to custom provider changes (metamask extension/wallet connect)
  useEffect(() => {
    if (state.network && sessionNetwork !== state.network) {
      setSessionNetwork(state.network)
    }
    if (state.provider && sessionProvider !== state.provider) {
      setSessionProvider(state.provider)
    }
  }, [state.network, state.provider, setSessionNetwork, setSessionProvider])

  const connectionManager = {
    [ProviderType.Metamask]: useMetamask(sessionNetwork, state, dispatch),
    [ProviderType.WalletConnect]: useWalletConnect(
      sessionNetwork,
      state,
      dispatch,
    ),
  }

  const noti = useNotification()
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

  // triggered by connect button and auto-login
  const connect = useCallback(
    async (network: Chain, providerType: ProviderType) => {
      try {
        const provider = await connectionManager[providerType].connect(network)
        if (!provider) return

        const { account, balance } = await getAccountInfo(network, provider)
        setSessionProvider(providerType)
        setSessionNetwork(network)
        dispatch({
          type: ConnectionActionType.CONNECT,
          payload: { account, balance, network, provider: providerType },
        })
      } catch (err) {
        const e = err as Error
        onNoti(e.message, 'error')
      }
    },
    [setSessionProvider, setSessionNetwork, dispatch, onNoti],
  )

  const switchNetwork = useCallback(
    async (network: Chain) => {
      const currentProvider = sessionProviderRef.current
      if (!currentProvider) return

      const provider =
        await connectionManager[currentProvider].switchNetwork(network)
      if (!provider) return

      const { account, balance } = await getAccountInfo(network, provider)
      setSessionNetwork(network)
      dispatch({
        type: ConnectionActionType.SWITCH_NETWORK,
        payload: { account, balance, network },
      })
    },
    [sessionProvider, dispatch, setSessionNetwork],
  )

  const disconnect = useCallback(async () => {
    const currentProvider = sessionProviderRef.current
    if (!currentProvider) return

    connectionManager[currentProvider].disconnect()

    dispatch({
      type: ConnectionActionType.DISCONNECT,
      payload: null,
    })
    setSessionProvider(undefined)
  }, [dispatch, setSessionProvider])

  // auto-login
  useEffect(() => {
    if (!sessionProvider) return

    connect(sessionNetwork, sessionProvider)
    return () => {
      disconnect()
    }
  }, [])

  return { connect, disconnect, switchNetwork }
}
