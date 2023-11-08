import { memo, useMemo } from 'react'
import { CRN } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import RewardChart from '../RewardChart'

export type CRNRewardChartProps = {
  nodes?: CRN[]
  rewards?: number
  disabled?: boolean
}

export const CRNRewardChart = memo(
  ({ nodes, rewards: distributionRewards, ...rest }: CRNRewardChartProps) => {
    const stakeManager = useMemo(() => new StakeManager(), [])

    const loading = !nodes || distributionRewards === undefined
    const distributionFrequency = 10

    const estimatedTotalRewards = useMemo(() => {
      if (!nodes) return

      return nodes.reduce(
        (ac, node) =>
          ac + stakeManager.CRNRewardsPerDay(node) * distributionFrequency,
        0,
      )
    }, [nodes, stakeManager])

    return (
      <RewardChart
        {...{
          title: 'CRN REWARDS',
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
CRNRewardChart.displayName = 'CRNRewardChart'

export default CRNRewardChart
