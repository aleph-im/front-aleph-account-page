import { memo, useMemo } from 'react'
import { CCN } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import RewardChart from '../RewardChart'

export type StakeRewardChartProps = {
  nodes?: CCN[]
  rewards?: number
  stake: number
  disabled?: boolean
}

export const StakeRewardChart = memo(
  ({
    nodes,
    rewards: distributionRewards,
    stake,
    ...rest
  }: StakeRewardChartProps) => {
    const stakeManager = useMemo(() => new StakeManager(), [])

    const loading = !nodes || distributionRewards === undefined
    const distributionFrequency = 10

    const estimatedTotalRewards = useMemo(() => {
      if (!nodes) return

      return (
        stakeManager.stakingRewardsPerDay(stake, nodes) * distributionFrequency
      )
    }, [nodes, stake, stakeManager])

    return (
      <RewardChart
        {...{
          title: 'STAKING REWARDS',
          estimatedTotalRewards,
          distributionRewards,
          distributionFrequency,
          loading,
          ...rest,
        }}
      />
    )
  },
)
StakeRewardChart.displayName = 'StakeRewardChart'

export default StakeRewardChart
