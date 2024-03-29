import { memo } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Button, Icon, RenderLinkProps } from '@aleph-front/core'
import {
  StyledNavbarDesktop,
  StyledWalletPicker,
  StyledNavbarMobile,
  StyledHeader,
} from './styles'
import { ellipseAddress } from '@/helpers/utils'
import {
  UseAccountButtonProps,
  useAccountButton,
  useHeader,
} from '@/hooks/pages/useHeader'
import AutoBreadcrumb from '@/components/common/AutoBreadcrumb'

export type AccountButtonProps = UseAccountButtonProps & {
  isMobile?: boolean
}

export const AccountButton = ({ isMobile, ...rest }: AccountButtonProps) => {
  const {
    theme,
    account,
    accountBalance,
    displayWalletPicker,
    walletPickerOpen,
    walletPickerRef,
    walletPickerTriggerRef,
    walletPosition,
    rewards,
    selectedNetwork,
    networks,
    handleSwitchNetwork,
    handleConnect,
    handleDisplayWalletPicker,
  } = useAccountButton(rest)

  return (
    <>
      {account ? (
        <Button
          ref={walletPickerTriggerRef}
          as="button"
          variant="secondary"
          color="main1"
          kind="neon"
          size="md"
          onClick={handleDisplayWalletPicker}
        >
          <div tw="flex items-center gap-2.5">
            {!isMobile && ellipseAddress(account.address)}
            <Icon name="meteor" size="lg" color={theme.color.main1} />
          </div>
        </Button>
      ) : (
        <Button
          ref={walletPickerTriggerRef}
          as="button"
          variant="tertiary"
          color="main0"
          kind="neon"
          size="md"
          onClick={handleDisplayWalletPicker}
        >
          <div tw="flex items-center gap-2.5">
            {!isMobile && 'Connect'}
            <Icon name="meteor" size="lg" color={theme.color.main0} />
          </div>
        </Button>
      )}
      {displayWalletPicker &&
        createPortal(
          <StyledWalletPicker
            ref={walletPickerRef}
            networks={networks}
            rewards={rewards}
            selectedNetwork={selectedNetwork}
            onSwitchNetwork={handleSwitchNetwork}
            onConnect={handleConnect}
            onDisconnect={handleConnect}
            address={account?.address}
            addressHref={`https://etherscan.io/address/${account?.address}`}
            balance={accountBalance}
            $isOpen={walletPickerOpen}
            $position={walletPosition}
          />,
          document.body,
        )}
    </>
  )
}
AccountButton.displayName = 'AccountButton'

// ----------------------------

const CustomLink = (props: RenderLinkProps) => {
  return props.route.children ? <span {...props} /> : <Link {...props} />
}

// ----------------------------

export const Header = () => {
  const {
    pathname,
    routes,
    breadcrumbNames,
    isOpen,
    breakpoint,
    handleToggle,
    ...accountProps
  } = useHeader()

  return (
    <>
      <StyledHeader $breakpoint={breakpoint}>
        <StyledNavbarMobile
          {...{
            routes,
            pathname,
            open: isOpen,
            onToggle: handleToggle,
            Link: CustomLinkMemo,
            height: '6.5rem',
            breakpoint: 'lg',
            mobileTopContent: <AccountButtonMemo {...accountProps} isMobile />,
          }}
        />
        <StyledNavbarDesktop $breakpoint={breakpoint}>
          <AutoBreadcrumb names={breadcrumbNames} />
          <AccountButtonMemo {...accountProps} />
        </StyledNavbarDesktop>
      </StyledHeader>
      <div tw="block flex-auto grow-0 shrink-0 h-[6.5rem] lg:hidden"></div>
      <div tw="block lg:hidden my-6 px-5 md:px-16">
        <AutoBreadcrumb names={breadcrumbNames} />
      </div>
    </>
  )
}
Header.displayName = 'Header'

export const CustomLinkMemo = memo(CustomLink)
export const AccountButtonMemo = memo(AccountButton)
export default memo(Header)
