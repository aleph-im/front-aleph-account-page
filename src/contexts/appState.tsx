import {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  useContext,
} from 'react'
import {
  StoreAction,
  storeInitialState,
  storeReducer,
  StoreState,
} from '@/store/store'
import { Account } from 'aleph-sdk-ts/dist/accounts/account';
import { Chain } from 'aleph-sdk-ts/dist/messages/types';
import { useConnection } from '@/hooks/common/useConnection';
import { ProviderEnum } from '@/store/connection';

export type AppContextValue = {
  state: StoreState
  dispatch: Dispatch<StoreAction>
  connect: (chain?: Chain, providerType?: ProviderEnum) => Promise<Account | undefined>
  disconnect: () => Promise<void>
  switchNetwork: (chain?: Chain) => Promise<Account | undefined>
}

export type AppStateProviderProps = {
  children: ReactNode
}

export const AppStateContext = createContext<AppContextValue>({
  state: storeInitialState,
  dispatch: () => null,
  connect: () => Promise.resolve(undefined),
  disconnect: () => Promise.resolve(),
  switchNetwork: () => Promise.resolve(undefined),
})

export function AppStateProvider({ children }: AppStateProviderProps) {
  const state = useReducer(storeReducer, storeInitialState)
  const { connect, disconnect, switchNetwork } = useConnection(state[1])
  
  const value = {
    state: state[0],
    dispatch: state[1],
    connect,
    disconnect,
    switchNetwork,
  }

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState(): AppContextValue {
  return useContext(AppStateContext)
}
