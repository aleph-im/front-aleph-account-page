import { memo, useMemo } from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import { useTheme } from 'styled-components'
import { Logo, TextGradient } from '@aleph-front/aleph-core'
import Card1 from '../Card1'
import ColorDot from '../ColorDot'
import { SVGGradients } from '../charts'

export type RewardChartProps = {
  title: string
  estimatedTotalRewards?: number
  distributionRewards?: number
  distributionFrequency: number
  disabled?: boolean
  loading?: boolean
}

export const RewardChart = memo(
  ({
    title,
    estimatedTotalRewards,
    distributionRewards,
    distributionFrequency,
    disabled,
    loading,
    ...rest
  }: RewardChartProps) => {
    const theme = useTheme()

    const pendingDays = useMemo(() => {
      if (distributionRewards === undefined) return distributionFrequency
      if (estimatedTotalRewards === undefined) return distributionFrequency

      const userRewards = distributionRewards
      const percent = Math.max(1 - userRewards / estimatedTotalRewards, 0)

      if (Number.isNaN(percent)) return distributionFrequency

      return Math.ceil(distributionFrequency * percent)
    }, [distributionFrequency, distributionRewards, estimatedTotalRewards])

    const data = useMemo(() => {
      if (distributionRewards === undefined) return []
      if (estimatedTotalRewards === undefined) return []

      const userRewards = distributionRewards
      const pendingRewards = estimatedTotalRewards - userRewards

      return [
        {
          label: 'Estimated Rewards',
          value: userRewards,
          percentage: userRewards / estimatedTotalRewards,
          gradient: 'main1',
        },
        {
          label: 'Pending rewards',
          value: pendingRewards,
          percentage: pendingRewards / estimatedTotalRewards,
          color: 'transparent',
        },
      ]
    }, [estimatedTotalRewards, distributionRewards])

    return (
      <Card1
        tw="w-auto min-w-[9.625rem]"
        disabled={disabled}
        loading={loading}
        {...rest}
      >
        <TextGradient
          forwardedAs="h3"
          type="info"
          color={disabled ? 'base0' : 'main0'}
          tw="m-0 min-h-[2rem]"
        >
          {title}
        </TextGradient>

        <div tw="flex flex-col items-center">
          <PieChart
            data={data}
            width={100}
            height={100}
            margin={{}}
            tw="my-3 min-h-[6.25rem]"
          >
            <defs>
              <SVGGradients data={data} />
            </defs>
            <Pie
              data={[{ v: 1 }]}
              dataKey="v"
              stroke="transparent"
              innerRadius="72%"
              outerRadius="100%"
              startAngle={360 + 90}
              endAngle={0 + 90}
              isAnimationActive={false}
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

          <div tw="mt-1 flex flex-col gap-4">
            <div tw="flex items-center gap-3">
              <ColorDot $color="main1" $size="1.25rem" />
              <div
                tw="flex flex-col justify-between leading-4! gap-1 not-italic whitespace-nowrap"
                className="tp-body3"
              >
                <div>
                  <div tw="inline-flex gap-1 items-center">
                    {(distributionRewards || 0).toFixed(2)}
                    <Logo text="" size="0.75rem" />
                  </div>
                </div>
                <div className="fs-10" tw="opacity-60">
                  Est. Rewards
                </div>
              </div>
            </div>
            <div
              className="tp-body1 fs-10"
              tw="opacity-60 text-center whitespace-nowrap"
            >
              Next payout in {pendingDays} days.
            </div>
          </div>
        </div>
      </Card1>
    )
  },
)
RewardChart.displayName = 'RewardChart'

export default RewardChart
