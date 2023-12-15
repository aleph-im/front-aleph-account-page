import { memo, useMemo } from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import { useTheme } from 'styled-components'
import { Logo, TextGradient } from '@aleph-front/aleph-core'
import Card1 from '../Card1'
import ColorDot from '../ColorDot'
import { SVGGradients } from '../charts'

export type RewardChartProps = {
  title: string
  calculatedRewards?: number
  distributionTimestamp?: number
  distributionInterval?: number
  disabled?: boolean
}

export const RewardChart = ({
  title,
  calculatedRewards,
  distributionTimestamp,
  distributionInterval = 10 * 24 * 60 * 60 * 1000, // 10 days
  disabled,
  ...rest
}: RewardChartProps) => {
  const theme = useTheme()

  const loading =
    calculatedRewards === undefined || distributionTimestamp === undefined

  const pendingTime = useMemo(() => {
    if (distributionTimestamp === undefined) return distributionInterval

    const elapsedFromLast = Date.now() - distributionTimestamp
    const timeTillNext = distributionInterval - elapsedFromLast

    return Math.max(Math.ceil(timeTillNext), 0)
  }, [distributionTimestamp, distributionInterval])

  const pendingDays = useMemo(
    () => Math.ceil(pendingTime / (1000 * 60 * 60 * 24)),
    [pendingTime],
  )

  const data = useMemo(() => {
    if (calculatedRewards === undefined) return []

    const elapsedTime = distributionInterval - pendingTime
    const elapsedTimeRatio = elapsedTime / distributionInterval
    const pendingRewards = calculatedRewards * elapsedTimeRatio

    return [
      {
        label: 'Estimated Rewards',
        value: calculatedRewards,
        percentage: disabled ? 0 : elapsedTime / distributionInterval,
        gradient: 'main1',
      },
      {
        label: 'Pending rewards',
        value: pendingRewards,
        percentage: disabled
          ? 0
          : calculatedRewards && pendingTime / distributionInterval,
        color: 'transparent',
      },
    ]
  }, [disabled, calculatedRewards, distributionInterval, pendingTime])

  const disabledColor = `${theme.color.base0}20`

  return (
    <Card1 disabled={disabled} loading={loading} {...rest}>
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
            fill={disabledColor}
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
              const color = disabled ? disabledColor : `gr-${entry.gradient}`

              const fill = disabled
                ? disabledColor
                : entry.gradient
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
            <ColorDot
              $color={disabled ? disabledColor : 'main1'}
              $size="1.25rem"
            />
            <div
              tw="flex flex-col justify-between leading-4! gap-1 not-italic whitespace-nowrap"
              className="tp-body3"
            >
              <div>
                <div tw="inline-flex gap-1 items-center">
                  {(calculatedRewards || 0).toFixed(2)}
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
}
RewardChart.displayName = 'RewardChart'

export default memo(RewardChart)
