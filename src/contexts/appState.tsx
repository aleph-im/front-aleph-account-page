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
import {
  UseConnection,
  useConnection,
} from '@/hooks/common/useConnection/useConnection'

export type AppContextValue = UseConnection & {
  state: StoreState
  dispatch: Dispatch<StoreAction>
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
  const [state, dispatch] = useReducer(storeReducer, storeInitialState)
  const { connect, disconnect, switchNetwork } = useConnection(
    state.connection,
    dispatch,
  )

  const value = {
    state,
    dispatch,
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
