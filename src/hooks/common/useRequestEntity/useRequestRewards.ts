import { useMemo } from 'react'
import { useAppState } from '@/contexts/appState'
import { useAppStoreRequest } from '../useStoreRequest'
import { RewardsResponse, StakeManager } from '@/domain/stake'

export type UseRequestRewardsProps = {
  triggerDeps?: unknown[]
}

export type UseRequestRewardsReturn = {
  lastRewardsDistribution?: RewardsResponse
  lastRewardsCalculation?: RewardsResponse
}

export function useRequestRewards({
  triggerDeps,
}: UseRequestRewardsProps): UseRequestRewardsReturn {
  const [state] = useAppState()
  const { account } = state.account

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new StakeManager(account), [account])

  // -----------------------------

  const { data: lastRewardsDistribution } = useAppStoreRequest({
    name: 'lastRewardsDistribution',
    doRequest: () => nodeManager.getLastRewardsDistribution(),
    onSuccess: () => null,
    flushData: false,
    triggerOnMount: true,
    triggerDeps,
  })

  // -----------------------------

  const { data: lastRewardsCalculation } = useAppStoreRequest({
    name: 'lastRewardsCalculation',
    doRequest: () => nodeManager.getLastRewardsCalculation(),
    onSuccess: () => null,
    flushData: false,
    triggerOnMount: true,
    triggerDeps,
  })

  // -----------------------------

  return {
    lastRewardsDistribution,
    lastRewardsCalculation,
  }
}
