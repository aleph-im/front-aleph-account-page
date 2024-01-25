import { ReactNode, memo } from 'react'
import Link from 'next/link'
import { Icon } from '@aleph-front/core'

export type NodeDetailLinkProps = {
  href?: string
  children?: ReactNode
  isOwner?: boolean
}

export const NodeDetailLink = ({
  href,
  children,
  isOwner,
  ...rest
}: NodeDetailLinkProps) => {
  const content = (
    <span tw="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
      {children || 'NONE'}
    </span>
  )

  return (
    <>
      {href ? (
        <Link
          href={href}
          target="_blank"
          {...rest}
          tw="flex items-center w-full"
        >
          {content}
          {!isOwner && (
            <Icon tw="ml-3 w-3.5 h-3.5" name="external-link-square-alt" />
          )}
        </Link>
      ) : (
        <span tw="flex items-center w-full">{content}</span>
      )}
    </>
  )
}
NodeDetailLink.displayName = 'NodeDetailLink'

export default memo(NodeDetailLink)
