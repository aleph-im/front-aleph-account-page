import { IconName } from '@fortawesome/fontawesome-svg-core'
import { Icon, Logo } from '@aleph-front/aleph-core'
import { StyledLink, StyledNav1, StyledNav2, StyledSidebar } from './styles'
import {
  AnchorHTMLAttributes,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useRouter } from 'next/router'

export type SidebarLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  icon?: IconName
  children?: ReactNode
  isActive?: boolean
}

export const SidebarLink = ({
  href,
  icon,
  isActive,
  children,
}: SidebarLinkProps) => {
  const router = useRouter()
  isActive = isActive || router.pathname.indexOf(href) >= 0

  return (
    <StyledLink href={href} $isActive={isActive} $hasText={!!children}>
      {icon && <Icon name={icon} size="lg" tw="p-1" />}
      {children}
    </StyledLink>
  )
}

export type Route = {
  name?: string
  path: string
  icon?: IconName
  children?: Route[]
}

const routes: Route[] = [
  {
    name: 'EARN',
    path: '/earn',
    icon: 'circle-nodes',
    children: [
      {
        name: 'Staking',
        path: '/earn/staking',
      },
      {
        name: 'Core nodes',
        path: '/earn/ccn',
      },
      {
        name: 'Compute nodes',
        path: '/earn/crn',
      },
    ],
  },
  {
    name: 'PROFILE',
    path: '/profile',
    icon: 'user',
    children: [
      {
        name: 'My profile',
        path: '/profile',
      },
      {
        name: 'Notification center',
        path: '/notification',
      },
    ],
  },
]

export const Sidebar = () => {
  const [open, setOpen] = useState(true)

  const handleToggle = useCallback(() => {
    setOpen((open) => !open)
  }, [setOpen])

  const router = useRouter()

  const currentRoute = useMemo(
    () => routes.find((route) => router.pathname.indexOf(route.path) === 0),
    [router],
  )

  return (
    <StyledSidebar>
      <StyledNav1>
        <Logo
          text=""
          size="1.5rem"
          tw="h-8 mt-8 mb-12"
          onClick={handleToggle}
        />

        {routes.map((child) => (
          <SidebarLink
            key={child.path}
            href={child.path}
            icon={child.icon}
          ></SidebarLink>
        ))}

        <SidebarLink href="/earn/bookmark" icon="bookmark"></SidebarLink>
        <SidebarLink href="/earn/dropbox" icon="dropbox"></SidebarLink>
      </StyledNav1>
      <StyledNav2 $open={open}>
        {currentRoute?.children && (
          <>
            <div className="tp-nav" tw="py-2 px-6 w-full">
              {currentRoute?.name}
            </div>
            {currentRoute?.children.map((child) => (
              <SidebarLink
                key={child.path}
                href={child.path}
                icon={child?.icon || currentRoute?.icon}
              >
                {child.name}
              </SidebarLink>
            ))}
          </>
        )}
      </StyledNav2>
    </StyledSidebar>
  )
}

export default Sidebar
