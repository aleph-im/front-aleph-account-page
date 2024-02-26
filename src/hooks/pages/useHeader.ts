import { useRouter } from 'next/router'
import {
  useCallback,
  useState,
  useEffect,
  useRef,
  RefObject,
  useMemo,
} from 'react'
import { DefaultTheme, useTheme } from 'styled-components'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { useAppState } from '@/contexts/appState'
import { useConnect } from '../common/useConnect'
import { useSessionStorage } from 'usehooks-ts'
import {
  BreakpointId,
  useClickOutside,
  useFloatPosition,
  useTransition,
  useWindowScroll,
  useWindowSize,
  WalletPickerProps,
} from '@aleph-front/core'
import {
  UseBreadcrumbNamesReturn,
  useBreadcrumbNames,
} from '../common/useBreadcrumbNames'
import { UseRoutesReturn, useRoutes } from '../common/useRoutes'
import { useAccountRewards } from '../common/useRewards'

export type UseAccountButtonProps = {
  rewards?: WalletPickerProps['rewards']
  handleConnect: () => Promise<void>
  provider: () => void
}

export type UseAccountButtonReturn = UseAccountButtonProps & {
  theme: DefaultTheme
  account: Account | undefined
  accountBalance?: number
  displayWalletPicker: boolean
  walletPickerOpen: boolean
  walletPickerRef: RefObject<HTMLDivElement>
  walletPickerTriggerRef: RefObject<HTMLButtonElement>
  walletPosition: { x: number; y: number }
  handleDisplayWalletPicker: () => void
}

export function useAccountButton({
  handleConnect: handleConnectProp,
  ...rest
}: UseAccountButtonProps): UseAccountButtonReturn {
  const { account } = useConnect()
  const theme = useTheme()
  const [appState] = useAppState()

  const { balance: accountBalance } = appState.account

  const [displayWalletPicker, setDisplayWalletPicker] = useState(false)

  // --------------------

  const walletPickerRef = useRef<HTMLDivElement>(null)
  const walletPickerTriggerRef = useRef<HTMLButtonElement>(null)

  useClickOutside(() => {
    if (displayWalletPicker) setDisplayWalletPicker(false)
  }, [walletPickerRef, walletPickerTriggerRef])

  const handleDisplayWalletPicker = () => {
    setDisplayWalletPicker(!displayWalletPicker)
  }

  const windowSize = useWindowSize(0)
  const windowScroll = useWindowScroll(0)

  const { shouldMount, stage } = useTransition(displayWalletPicker, 250)

  const { myRef, atRef, position } = useFloatPosition({
    my: 'top-right',
    at: 'bottom-right',
    myRef: walletPickerRef,
    atRef: walletPickerTriggerRef,
    deps: [account, windowSize, windowScroll, shouldMount],
  })

  const walletPickerOpen = stage === 'enter'

  const handleConnect = useCallback(async () => {
    handleConnectProp()
    setDisplayWalletPicker(false)
  }, [handleConnectProp])

  return {
    theme,
    account,
    accountBalance,
    walletPickerOpen,
    displayWalletPicker: shouldMount,
    walletPickerRef: myRef,
    walletPickerTriggerRef: atRef,
    walletPosition: position,
    handleDisplayWalletPicker,
    handleConnect,
    ...rest,
  }
}

// -----------------------------

export type UseHeaderReturn = UseRoutesReturn & {
  pathname: string
  breadcrumbNames: UseBreadcrumbNamesReturn['names']
  breakpoint: BreakpointId
  isOpen: boolean
  rewards?: WalletPickerProps['rewards']
  handleToggle: (isOpen: boolean) => void
  handleConnect: () => Promise<void>
  provider: () => void
}

export function useHeader(): UseHeaderReturn {
  const { connect, disconnect, isConnected, account } = useConnect()
  const { routes } = useRoutes()
  const router = useRouter()
  const { pathname } = router

  const [keepAccountAlive, setkeepAccountAlive] = useSessionStorage(
    'keepAccountAlive',
    false,
  )

  const enableConnection = useCallback(async () => {
    if (!isConnected) {
      const acc = await connect()
      if (!acc) return
    } else {
      await disconnect()
    }
  }, [connect, disconnect, isConnected])

  // @note: wait till account is connected and redirect
  const handleConnect = useCallback(async () => {
    if (!isConnected) {
      setkeepAccountAlive(true)
      const acc = await connect()
      if (!acc) return
      // router.push('/dashboard')
    } else {
      setkeepAccountAlive(false)
      await disconnect()
      router.push('/')
    }
  }, [connect, disconnect, isConnected, router, setkeepAccountAlive])

  useEffect(() => {
    ;(async () => {
      if (!account && keepAccountAlive) {
        enableConnection()
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, keepAccountAlive])

  // --------------------

  const provider = () => {
    window.ethereum?.on('accountsChanged', function () {
      connect()
    })

    return window.ethereum
  }

  // @todo: handle this on the provider method of the WalletConnect component
  // the provider function should initialize the provider and return a dispose function
  useEffect(() => {
    provider()
    return () => {
      window.ethereum?.removeListener('accountsChanged', () => {
        connect()
      })
    }
  }, [])

  // --------------------

  const { names: breadcrumbNames } = useBreadcrumbNames()

  // --------------------

  const breakpoint = 'lg'

  // --------------------

  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = useCallback((open: boolean) => setIsOpen(open), [])

  // -----------------------

  const {
    calculatedRewards: userRewards,
    distributionTimestamp: lastDistribution,
  } = useAccountRewards({
    address: account?.address || '',
  })

  const distributionInterval = 10 * 24 * 60 * 60 * 1000 // 10 days

  const pendingDays = useMemo(() => {
    if (lastDistribution === undefined) return distributionInterval

    const elapsedFromLast = Date.now() - lastDistribution
    const timeTillNext = distributionInterval - elapsedFromLast

    const pendingTime = Math.max(Math.ceil(timeTillNext), 0)
    const pendingDays = Math.ceil(pendingTime / (1000 * 60 * 60 * 24))

    return pendingDays
  }, [lastDistribution, distributionInterval])

  const rewards = useMemo(() => {
    if (!userRewards) return

    return {
      amount: userRewards,
      days: pendingDays,
    }
  }, [pendingDays, userRewards])

  return {
    pathname,
    routes,
    breadcrumbNames,
    breakpoint,
    isOpen,
    rewards,
    handleToggle,
    handleConnect,
    provider,
  }
}
