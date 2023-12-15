import { memo, useCallback, useMemo } from 'react'
import { Button } from '@aleph-front/aleph-core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { CCN, CRN, NodeManager } from '@/domain/node'

export type LinkCRNButtonProps = {
  node: CRN
  userNode?: CCN
  account?: Account
  accountBalance?: number
  onLink: (nodeHash: string) => void
  onUnlink: (nodeHash: string) => void
}

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L298
export const LinkCRNButton = ({
  node,
  userNode,
  account,
  onLink,
  onUnlink,
}: LinkCRNButtonProps) => {
  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const isLinkedNode = useMemo(() => {
    return nodeManager.isUserLinked(node, userNode)
  }, [node, nodeManager, userNode])

  const isDisabled = useMemo(() => {
    const [canLink] = nodeManager.isLinkable(node, userNode)
    return !canLink
  }, [nodeManager, node, userNode])

  const handleOnClick = useCallback(() => {
    if (isLinkedNode) {
      onUnlink(node.hash)
    } else {
      onLink(node.hash)
    }
  }, [isLinkedNode, onUnlink, node.hash, onLink])

  return (
    <>
      {!isLinkedNode ? (
        <Button
          kind="neon"
          size="regular"
          variant="secondary"
          color="main0"
          onClick={handleOnClick}
          disabled={isDisabled}
        >
          Link
        </Button>
      ) : (
        <Button
          kind="neon"
          size="regular"
          variant="secondary"
          color="main2"
          onClick={handleOnClick}
        >
          Unlink
        </Button>
      )}
    </>
  )
}
LinkCRNButton.displayName = 'LinkCRNButton'

export default memo(LinkCRNButton)
