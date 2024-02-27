import { useAppState } from '@/contexts/appState'
import { getAccountBalance, web3Connect } from '@/helpers/aleph'
import { AccountActionType } from '@/store/account'
import { useNotification } from '@aleph-front/core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import { useCallback } from 'react'
import { useSessionStorage } from 'usehooks-ts'
import { ExternalProvider } from '@ethersproject/providers'

export type UseConnectReturn = {
  isConnected: boolean
  account: Account | undefined
  selectedNetwork: Chain
  switchNetwork: (chain: Chain) => Promise<Account | undefined>
  connect: (
    chain?: Chain,
    provider?: ExternalProvider,
  ) => Promise<Account | undefined>
  disconnect: () => Promise<void>
}

export function useConnect(): UseConnectReturn {
  const [state, dispatch] = useAppState()
  const noti = useNotification()
  const [keepAccountAlive, setKeepAccountAlive] = useSessionStorage(
    'keepAccountAlive',
    false,
  )
  const [selectedNetwork, setSelectedNetwork] = useSessionStorage<Chain>(
    'selectedNetwork',
    Chain.ETH,
  )

  const onError = useCallback(
    (error: string) => {
      noti &&
        noti.add({
          variant: 'error',
          title: 'Error',
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
    async (chain?: Chain, provider?: ExternalProvider) => {
      if (!chain) return

      let account
      try {
        if (!provider && window.ethereum) {
          provider = window.ethereum
        }

        account = await web3Connect(chain, provider)
        setSelectedNetwork(chain)
      } catch (err) {
        const e = err as Error
        onError(e.message) // we assume because the user denied the connection
      }

      if (!account) return
      // setKeepAccountAlive(true)

      await Promise.all([getBalance(account)]).catch((err) => {
        onError(err.message)
      })

      dispatch({
        type: AccountActionType.ACCOUNT_CONNECT,
        payload: { account },
      })

      return account
    },
    [getBalance, dispatch, setSelectedNetwork, onError],
  )

  const disconnect = useCallback(async () => {
    // setKeepAccountAlive(false)

    dispatch({
      type: AccountActionType.ACCOUNT_DISCONNECT,
      payload: null,
    })
  }, [dispatch])

  const switchNetwork = useCallback(
    async (chain: Chain) => {
      let account

      try {
        account = await web3Connect(chain, window.ethereum)
        setSelectedNetwork(chain)
        await Promise.all([getBalance(account)]).catch((err) => {
          onError(err.message)
        })

        console.log('Account connected after switching network: ', account)
      } catch (err) {
        const e = err as Error
        console.error('Error during network switch: ', e.message)
      }

      dispatch({
        type: AccountActionType.ACCOUNT_CONNECT,
        payload: { account },
      })

      return account
    },
    [dispatch, getBalance, onError, setSelectedNetwork],
  )

  const { account } = state.account
  const isConnected = !!account?.address

  return {
    connect,
    disconnect,
    switchNetwork,
    isConnected,
    account,
    selectedNetwork,
  }
}
