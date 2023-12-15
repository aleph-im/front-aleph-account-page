import Link from 'next/link'
import { Button, ButtonProps } from '@aleph-front/aleph-core'
import { ButtonLinkProps } from './types'
import { memo } from 'react'

/**
 * A wrapper for the nextjs links that are styled as buttons
 * https://stackoverflow.com/questions/49288987/styled-components-with-components-in-nextjs/49306326#49306326
 */
export const ButtonLink = ({
  href,
  variant,
  color,
  kind,
  size,
  children,
}: ButtonLinkProps &
  Partial<Pick<ButtonProps, 'variant' | 'color' | 'kind' | 'size'>>) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <Button
        as="a"
        variant={variant || 'secondary'}
        color={color || 'main0'}
        kind={kind || 'neon'}
        size={size || 'regular'}
      >
        {children}
      </Button>
    </Link>
  )
}

export default memo(ButtonLink)
