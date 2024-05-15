import { Account } from '@aleph-sdk/account'
import { StoreReducer } from './store'
import { BlockchainId, ProviderId } from '@/domain/connect/base'

export type ConnectionState = {
  account?: Account
  balance?: number
  blockchain?: BlockchainId
  provider?: ProviderId
}

export const initialState: ConnectionState = {
  blockchain: undefined,
  provider: undefined,
  account: undefined,
  balance: undefined,
}

export enum ConnectionActionType {
  CONNECTION_CONNECT = 'CONNECTION_CONNECT',
  CONNECTION_DISCONNECT = 'CONNECTION_DISCONNECT',
  CONNECTION_SET_ACCOUNT = 'CONNECTION_SET_ACCOUNT',
  CONNECTION_SET_BALANCE = 'CONNECTION_SET_BALANCE',
}

export class ConnectionConnectAction {
  readonly type = ConnectionActionType.CONNECTION_CONNECT
  constructor(
    public payload: {
      provider?: ProviderId
      blockchain: BlockchainId
    },
  ) {}
}

export class ConnectionDisconnectAction {
  readonly type = ConnectionActionType.CONNECTION_DISCONNECT
  payload = null
}

export class ConnectionSetAccountAction {
  readonly type = ConnectionActionType.CONNECTION_SET_ACCOUNT
  constructor(
    public payload: {
      account: Account
      balance?: number
      provider?: ProviderId
      blockchain?: BlockchainId
    },
  ) {}
}

export class ConnectionSetBalanceAction {
  readonly type = ConnectionActionType.CONNECTION_SET_BALANCE
  constructor(
    public payload: {
      balance: number
    },
  ) {}
}

export type ConnectionAction =
  | ConnectionConnectAction
  | ConnectionDisconnectAction
  | ConnectionSetAccountAction
  | ConnectionSetBalanceAction

export type ConnectionReducer = StoreReducer<ConnectionState, ConnectionAction>

export function getConnectionReducer(): ConnectionReducer {
  return (state = initialState, action) => {
    switch (action.type) {
      case ConnectionActionType.CONNECTION_DISCONNECT: {
        return { ...initialState }
      }

      case ConnectionActionType.CONNECTION_CONNECT:
      case ConnectionActionType.CONNECTION_SET_ACCOUNT:
      case ConnectionActionType.CONNECTION_SET_BALANCE: {
        return {
          ...state,
          ...action.payload,
        }
      }

      default: {
        return state
      }
    }
  }
}
