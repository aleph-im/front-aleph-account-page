import { memo, useMemo } from 'react'
import { CRN } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import { Logo } from '@aleph-front/aleph-core'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L239
export const CRNRewardsCell = memo(({ node }: { node: CRN }) => {
  // @todo: Refactor this (use singleton)
  const rewardManager = new StakeManager()

  const rewards = rewardManager.CRNRewardsPerDay(node)
  const isNotFullyLinked = useMemo(() => !node.parent, [node])

  return (
    <>
      {isNotFullyLinked ? (
        <>-</>
      ) : (
        <div tw="inline-flex gap-2 items-center">
          <div tw="whitespace-nowrap">~ {rewards.toFixed(2)}</div>
          <Logo text="" color="main0" />
        </div>
      )}
    </>
  )
})
CRNRewardsCell.displayName = 'CRNRewardsCell'

export default CRNRewardsCell
