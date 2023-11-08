import { useAppState } from '@/contexts/appState'
import { RewardsResponse, StakeManager } from '@/domain/stake'
import { useRequest } from '@/hooks/common/useRequest'
import { useEffect, useMemo, useState } from 'react'

export type UseLastRewards = {
  lastRewardsDistribution?: RewardsResponse
  lastRewardsCalculation?: RewardsResponse
}

export function useLastRewards(): UseLastRewards {
  const [{ account }] = useAppState()

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new StakeManager(account), [account])

  // -----------------------------

  const { data: lastRewardsDistribution } = useRequest({
    doRequest: () => nodeManager.getLastRewardsDistribution(),
    onSuccess: () => null,
    triggerOnMount: true,
  })

  // -----------------------------

  const { data: lastRewardsCalculation } = useRequest({
    doRequest: () => nodeManager.getLastRewardsCalculation(),
    onSuccess: () => null,
    triggerOnMount: true,
  })

  // -----------------------------

  return {
    lastRewardsDistribution,
    lastRewardsCalculation,
  }
}

// -----------------------------

export type UseLastRewardsFeedReturn = {
  lastRewardsDistribution?: RewardsResponse
  lastRewardsCalculation?: RewardsResponse
}

export function useLastRewardsFeed(): UseLastRewardsFeedReturn {
  const [{ account }] = useAppState()

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new StakeManager(account), [account])

  // -----------------------------

  const [rewards, setRewards] = useState<UseLastRewardsFeedReturn>({})

  useEffect(() => {
    let iterator: AsyncIterableIterator<RewardsResponse>

    async function subscribe() {
      iterator = nodeManager.subscribeRewardsFeed()

      for await (const data of iterator) {
        setRewards((prev) => {
          const [lastRewardsDistribution, lastRewardsCalculation] =
            data.type === 'distribution'
              ? [data, prev?.lastRewardsCalculation]
              : [prev?.lastRewardsDistribution, data]

          return {
            lastRewardsDistribution,
            lastRewardsCalculation,
          }
        })
      }
    }

    subscribe()

    return () => {
      if (iterator?.return) iterator?.return()
    }
  }, [nodeManager])

  // -----------------------------

  return rewards
}

// -----------------------------

export type UseAccountRewardsProps = {
  address: string
}

export type UseAccountRewardsReturn = {
  calculatedRewards?: number
  calculatedTimestamp?: number
  distributionTimestamp?: number
}

export function useAccountRewards({
  address,
}: UseAccountRewardsProps): UseAccountRewardsReturn {
  const { lastRewardsCalculation, lastRewardsDistribution } = useLastRewards()
  // const feed = useLastRewardsFeed()

  if (!lastRewardsCalculation) return {}
  if (!lastRewardsDistribution) return {}

  const calculatedRewards =
    lastRewardsCalculation.lastHeight > lastRewardsDistribution?.lastHeight
      ? lastRewardsCalculation?.rewards[address] || 0
      : 0

  const calculatedTimestamp = lastRewardsCalculation.timestamp
  const distributionTimestamp = lastRewardsDistribution.timestamp

  return { calculatedRewards, calculatedTimestamp, distributionTimestamp }
}
