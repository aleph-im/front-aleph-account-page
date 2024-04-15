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
  connect: (network: Chain) => Promise<any>
  switchNetwork: (network: Chain) => Promise<any>
  disconnect: () => void
}

export const useMetamask = (
  state: ConnectionState,
  dispatch: Dispatch<ConnectionAction>,
): MetamaskProvider => {
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
      if (newNetwork !== stateRef.current.network) {
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
    async (network: Chain) => {
      ;(window.ethereum as any)?.on('chainChanged', handleChainChanged)
      ;(window.ethereum as any)?.on('accountsChanged', handleAccountsChanged)

      return window.ethereum
    },
    [handleAccountsChanged, handleChainChanged, dispatch],
  )

  const switchNetwork = useCallback(async (network: Chain) => {
    const chainId = chainToId(network)
    try {
      await window.ethereum?.request?.({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
      return window.ethereum
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
