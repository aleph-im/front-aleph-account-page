import { useAppState } from '@/contexts/appState'
import { StakeManager } from '@/domain/stake'
import { useRequest } from '@/hooks/common/useRequest'
import { useCallback, useMemo } from 'react'

export type UseUserStakingRewardsReturn = {
  rewards?: Record<string, number>
}

export function useStakingRewards(): UseUserStakingRewardsReturn {
  const [{ account }] = useAppState()

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new StakeManager(account), [account])

  // -----------------------------

  const doRequest = useCallback(
    () => nodeManager.getLastStakingRewards(),
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

// -----------------------------

export type UseAccountStakingRewardsProps = {
  address: string
}

export type UseAccountStakingRewardsReturn = {
  rewards?: number
}

export function useAccountStakingRewards({
  address,
}: UseAccountStakingRewardsProps): UseAccountStakingRewardsReturn {
  const { rewards } = useStakingRewards()
  if (!rewards) return {}

  return { rewards: rewards[address] || 0 }
}
