import { useEffect, useMemo, useState } from 'react'
import { useAppState } from '@/contexts/appState'
import { RewardsResponse, StakeManager } from '@/domain/stake'

export type UseLastRewards = {
  lastRewardsDistribution?: RewardsResponse
  lastRewardsCalculation?: RewardsResponse
}

export function useLastRewards(): UseLastRewards {
  const [state] = useAppState()
  const { data: lastRewardsCalculation } = state.lastRewardsCalculation
  const { data: lastRewardsDistribution } = state.lastRewardsDistribution

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
  const [state] = useAppState()
  const { account } = state.account

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
