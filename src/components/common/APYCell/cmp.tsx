import { memo, useMemo } from 'react'
import { StyledAPYIcon } from './styles'
import { CCN } from '@/domain/node'
import { RewardManager } from '@/domain/reward'
import { Tooltip } from '@aleph-front/aleph-core'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L586
export const APYCell = memo(({ node, nodes }: { node: CCN; nodes: CCN[] }) => {
  const apyManager = new RewardManager({} as any)

  const nodeAPY = apyManager.computeEstimatedStakersAPY(node, nodes)
  const currentAPY = apyManager.currentAPY(nodes)
  const performance = nodeAPY / currentAPY

  const isNotFullyLinked = useMemo(
    () => node.crnsData.length < 3 || node.crnsData.find((f) => f.score < 0.2),
    [node],
  )

  const data = (
    <div tw="flex gap-3 items-center">
      <StyledAPYIcon $performance={performance} />
      {Number(nodeAPY * 100).toFixed(2)}%
    </div>
  )

  return (
    <>
      {isNotFullyLinked ? (
        <Tooltip
          my="top-center"
          at="bottom-center"
          content={
            <div className="fs-sm">
              <div>
                <div>{3 - node.crnsData.length} missing CRN</div>
                <div className="fs-xs">
                  Link 3 functioning CRN to that Node to maximise its rewards
                </div>
              </div>
              <div>Performance: {Number(performance * 100).toFixed(2)}%</div>
            </div>
          }
          header="Staking performance"
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
