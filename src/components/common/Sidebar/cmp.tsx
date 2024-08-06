import { AnchorHTMLAttributes, ReactNode, memo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { IconName, LinkComponent, RouterSidebar } from '@aleph-front/core'
import { useRoutes } from '@/hooks/common/useRoutes'

export type SidebarLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  icon?: IconName
  flag?: number
  isOpen?: boolean
  children?: ReactNode
}

const Sidebar = memo(() => {
  const { routes } = useRoutes()
  const { pathname } = useRouter()
  const [open, setOpen] = useState<boolean>()

  // --------------------------------------------
  const breakpoint = 'lg'

  return (
    <RouterSidebar
      breakpoint={breakpoint}
      routes={routes}
      pathname={pathname}
      Link={Link as LinkComponent}
      open={open}
      onToggle={setOpen}
    />
  )
})
Sidebar.displayName = 'Sidebar'

export default Sidebar
