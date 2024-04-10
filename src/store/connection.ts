import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { StoreReducer } from './store'
import { Chain } from 'aleph-sdk-ts/dist/messages/types';

export enum ProviderEnum {
  Metamask = 'Metamask',
  WalletConnect = 'WalletConnect',
  Disconnected = 'DisconnectState',
}

export type ConnectionState = {
  account?: Account
  balance?: number
  network?: Chain
  provider?: ProviderEnum
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
  payload: { account: Account }
}

export type DisconnectAction = {
  readonly type: ConnectionActionType.DISCONNECT
  payload: undefined
}

export type SwitchNetworkAction = {
  readonly type: ConnectionActionType.SWITCH_NETWORK
  payload: { network: Chain }
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
        const { account } = action.payload

        // @note: avoid performance issues
        // @todo: Fix it on the wallet picker component / header which is firing multiple connect events
        if (state.account?.address === account.address) return state

        // Mock CCN owner
        // ;(account as any).address = '0xc4CBB0672b2FEbE0D3eC2fD48Be3809078e6593b'

        // Mock CRN owner
        // ;(account as any).address = '0xD20212929FDe829C57f93dbfF9332f3FC8703BCD'

        // Not fully linked node
        // ;(account as any).address = '0x12AcF2e0FBB31972ccE4a97F90A013Ba58585e5c'

        // ;(account as any).address = '0x12AcF2e0FBB31972ccE4a97F90A013Ba58585e5c'

        return {
          ...state,
          account,
        }
      }

      case ConnectionActionType.DISCONNECT: {
        return {
          ...state,
          account: undefined,
        }
      }

      case ConnectionActionType.SWITCH_NETWORK: {
        const { network } = action.payload

        return {
          ...state,
          network,
        }
      }

      case ConnectionActionType.SET_BALANCE: {
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
