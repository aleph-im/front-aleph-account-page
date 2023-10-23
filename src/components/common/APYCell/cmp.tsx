import { memo, useMemo } from 'react'
import { StyledAPYIcon } from './styles'
import { CCN } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import { Tooltip } from '@aleph-front/aleph-core'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L586
export const APYCell = memo(({ node, nodes }: { node: CCN; nodes: CCN[] }) => {
  // @todo: Refactor this (use singleton)
  const rewardManager = new StakeManager()

  const nodeAPY = rewardManager.computeEstimatedStakersAPY(node, nodes)
  const currentAPY = rewardManager.currentAPY(nodes)
  const performance = nodeAPY / currentAPY

  const isNotFullyLinked = useMemo(() => node.crnsData.length < 3, [node])

  const badScoredLinkedNodes = useMemo(
    () => node.crnsData.filter((f) => f.score < 0.2).length,
    [node],
  )

  const showTooltip = isNotFullyLinked || !!badScoredLinkedNodes

  const data = (
    <div tw="flex gap-3 items-center">
      <StyledAPYIcon $performance={performance} />
      {Number(nodeAPY * 100).toFixed(2)}%
    </div>
  )

  return (
    <>
      {showTooltip ? (
        <Tooltip
          my="top-center"
          at="bottom-center"
          offset={{ x: 0, y: 10 }}
          header="Staking performance"
          content={
            <div className="fs-16" tw="flex flex-col gap-4 mt-4">
              {isNotFullyLinked && (
                <div>
                  <div tw="font-bold leading-4">
                    {3 - node.crnsData.length} missing CRNs
                  </div>
                  <div className="fs-10">
                    Link 3 functioning CRN to that node to maximise its rewards
                  </div>
                </div>
              )}
              {!badScoredLinkedNodes && (
                <div>
                  <div tw="font-bold leading-4">
                    {badScoredLinkedNodes} bad scored CRNs
                  </div>
                  <div className="fs-10">
                    Improve the score of your linked CRNs to maximise its
                    rewards
                  </div>
                </div>
              )}
            </div>
          }
        >
          {data}
        </Tooltip>
      ) : (
        data
      )}
    </>
  )
})
APYCell.displayName = 'APYCell'

export default APYCell
