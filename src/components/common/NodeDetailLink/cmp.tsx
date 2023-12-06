import { ReactNode, memo } from 'react'
import Link from 'next/link'
import { Icon } from '@aleph-front/aleph-core'

export type NodeDetailLinkProps = {
  href?: string
  children?: ReactNode
  isOwner?: boolean
}

export const NodeDetailLink = memo(
  ({ href, children, isOwner, ...rest }: NodeDetailLinkProps) => {
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
            {!isOwner && <Icon tw="ml-2" name="external-link-square-alt" />}
          </Link>
        ) : (
          <span tw="flex items-center w-full">{content}</span>
        )}
      </>
    )
  },
)
NodeDetailLink.displayName = 'NodeDetailLink'

export default NodeDetailLink
