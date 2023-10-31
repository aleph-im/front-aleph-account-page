import { IconName } from '@fortawesome/fontawesome-svg-core'
import { Icon } from '@aleph-front/aleph-core'
import {
  StyledLinkContent,
  StyledLogo,
  StyledNav1,
  StyledNav1Link,
  StyledNav2,
  StyledNav2Link,
  StyledNav2LinkContainer,
  StyledNav2Title,
  StyledSidebar,
} from './styles'
import {
  AnchorHTMLAttributes,
  ReactNode,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useRouter } from 'next/router'

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

export type SidebarLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  icon?: IconName
  children?: ReactNode
  open: boolean
}

export const SidebarLink = memo(
  ({ href, icon, children, open }: SidebarLinkProps) => {
    const router = useRouter()
    const isActive = router.pathname.indexOf(href) >= 0

    const props = { href, $isActive: isActive, $open: open }
    const iconProps = { name: icon as IconName, size: 'lg', tw: 'p-1' }

    return !children ? (
      <StyledNav1Link {...props}>
        <StyledLinkContent {...props}>
          <span>{icon && <Icon {...iconProps} />}</span>
        </StyledLinkContent>
      </StyledNav1Link>
    ) : (
      <StyledNav2Link {...props}>
        <StyledLinkContent {...props}>
          {icon && <Icon {...iconProps} />}
          <span>{children}</span>
        </StyledLinkContent>
      </StyledNav2Link>
    )
  },
)
SidebarLink.displayName = 'SidebarLink'

export const Sidebar = memo(() => {
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
    <StyledSidebar $open={open}>
      <StyledNav1 $open={open}>
        <StyledLogo />

        {routes.map((child) => (
          <SidebarLink
            key={child.path}
            href={child.path}
            icon={child.icon}
            open={open}
          />
        ))}

        <SidebarLink
          href="/earn/bookmark"
          icon="bookmark"
          open={open}
        ></SidebarLink>
        <SidebarLink
          href="/earn/dropbox"
          icon="dropbox"
          open={open}
        ></SidebarLink>
      </StyledNav1>
      <StyledNav2 $open={open}>
        <StyledNav2LinkContainer>
          {currentRoute?.children && (
            <>
              {currentRoute?.name && (
                <StyledNav2Title>
                  <span>{currentRoute?.name}</span>
                </StyledNav2Title>
              )}
              {currentRoute?.children.map((child) => (
                <SidebarLink
                  key={child.path}
                  href={child.path}
                  icon={child?.icon || currentRoute?.icon}
                  open={open}
                >
                  {child.name}
                </SidebarLink>
              ))}
            </>
          )}
        </StyledNav2LinkContainer>
        <div tw="flex-1" onClick={handleToggle} />
        <div></div>
      </StyledNav2>
    </StyledSidebar>
  )
})
Sidebar.displayName = 'Sidebar'

export default Sidebar
