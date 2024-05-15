import { useCallback, useEffect } from 'react'
import { useNotification } from '@aleph-front/core'
import {
  ConnectionConnectAction,
  ConnectionDisconnectAction,
  ConnectionSetAccountAction,
} from '@/store/connection'
import { connectionProviderManager } from '@/domain/connect'
import { useAppState } from '@/contexts/appState'

export type UseConnectionProps = {
  triggerOnMount?: boolean
  triggerDeps?: any[]
}

export type UseConnectionReturn = {
  handleConnect: (payload: ConnectionConnectAction['payload']) => void
  handleDisconnect: () => void
}

export const useConnection = ({
  triggerOnMount,
  triggerDeps = [],
}: UseConnectionProps): UseConnectionReturn => {
  const [state, dispatch] = useAppState()
  const { blockchain, provider } = state.connection

  const noti = useNotification()
  const addNotification = noti?.add

  const handleConnect = useCallback(
    (payload: ConnectionConnectAction['payload']) =>
      dispatch(new ConnectionConnectAction(payload)),
    [dispatch],
  )

  const handleDisconnect = useCallback(
    () => dispatch(new ConnectionDisconnectAction()),
    [dispatch],
  )

  // @note: Auto loggin
  useEffect(() => {
    if (!triggerOnMount) return
    if (!provider) return

    const connectionProvider = connectionProviderManager.of(provider)

    const handleAccountChange = (
      payload: ConnectionSetAccountAction['payload'],
    ) => dispatch(new ConnectionSetAccountAction(payload))

    const handleBlockchainChange = (
      payload: ConnectionConnectAction['payload'],
    ) => dispatch(new ConnectionConnectAction(payload))

    async function connect() {
      if (!blockchain) return

      connectionProvider.events.on('account', handleAccountChange)
      connectionProvider.events.on('blockchain', handleBlockchainChange)

      try {
        await connectionProvider.connect(blockchain)
      } catch (error) {
        dispatch(new ConnectionDisconnectAction())

        addNotification &&
          addNotification({
            variant: 'error',
            title: 'Error',
            text: (error as Error).message,
          })
      }
    }

    connect()

    return () => {
      connectionProvider.events.off('account', handleAccountChange)
      connectionProvider.events.off('blockchain', handleBlockchainChange)

      connectionProvider.disconnect()
    }
  }, [triggerOnMount, provider, blockchain, addNotification, dispatch, noti])

  return {
    handleConnect,
    handleDisconnect,
  }
}
