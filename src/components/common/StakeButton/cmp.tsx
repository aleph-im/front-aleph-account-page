import { memo, useCallback, useMemo } from 'react'
import { Button } from '@aleph-front/aleph-core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { CCN, NodeManager } from '@/domain/node'

export type StakeButtonProps = {
  node: CCN
  account?: Account
  accountBalance?: number
  onStake: (nodeHash: string) => void
  onUnStake: (nodeHash: string) => void
}

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L137
export const StakeButton = memo(
  ({
    node,
    account,
    accountBalance = 0,
    onStake,
    onUnStake,
  }: StakeButtonProps) => {
    // @todo: Refactor this (use singleton)
    const nodeManager = useMemo(() => new NodeManager(account), [account])

    const isStakeNode = useMemo(() => {
      if (!account) return false
      return !!node.stakers[account.address]
    }, [account, node])

    const isDisabled = useMemo(() => {
      const [canStake] = nodeManager.isStakeable(node, accountBalance)
      return !canStake
    }, [nodeManager, node, accountBalance])

    const handleOnClick = useCallback(() => {
      if (isStakeNode) {
        onUnStake(node.hash)
      } else {
        onStake(node.hash)
      }
    }, [isStakeNode, onUnStake, node.hash, onStake])

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
            UnStake
          </Button>
        )}
      </>
    )
  },
)
StakeButton.displayName = 'StakeButton'

export default StakeButton
