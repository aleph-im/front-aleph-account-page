import { memo, useMemo } from 'react'
import { CCN } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import RewardChart from '../RewardChart'

export type CCNRewardChartProps = {
  nodes?: CCN[]
  allNodes?: CCN[]
  rewards?: number
  disabled?: boolean
}

export const CCNRewardChart = memo(
  ({
    nodes,
    allNodes,
    rewards: distributionRewards,
    ...rest
  }: CCNRewardChartProps) => {
    const stakeManager = useMemo(() => new StakeManager(), [])

    const loading = !nodes || !allNodes || distributionRewards === undefined
    const distributionFrequency = 10

    const estimatedTotalRewards = useMemo(() => {
      if (!nodes) return
      if (!allNodes) return

      return nodes.reduce(
        (ac, node) =>
          ac +
          stakeManager.CCNRewardsPerDay(node, allNodes) * distributionFrequency,
        0,
      )
    }, [nodes, allNodes, stakeManager])

    return (
      <RewardChart
        {...{
          title: 'CCN REWARDS',
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
CCNRewardChart.displayName = 'CCNRewardChart'

export default CCNRewardChart
