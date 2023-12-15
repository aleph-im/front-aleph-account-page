import { memo } from 'react'
import NodeAvatar from '../NodeAvatar'
import { AlephNode } from '@/domain/node'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L117C113-L117C139

export type NodeNameProps = {
  hash: AlephNode['hash']
  name: AlephNode['name']
  picture: AlephNode['picture']
}

export const NodeName = ({ hash, name, picture, ...rest }: NodeNameProps) => {
  return (
    <div tw="inline-flex gap-3 items-center" {...rest}>
      <NodeAvatar picture={picture} size="md" />
      <div className="fs-10" tw="leading-4">
        <div tw="whitespace-nowrap">ID: {hash.slice(-10)}</div>
        {name?.substring(0, 30)}
      </div>
    </div>
  )
}
NodeName.displayName = 'NodeName'

export default memo(NodeName)
