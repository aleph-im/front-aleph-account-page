import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { StoreReducer } from './store'

export type AccountState = {
  account?: Account
  balance?: number
}

export const initialState: AccountState = {
  account: undefined,
  balance: undefined,
}

export enum AccountActionType {
  ACCOUNT_CONNECT = 'ACCOUNT_CONNECT',
  ACCOUNT_DISCONNECT = 'ACCOUNT_DISCONNECT',
  ACCOUNT_SET_BALANCE = 'ACCOUNT_SET_BALANCE',
}

export type AccountConnectAction = {
  readonly type: AccountActionType.ACCOUNT_CONNECT
  payload: { account: Account }
}

export type AccountDisconnectAction = {
  readonly type: AccountActionType.ACCOUNT_DISCONNECT
}

export type AccountSetBalanceAction = {
  readonly type: AccountActionType.ACCOUNT_SET_BALANCE
  payload: { balance: number }
}

export type AccountAction =
  | AccountConnectAction
  | AccountDisconnectAction
  | AccountSetBalanceAction

export type AccountReducer = StoreReducer<AccountState, AccountAction>

export function getAccountReducer(): AccountReducer {
  return (state = initialState, action) => {
    switch (action.type) {
      case AccountActionType.ACCOUNT_CONNECT: {
        const { account } = action.payload

        // @note: avoid performance issues
        // @todo: Fix it on the wallet picker component / header which is firing multiple connect events
        if (state.account?.address === account.address) return state

        return {
          ...state,
          account,
        }
      }

      case AccountActionType.ACCOUNT_DISCONNECT: {
        return {
          ...state,
          account: undefined,
        }
      }

      case AccountActionType.ACCOUNT_SET_BALANCE: {
        const { balance } = action.payload

        return {
          ...state,
          balance,
        }
      }

      default: {
        return state
      }
    }
  }
}
