import { memo } from 'react'
import Image from 'next/image'
import { apiServer } from '@/helpers/constants'
import { Avatar } from '../Avatar'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L117C113-L117C139
export const NameCell = memo(
  ({
    hash,
    name,
    picture,
  }: {
    hash: string
    name: string
    picture?: string
  }) => {
    return (
      <div tw="inline-flex gap-3 items-center">
        {picture ? (
          <Image
            src={`${apiServer}/api/v0/storage/raw/${picture}`}
            alt="Node profile image"
            width={24}
            height={24}
            tw="rounded-full w-6 h-6"
          />
        ) : (
          <Avatar tw="rounded-full h-6 w-6" />
        )}
        <div className="fs-10" tw="leading-4">
          <div tw="whitespace-nowrap">ID: {hash.slice(-10)}</div>
          {name.substring(0, 30)}
        </div>
      </div>
    )
  },
)
NameCell.displayName = 'NameCell'

export default NameCell
