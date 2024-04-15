import { Dispatch, useCallback, useEffect, useRef, useState } from 'react'
import { chainToId, getAccountInfo, idToChain } from './utils'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import {
  ConnectionAction,
  ConnectionActionType,
  ConnectionState,
} from '@/store/connection'
import { getAccountBalance } from '@/helpers/aleph'

export type MetamaskProvider = {
  connect: (chain: Chain) => Promise<any>
  switchNetwork: (chain: Chain) => Promise<any>
  disconnect: () => void
}

export const useMetamask = (
  initialNetwork: Chain,
  state: ConnectionState,
  dispatch: Dispatch<ConnectionAction>,
): MetamaskProvider => {
  // network state to use on listener callbacks
  const [network, setNetwork] = useState(initialNetwork)
  const networkRef = useRef(network)
  useEffect(() => {
    networkRef.current = network
  }, [network])

  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
  }, [state])

  const handleAccountsChanged = useCallback(
    async (accounts: string[]) => {
      if (!state.account) return

      const balance = await getAccountBalance(state.account)
      dispatch({
        type: ConnectionActionType.SET_BALANCE,
        payload: { balance },
      })
    },
    [dispatch],
  )

  const handleChainChanged = useCallback(
    async (hexNetworkId: string) => {
      const supportedChains = [1]
      const networkId = parseInt(hexNetworkId, 16)

      // notify user, ask him to go back to previous network
      if (!supportedChains.includes(networkId)) return

      const newNetwork = idToChain(networkId)
      if (newNetwork !== networkRef.current) {
        setNetwork(newNetwork)
        const { account, balance } = await getAccountInfo(
          newNetwork,
          window.ethereum,
        )
        dispatch({
          type: ConnectionActionType.SWITCH_NETWORK,
          payload: { network: newNetwork, account, balance },
        })
      }
    },
    [dispatch],
  )

  const connect = useCallback(
    async (chain: Chain) => {
      ;(window.ethereum as any)?.on('chainChanged', handleChainChanged)
      ;(window.ethereum as any)?.on('accountsChanged', handleAccountsChanged)

      return window.ethereum
    },
    [handleAccountsChanged, handleChainChanged, dispatch],
  )

  const switchNetwork = useCallback(async (network: Chain) => {
    const chainId = chainToId(network)
    try {
      if (window.ethereum) {
        await window.ethereum.request?.({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        })
        return window.ethereum
      }
    } catch (error: any) {
      return
    }
  }, [])

  const disconnect = useCallback(() => {
    ;(window.ethereum as any)?.off('chainChanged', handleChainChanged)
    ;(window.ethereum as any)?.off('accountsChanged', handleAccountsChanged)
  }, [handleAccountsChanged, handleChainChanged])

  return {
    connect,
    switchNetwork,
    disconnect,
  }
}
