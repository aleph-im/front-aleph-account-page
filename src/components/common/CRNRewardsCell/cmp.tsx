import { memo, useMemo } from 'react'
import { CRN } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import { Logo, Tooltip } from '@aleph-front/aleph-core'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L239
export const CRNRewardsCell = memo(({ node }: { node: CRN }) => {
  // @todo: Refactor this (use singleton)
  const rewardManager = new StakeManager()

  const rewards = rewardManager.computeCRNRewards(node)
  const isNotFullyLinked = useMemo(() => !node.parent, [node])

  return (
    <>
      {isNotFullyLinked ? (
        <Tooltip
          my="top-center"
          at="bottom-center"
          content={<div className="fs-sm">Unlinked CRN do not get rewards</div>}
          header="Staking performance"
        >
          No rewards
        </Tooltip>
      ) : (
        <div tw="flex gap-2 items-center">
          <div tw="whitespace-nowrap">~ {rewards.toFixed(2)}</div>
          <Logo text="" color="main0" />
        </div>
      )}
    </>
  )
})
CRNRewardsCell.displayName = 'CRNRewardsCell'

export default CRNRewardsCell
