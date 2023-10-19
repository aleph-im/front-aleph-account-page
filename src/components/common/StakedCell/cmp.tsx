import { memo } from 'react'
import { StyledProgressBar } from './styles'
import { Icon, Tooltip } from '@aleph-front/aleph-core'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L137
export const StakedCell = memo(
  ({
    staked,
    status,
    locked,
  }: {
    staked: number
    status: string

    locked?: boolean
  }) => {
    const minStaked = 500_000
    const percent = Math.min(staked, minStaked) / minStaked
    const amount = Number(staked / 1_000).toFixed(0)

    return (
      <div className="fs-xs" tw="leading-4">
        <div
          tw="flex items-center justify-between gap-1.5 whitespace-nowrap leading-4 mb-2.5"
          className="fs-xs"
        >
          <div>
            {amount}k <span tw="opacity-20">of 500k</span>
          </div>
          <div className="fs-xxs" tw="flex items-center gap-1">
            {status.toUpperCase()}
            {locked && (
              <Tooltip
                my="top-center"
                at="bottom-center"
                content="No staker can join this node."
                header="Staking locked"
              >
                <Icon name="lock" size="xs" />
              </Tooltip>
            )}
          </div>
        </div>
        <div tw="flex items-center gap-1">
          <StyledProgressBar $percent={percent} />
        </div>
      </div>
    )
  },
)
StakedCell.displayName = 'StakedCell'

export default StakedCell
