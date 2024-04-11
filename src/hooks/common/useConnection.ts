import { getAccountBalance, web3Connect } from '@/helpers/aleph'
import {
  ConnectionActionType,
  ConnectionState,
  ProviderEnum,
} from '@/store/connection'
import { StoreAction } from '@/store/store'
import { useNotification } from '@aleph-front/core'
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

export type UseConnection = {
  connect: (chain: Chain, providerType?: ProviderEnum) => Promise<void>
  disconnect: () => Promise<void>
  switchNetwork: (chain: Chain) => Promise<void>
}

export const useConnection = (
  state: ConnectionState,
  dispatch: Dispatch<StoreAction>,
): UseConnection => {
  const handleNetworkChanged = async () => {
    const account = await web3Connect(currentNetwork, window.ethereum)
    if (!account) return

    const balance = await getAccountBalance(account)
    dispatch({
      type: ConnectionActionType.SET_BALANCE,
      payload: { balance },
    })
  }

  const handleAccountsChanged = async (networkId: number) => {
    const { account } = state
    if (!account) return

    const network = idToChain(networkId)
    const balance = await getAccountBalance(account)
    dispatch({
      type: ConnectionActionType.SWITCH_NETWORK,
      payload: { network, balance },
    })
  }

  const metamaskProvider = useCallback(() => {
    window.ethereum.on('accountsChanged', handleNetworkChanged)
    window.ethereum.on('networkChanged', handleAccountsChanged)

    return window.ethereum
  }, [])

  const walletConnect = useWalletConnect({
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
    dispatch,
    metadata: {
      name: 'Aleph.im',
      description: 'Aleph.im: Web3 cloud solution',
      url: 'https://aleph.im/',
      icons: [],
    },
  })

  const [currentNetwork, setCurrentNetwork] = useSessionStorage<Chain>(
    'setCurrentNetwork',
    Chain.ETH,
  )
  const [currentProvider, setCurrentProvider] = useSessionStorage<ProviderEnum>(
    'currentProvider',
    ProviderEnum.Disconnected,
  )

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

  const connect = useCallback(
    async (
      chain: Chain,
      providerType: ProviderEnum = ProviderEnum.Metamask,
    ) => {
      try {
        const provider =
          providerType === ProviderEnum.Metamask
            ? metamaskProvider()
            : await walletConnect.connect(chain)

        const account = await web3Connect(chain, provider)
        if (!account) return

        const balance = await getAccountBalance(account)
        dispatch({
          type: ConnectionActionType.CONNECT,
          payload: { account, balance, network: chain, provider },
        })
        setCurrentNetwork(chain)
        setCurrentProvider(providerType)
      } catch (err) {
        const e = err as Error
        onNoti(e.message, 'error') // we assume because the user denied the connection
      }
    },
    [dispatch, setCurrentNetwork, setCurrentProvider, onNoti],
  )

  const disconnect = useCallback(async () => {
    if (currentProvider === ProviderEnum.WalletConnect) {
      await walletConnect.disconnect()
    }
    if (currentProvider === ProviderEnum.Metamask) {
      window.ethereum.removeListener('networkChanged', handleNetworkChanged)
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }

    setCurrentProvider(ProviderEnum.Disconnected)
    dispatch({ type: ConnectionActionType.DISCONNECT, payload: null })
  }, [dispatch, currentProvider, setCurrentProvider, walletConnect.disconnect])

  const switchNetwork = useCallback(
    async (network: Chain) => {
      if (!state.account) return
      if (state.network === currentNetwork) return

      const provider =
        currentProvider === ProviderEnum.Metamask
          ? window.ethereum
          : await walletConnect.switchNetwork(network)

      const account = await web3Connect(network, provider)
      if (!account) return

      const balance = await getAccountBalance(account)
      dispatch({
        type: ConnectionActionType.SWITCH_NETWORK,
        payload: { network, balance },
      })
    },
    [dispatch, onNoti, walletConnect],
  )

  const autoLogin = useCallback(async () => {
    if (currentProvider === ProviderEnum.Disconnected) return

    if (currentProvider === ProviderEnum.WalletConnect) {
      const universalProvider = await walletConnect.connect(currentNetwork)
      if (!universalProvider || !universalProvider.session) return
    }

    const provider =
      currentProvider === ProviderEnum.Metamask
        ? metamaskProvider()
        : await walletConnect.connect(currentNetwork)

    const account = await web3Connect(currentNetwork, provider)
    if (!account) return

    const balance = await getAccountBalance(account)
    dispatch({
      type: ConnectionActionType.CONNECT,
      payload: { account, balance, network: currentNetwork, provider },
    })
  }, [currentProvider, currentNetwork, walletConnect.connect])

  useEffect(() => {
    autoLogin()

    return () => {
      if (currentProvider === ProviderEnum.Disconnected) return

      if (currentProvider === ProviderEnum.Metamask) {
        window.ethereum.removeListener('networkChanged', handleNetworkChanged)
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [])

  return { connect, disconnect, switchNetwork }
}
