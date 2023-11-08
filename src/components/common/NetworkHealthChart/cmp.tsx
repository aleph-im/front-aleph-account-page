import { memo, useMemo } from 'react'
import { AlephNode } from '@/domain/node'
import { Cell, Pie, PieChart } from 'recharts'
import { useTheme } from 'styled-components'
import Card1 from '../Card1'
import { TextGradient } from '@aleph-front/aleph-core'
import ColorDot from '../ColorDot'

export const NetworkHealthChart = memo(
  ({ title, nodes }: { title: string; nodes?: AlephNode[] }) => {
    const theme = useTheme()

    const data = useMemo(() => {
      const safeNodes = nodes || []

      const totalNodes = safeNodes.length
      const activeNodes = safeNodes.reduce(
        (ac, node) => ac + Number(node.score >= 0.8),
        0,
      )
      const warningNodes = safeNodes.reduce(
        (ac, node) => ac + Number(node.score >= 0.5 && node.score < 0.8),
        0,
      )
      const errorNodes = safeNodes.reduce(
        (ac, node) => ac + Number(node.score < 0.5),
        0,
      )
      const otherNodes = totalNodes - activeNodes - warningNodes - errorNodes

      return [
        {
          label: 'active nodes',
          value: `${activeNodes} nodes`,
          percentage: activeNodes / totalNodes,
          color: 'main1',
        },
        {
          label: '50% < 80%',
          value: `${warningNodes} nodes`,
          percentage: warningNodes / totalNodes,
          color: 'main2',
        },
        {
          label: '< 50%',
          value: `${errorNodes} nodes`,
          percentage: errorNodes / totalNodes,
          color: 'error',
        },
        {
          label: 'other',
          value: `${otherNodes} nodes`,
          percentage: otherNodes / totalNodes,
          color: 'transparent',
        },
      ]
    }, [nodes])

    const disabledColor = `${theme.color.base0}20`
    const cols = 2
    const reverseData = [...data].reverse()

    return (
      <Card1 loading={!nodes} tw="w-auto min-w-[17.25rem]">
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
            width={100}
            height={100}
            margin={{}}
            tw="my-3 min-h-[6.25rem]"
          >
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
              data={reverseData}
              dataKey="percentage"
              stroke="transparent"
              innerRadius="72%"
              outerRadius="100%"
              startAngle={360 + 90}
              endAngle={0 + 90}
            >
              {reverseData.map((entry) => {
                const fill = theme.color[entry.color] || entry.color
                return <Cell key={entry.label} fill={fill} />
              })}
            </Pie>
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              className="tp-body3 fs-24"
              fill={theme.color.text}
            >
              {nodes?.length || 0}
            </text>
          </PieChart>

          <div tw="mt-1 flex items-stretch justify-between w-full gap-4 z-1">
            {Array.from({ length: cols }).map((_, col) => (
              <div key={col} tw="flex flex-col gap-4">
                {data.slice(col * cols, col * cols + cols).map((entry) => (
                  <div key={entry.label} tw="flex items-center gap-3">
                    <ColorDot
                      $color={
                        entry.color === 'transparent'
                          ? disabledColor
                          : entry.color
                      }
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
            ))}
          </div>
        </div>
      </Card1>
    )
  },
)
NetworkHealthChart.displayName = 'NetworkHealthChart'

export default NetworkHealthChart
