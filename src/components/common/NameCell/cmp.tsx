import { memo } from 'react'
import Image from 'next/image'
import { Icon, Tooltip } from '@aleph-front/aleph-core'
import { apiServer } from '@/helpers/constants'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L117C113-L117C139
export const NameCell = memo(
  ({
    hash,
    name,
    picture,
    locked,
  }: {
    hash: string
    name: string
    picture?: string
    locked?: boolean
  }) => {
    return (
      <div tw="flex gap-3 items-center">
        {picture ? (
          <Image
            src={`${apiServer}/api/v0/storage/raw/${picture}`}
            alt="Node profile image"
            width={24}
            height={24}
            tw="rounded-full w-6 h-6"
          />
        ) : (
          <Icon name="circle-nodes" size="xl" tw="rounded-full" />
        )}
        <div className="fs-xs" tw="leading-4">
          <div>CCN-ID {hash.slice(-10)}</div>
          <div tw="flex items-center gap-1">
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
            {name.substring(0, 30)}
          </div>
        </div>
      </div>
    )
  },
)
NameCell.displayName = 'NameCell'

export default NameCell
