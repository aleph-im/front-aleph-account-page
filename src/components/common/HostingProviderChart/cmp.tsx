import { memo, useMemo } from 'react'
import { TextGradient } from '@aleph-front/aleph-core'
import { AlephNode, CCN } from '@/domain/node'
import Card1 from '../Card1'
import ColorDot from '../ColorDot'

export const HostingProviderChart = ({
  title,
  nodes,
  ...rest
}: {
  title: string
  nodes?: AlephNode[]
}) => {
  const data = useMemo(() => {
    const safeNodes =
      nodes ||
      Array.from(
        { length: 4 },
        (_, i) => ({ metricsData: { as_name: `Provider ${i}` } } as CCN),
      )

    const buckets = safeNodes.reduce(
      (ac, node) => {
        const asnName = node.metricsData?.as_name || 'others'
        ac[asnName] = (ac[asnName] || 0) + 1
        return ac
      },
      { others: 0 } as Record<string, number>,
    )

    const total = Object.values(buckets).reduce((ac, cv) => ac + cv, 0)

    const sortedBuckets = Object.entries(buckets)
      .filter(([name]) => name !== 'others')
      .sort(([, a], [, b]) => b - a)

    const top3Buckets = sortedBuckets.slice(0, 3)
    const restBuckets = sortedBuckets.slice(3)

    const othersBucket: [string, number] = [
      'others',
      buckets['others'] + restBuckets.reduce((ac, [, cv]) => ac + cv, 0),
    ]

    return [...top3Buckets, othersBucket].map(([name, value], i) => {
      const percentage = value / total
      const color =
        name === 'others'
          ? 'main1'
          : i === 0
          ? 'error'
          : i === 1
          ? 'main2'
          : 'main0'

      return {
        label: `${value} nodes (${(percentage * 100).toFixed(0)}%)`,
        value: name,
        percentage,
        color,
      }
    })
  }, [nodes])

  return (
    <Card1 loading={!nodes} {...rest}>
      <TextGradient
        forwardedAs="h3"
        type="info"
        color="main0"
        tw="m-0 min-h-[2rem]"
      >
        {title}
      </TextGradient>

      <div tw="mt-1 flex flex-col gap-4">
        {data.map((entry) => (
          <div key={entry.value} tw="flex items-center gap-3">
            <ColorDot $color={entry.color} $size="1.25rem" />
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
    </Card1>
  )
}
HostingProviderChart.displayName = 'HostingProviderChart'

export default memo(HostingProviderChart)
