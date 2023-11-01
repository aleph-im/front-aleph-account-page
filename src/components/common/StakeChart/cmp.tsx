import { memo, useMemo } from 'react'
import { CCN } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import { Cell, Pie, PieChart } from 'recharts'
import { useTheme } from 'styled-components'
import Card1 from '../Card1/cmp'
import { TextGradient } from '@aleph-front/aleph-core'
import ColorDot from '../ColorDot'
import { SVGGradients } from '../charts'

// https://github.com/aleph-im/aleph-account/blob/main/src/pages/Stake.vue#L45
export const StakeChart = memo(({ nodes }: { nodes: CCN[] }) => {
  const stakeManager = useMemo(() => new StakeManager(), [])

  const theme = useTheme()

  const data = useMemo(() => {
    const operatorsStake = stakeManager.totalStakedByOperators(nodes)
    const totalStake = stakeManager.totalStaked(nodes)
    const usersStake = totalStake - operatorsStake

    return [
      {
        label: 'Stakers',
        value: `${(usersStake / 10 ** 6).toFixed(2)}M`,
        percentage: usersStake / totalStake,
        gradient: 'main0',
      },
      {
        label: 'Node operators',
        value: `${(usersStake / 10 ** 6).toFixed(2)}M`,
        percentage: operatorsStake / totalStake,
        color: 'main1',
      },
    ]
  }, [nodes, stakeManager])

  return (
    <Card1 tw="w-auto min-w-[152px]">
      <TextGradient forwardedAs="h3" type="info" color="main0" tw="mb-6">
        STAKED
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

        <div tw="mt-4 flex flex-col gap-4">
          {data.map((entry) => (
            <div key={entry.label} tw="flex items-center gap-3">
              <ColorDot
                $color={entry.color}
                $gradient={entry.gradient}
                $size="1.25rem"
              />
              <div
                tw="flex flex-col justify-between leading-4! gap-1 not-italic whitespace-nowrap"
                className="tp-body3"
              >
                <div>{entry.value}</div>
                <div className="fs-10" tw="opacity-60">
                  {entry.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card1>
  )
})
StakeChart.displayName = 'StakeChart'

export default StakeChart
