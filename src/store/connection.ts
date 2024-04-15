import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { StoreReducer } from './store'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import { ProviderType } from '@/hooks/common/useConnection/utils'

export type ConnectionState = {
  account?: Account
  balance?: number
  network?: Chain
  provider?: ProviderType
}

export const initialState: ConnectionState = {
  network: undefined,
  provider: undefined,
  account: undefined,
  balance: undefined,
}

export enum ConnectionActionType {
  CONNECT = 'CONNECT',
  DISCONNECT = 'DISCONNECT',
  SWITCH_NETWORK = 'SWITCH_NETWORK',
  SET_BALANCE = 'SET_BALANCE',
}

export type ConnectAction = {
  readonly type: ConnectionActionType.CONNECT
  payload: {
    account: Account
    balance: number
    network: Chain
    provider: ProviderType
  }
}

export type DisconnectAction = {
  readonly type: ConnectionActionType.DISCONNECT
  payload: null
}

export type SwitchNetworkAction = {
  readonly type: ConnectionActionType.SWITCH_NETWORK
  payload: {
    account: Account
    balance: number
    network: Chain
  }
}

export type SetBalanceAction = {
  readonly type: ConnectionActionType.SET_BALANCE
  payload: { balance: number }
}

export type ConnectionAction =
  | ConnectAction
  | DisconnectAction
  | SwitchNetworkAction
  | SetBalanceAction

export type ConnectionReducer = StoreReducer<ConnectionState, ConnectionAction>

export function getConnectionReducer(): ConnectionReducer {
  return (state = initialState, action) => {
    switch (action.type) {
      case ConnectionActionType.CONNECT: {
        return action.payload
      }

      case ConnectionActionType.DISCONNECT: {
        return initialState
      }

      case ConnectionActionType.SWITCH_NETWORK: {
        const { account, balance, network } = action.payload
        return {
          ...state,
          account,
          balance,
          network,
        }
      }

      case ConnectionActionType.SET_BALANCE: {
        const { balance } = action.payload
        return { ...state, balance }
      }

      default: {
        return state
      }
    }
  }
}
