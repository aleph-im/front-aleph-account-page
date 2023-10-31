import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { MessageManager } from '@/domain/message'

export enum ActionTypes {
  connect,
  disconnect,
  setAccountBalance,
}

export type State = {
  account?: Account
  accountBalance?: number
  messageManager?: MessageManager
}

export type Action = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
  type: ActionTypes
}

export const initialState: State = {
  account: undefined,
  accountBalance: undefined,
  messageManager: undefined,
}

export const reducer = (
  state: State = initialState,
  { type, payload }: Action,
) => {
  switch (type) {
    case ActionTypes.connect: {
      // @note: avoid performance issues
      // @todo: Fix it on the wallet picker component / header which is firing multiple connect events
      if (state.account?.address === payload?.account?.address) return state

      const { account } = payload
      const messageManager = new MessageManager(account)

      return {
        ...state,
        account,
        messageManager,
      }
    }

    case ActionTypes.disconnect: {
      return {
        ...state,
        account: undefined,
        messageManager: undefined,
      }
    }

    case ActionTypes.setAccountBalance: {
      return {
        ...state,
        accountBalance: payload.balance,
      }
    }

    default: {
      return state
    }
  }
}
