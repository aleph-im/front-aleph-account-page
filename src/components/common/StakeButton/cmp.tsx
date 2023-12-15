import { memo, useCallback, useMemo } from 'react'
import { Button } from '@aleph-front/aleph-core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { CCN, NodeManager } from '@/domain/node'

export type StakeButtonProps = {
  node: CCN
  account?: Account
  accountBalance?: number
  onStake: (nodeHash: string) => void
  onUnstake: (nodeHash: string) => void
}

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L137
export const StakeButton = ({
  node,
  account,
  accountBalance = 0,
  onStake,
  onUnstake: onUnstake,
}: StakeButtonProps) => {
  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const isStakeNode = useMemo(() => {
    return nodeManager.isUserStake(node)
  }, [node, nodeManager])

  const isDisabled = useMemo(() => {
    const [canStake] = nodeManager.isStakeable(node, accountBalance)
    return !canStake
  }, [nodeManager, node, accountBalance])

  const handleOnClick = useCallback(() => {
    if (isStakeNode) {
      onUnstake(node.hash)
    } else {
      onStake(node.hash)
    }
  }, [isStakeNode, onUnstake, node.hash, onStake])

  return (
    <>
      {!isStakeNode ? (
        <Button
          kind="neon"
          size="regular"
          variant="secondary"
          color="main0"
          onClick={handleOnClick}
          disabled={isDisabled}
        >
          Stake
        </Button>
      ) : (
        <Button
          kind="neon"
          size="regular"
          variant="secondary"
          color="main2"
          onClick={handleOnClick}
        >
          Unstake
        </Button>
      )}
    </>
  )
}
StakeButton.displayName = 'StakeButton'

export default memo(StakeButton)
