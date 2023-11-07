import { memo, useMemo } from 'react'
import { AlephNode } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import { Cell, Pie, PieChart } from 'recharts'
import { useTheme } from 'styled-components'
import Card1 from '../Card1/cmp'
import { TextGradient } from '@aleph-front/aleph-core'
import ColorDot from '../ColorDot'
import { SVGGradients } from '../charts'

// https://github.com/aleph-im/aleph-account/blob/main/src/pages/Stake.vue#L19C1-L19C12
export const ActiveNodeChart = memo(
  ({ title, nodes }: { title: string; nodes?: AlephNode[] }) => {
    const stakeManager = useMemo(() => new StakeManager(), [])

    const theme = useTheme()

    const data = useMemo(() => {
      const totalNodes = nodes?.length || 0
      const activeNodes = stakeManager.activeNodes(nodes || []).length
      const nonActiveNodes = totalNodes - activeNodes

      return [
        {
          label: 'Active nodes',
          value: activeNodes,
          percentage: activeNodes / totalNodes,
          gradient: 'main0',
        },
        {
          label: 'Non active',
          value: nonActiveNodes,
          percentage: nonActiveNodes / totalNodes,
          color: 'transparent',
        },
      ]
    }, [nodes, stakeManager])

    const disabledColor = `${theme.color.base0}20`

    return (
      <Card1 loading={!nodes} tw="w-auto min-w-[9.25rem]">
        <TextGradient
          forwardedAs="h3"
          type="info"
          color="main0"
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
              startAngle={360 + 180}
              endAngle={180 + 180}
              isAnimationActive={false}
              fill={disabledColor}
            />
            <Pie
              data={data}
              dataKey="percentage"
              stroke="transparent"
              innerRadius="72%"
              outerRadius="100%"
              startAngle={360 + 180}
              endAngle={180 + 180}
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

          <div tw="mt-1 flex flex-col gap-4 z-1">
            {data.map((entry) => (
              <div key={entry.label} tw="flex items-center gap-3">
                <ColorDot
                  $color={
                    entry.color === 'transparent' ? disabledColor : entry.color
                  }
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
  },
)
ActiveNodeChart.displayName = 'ActiveNodeChart'

export default ActiveNodeChart
