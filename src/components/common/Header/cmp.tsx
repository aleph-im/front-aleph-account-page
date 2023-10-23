import { Button, Icon, WalletPicker } from '@aleph-front/aleph-core'
import { StyledHeader, StyledButton } from './styles'
import { ellipseAddress } from '@/helpers/utils'
import { useHeader } from '@/hooks/pages/useHeader'
import { breadcrumbNames } from '@/helpers/constants'
import AutoBreadcrumb from '@/components/common/AutoBreadcrumb/cmp'
import { memo } from 'react'
import { createPortal } from 'react-dom'

export const Header = memo(() => {
  const {
    theme,
    account,
    displayWalletPicker,
    accountBalance,
    hasBreadcrumb,
    walletPickerRef,
    walletPickerTriggerRef,
    walletPosition,
    provider,
    handleConnect,
    handleDisplayWalletPicker,
  } = useHeader()

  return (
    <StyledHeader>
      <div>{hasBreadcrumb && <AutoBreadcrumb names={breadcrumbNames} />}</div>
      <div tw="relative flex items-center justify-center gap-7">
        <StyledButton key="link" forwardedAs="button" disabled>
          <Icon name="ethereum" />
        </StyledButton>
        <>
          {account ? (
            <Button
              ref={walletPickerTriggerRef}
              as="button"
              variant="secondary"
              color="main1"
              kind="neon"
              size="regular"
              onClick={handleDisplayWalletPicker}
            >
              {ellipseAddress(account.address)}{' '}
              <Icon
                name="meteor"
                size="lg"
                tw="ml-2.5"
                color={theme.color.main1}
              />
            </Button>
          ) : (
            <Button
              ref={walletPickerTriggerRef}
              as="button"
              variant="tertiary"
              color="main0"
              kind="neon"
              size="regular"
              onClick={handleDisplayWalletPicker}
            >
              Connect{' '}
              <Icon
                name="meteor"
                size="lg"
                tw="ml-2.5"
                color={theme.color.main0}
              />
            </Button>
          )}
          {displayWalletPicker &&
            createPortal(
              <WalletPicker
                ref={walletPickerRef}
                networks={[
                  {
                    icon: 'ethereum',
                    name: 'Ethereum',
                    wallets: [
                      {
                        color: 'orange',
                        icon: 'circle',
                        name: 'Metamask',
                        provider,
                      },
                    ],
                  },
                ]}
                onConnect={handleConnect}
                onDisconnect={handleConnect}
                address={account?.address}
                addressHref={`https://etherscan.io/address/${account?.address}`}
                balance={accountBalance}
                tw="fixed z-20 mt-12 top-0 left-0"
                css={{
                  transform: `translate3d(${walletPosition.x}px, ${walletPosition.y}px, 0)`,
                }}
              />,
              document.body,
            )}
        </>
      </div>
    </StyledHeader>
  )
})
Header.displayName = 'Header'

export default Header
