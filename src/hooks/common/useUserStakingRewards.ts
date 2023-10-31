import { useAppState } from '@/contexts/appState'
import { StakeManager } from '@/domain/stake'
import { useRequest } from '@/hooks/common/useRequest'
import { useCallback, useMemo } from 'react'

export type UseUserStakingRewardsReturn = {
  rewards?: number
}

export function useUserStakingRewards(): UseUserStakingRewardsReturn {
  const [{ account }] = useAppState()

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new StakeManager(account), [account])

  // -----------------------------

  const doRequest = useCallback(
    () => nodeManager.getLastUserStakingRewards(),
    [nodeManager],
  )

  const { data: rewards } = useRequest({
    doRequest,
    onSuccess: () => null,
    triggerOnMount: true,
    triggerDeps: [nodeManager],
  })

  // -----------------------------

  return {
    rewards,
  }
}
