import { CCN, CRN, NodeLastVersions } from '@/domain/node'
import { AccountState, getAccountReducer } from './account'
import { EntityState, getEntityReducer } from './entity'
import { RequestState, getRequestReducer } from './request'
import { RewardsResponse } from '@/domain/stake'

export type StoreSubstate = Record<string, unknown>

export type StoreAction<T = any, P = any> = {
  readonly type: T
  payload: P | undefined
}

export type StoreReducer<S extends StoreSubstate, A extends StoreAction> = (
  state: S,
  action: A,
) => S

export function mergeReducers<RootState extends Record<string, StoreSubstate>>(
  reducers: Record<keyof RootState, StoreReducer<any, StoreAction>>,
): StoreReducer<RootState, StoreAction> {
  return (state, action) => {
    for (const [slice, reducer] of Object.entries(reducers)) {
      const prevSubstate = state[slice]
      const newSubstate = reducer(prevSubstate, action)

      if (newSubstate === prevSubstate) continue

      state = {
        ...state,
        [slice]: newSubstate,
      }
    }

    return state
  }
}

export function getInitialState<
  RootState extends Record<string, StoreSubstate>,
>(reducer: StoreReducer<RootState, StoreAction>): RootState {
  return reducer({} as RootState, { type: 'INITIAL_STATE', payload: undefined })
}

export type StoreState = {
  account: AccountState
  lastRewardsDistribution: RequestState<RewardsResponse>
  lastRewardsCalculation: RequestState<RewardsResponse>
  lastCRNVersion: RequestState<NodeLastVersions>
  lastCCNVersion: RequestState<NodeLastVersions>
  ccns: EntityState<CCN>
  crns: EntityState<CRN>
}

export const storeReducer = mergeReducers<StoreState>({
  account: getAccountReducer(),
  ccns: getEntityReducer<CCN>('ccns', 'hash', 'virtual'),
  crns: getEntityReducer<CRN>('crns', 'hash', 'virtual'),
  lastCRNVersion: getRequestReducer<NodeLastVersions>('lastCRNVersion'),
  lastCCNVersion: getRequestReducer<NodeLastVersions>('lastCCNVersion'),
  lastRewardsDistribution: getRequestReducer<RewardsResponse>(
    'lastRewardsDistribution',
  ),
  lastRewardsCalculation: getRequestReducer<RewardsResponse>(
    'lastRewardsCalculation',
  ),
})

export const storeInitialState: StoreState = getInitialState(storeReducer)
