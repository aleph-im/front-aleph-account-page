import { memo, useMemo } from 'react'
import { CCN } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import { Cell, Pie, PieChart } from 'recharts'
import { useTheme } from 'styled-components'
import Card1 from '../Card1/cmp'
import { Logo, TextGradient } from '@aleph-front/aleph-core'
import ColorDot from '../ColorDot'
import { SVGGradients } from '../charts'

export type StakeRewardChartProps = {
  nodes: CCN[]
  stake: number
  rewards?: number
  disabled?: boolean
}

export const StakeRewardChart = memo(
  ({ nodes, stake, rewards, disabled }: StakeRewardChartProps) => {
    const stakeManager = useMemo(() => new StakeManager(), [])

    const theme = useTheme()

    const totalRewards = useMemo(
      () => stakeManager.totalPerAlephPerDay(nodes) * (10 || 0) * stake,
      [nodes, stake, stakeManager],
    )

    const pendingDays = useMemo(() => {
      const userRewards = rewards || 0
      const percent = 1 - userRewards / totalRewards
      const distributionFreq = 10

      return Math.ceil(distributionFreq * percent)
    }, [rewards, totalRewards])

    const data = useMemo(() => {
      const userRewards = rewards || 0
      const pendingRewards = totalRewards - userRewards

      return [
        {
          label: 'Estimated Rewards',
          value: userRewards,
          percentage: userRewards / totalRewards,
          gradient: 'main1',
        },
        {
          label: 'Pending rewards',
          value: pendingRewards,
          percentage: pendingRewards / totalRewards,
          color: 'transparent',
        },
      ]
    }, [totalRewards, rewards])

    return (
      <Card1 tw="w-auto min-w-[154px]" disabled={disabled}>
        <TextGradient
          forwardedAs="h3"
          type="info"
          color={disabled ? 'base0' : 'main0'}
          tw="mb-6"
        >
          STAKING REWARDS
        </TextGradient>

        <div tw="flex flex-col items-center">
          <PieChart data={data} width={100} height={100}>
            <defs>
              <SVGGradients data={data} />
            </defs>
            <Pie
              data={[{ v: 1 }]}
              dataKey="v"
              stroke="transparent"
              innerRadius="72%"
              outerRadius="100%"
              isAnimationActive={true}
              fill={`${theme.color.base0}20`}
            />
            <Pie
              data={data}
              dataKey="percentage"
              stroke="transparent"
              innerRadius="72%"
              outerRadius="100%"
              startAngle={360 + 90}
              endAngle={0 + 90}
            >
              {data.map((entry) => {
                const color = `gr-${entry.gradient}`
                const fill = entry.gradient
                  ? `url(#${color})`
                  : entry.color
                  ? theme.color[entry.color] || entry.color
                  : undefined

                return <Cell key={entry.label} fill={fill} />
              })}
            </Pie>
          </PieChart>

          <div tw="mt-4 flex flex-col gap-4">
            <div tw="flex items-center gap-3">
              <ColorDot $color="main1" $size="1.25rem" />
              <div
                tw="flex flex-col justify-between leading-4! gap-1 not-italic whitespace-nowrap"
                className="tp-body3"
              >
                <div>
                  <div tw="inline-flex gap-1 items-center">
                    {totalRewards.toFixed(2)}
                    <Logo text="" size="0.75rem" />
                  </div>
                </div>
                <div className="fs-10" tw="opacity-60">
                  Est. Rewards
                </div>
              </div>
            </div>
            {pendingDays ? (
              <div className="tp-body1 fs-10" tw="opacity-60 text-center">
                Next payout in {pendingDays} days.
              </div>
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
        </div>
      </Card1>
    )
  },
)
StakeRewardChart.displayName = 'StakeRewardChart'

export default StakeRewardChart
