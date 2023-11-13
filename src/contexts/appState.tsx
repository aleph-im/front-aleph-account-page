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

export type AppContextValue = [
  state: StoreState,
  dispatch: Dispatch<StoreAction>,
]

export type AppStateProviderProps = {
  children: ReactNode
}

export const AppStateContext = createContext<AppContextValue>([
  storeInitialState,
  () => null,
])

export function AppStateProvider({ children }: AppStateProviderProps) {
  const value = useReducer(storeReducer, storeInitialState)

  // console.log('STORE', value[0])

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState(): AppContextValue {
  return useContext(AppStateContext)
}
