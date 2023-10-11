import { useRouter } from 'next/router'
import { useCallback, useState, useEffect, useRef, RefObject } from 'react'
import { DefaultTheme, useTheme } from 'styled-components'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { useAppState } from '@/contexts/appState'
import { useConnect } from '../common/useConnect'
import { useSessionStorage } from 'usehooks-ts'
import { useClickOutside } from '@aleph-front/aleph-core'

export type UseHeaderReturn = {
  theme: DefaultTheme
  account: Account | undefined
  displayWalletPicker: boolean
  accountBalance?: number
  hasBreadcrumb: boolean
  divRef: RefObject<HTMLDivElement>
  handleConnect: () => void
  handleDisplayWalletPicker: () => void
  provider: () => void
}

export function useHeader(): UseHeaderReturn {
  const { connect, disconnect, isConnected, account } = useConnect()
  const theme = useTheme()
  const [appState] = useAppState()
  const router = useRouter()

  const [keepAccountAlive, setkeepAccountAlive] = useSessionStorage(
    'keepAccountAlive',
    false,
  )

  useEffect(() => {
    ;(async () => {
      if (!account && keepAccountAlive) {
        enableConnection()
      }
    })()
  }, [account, keepAccountAlive])

  const { accountBalance } = appState

  // @note: wait till account is connected and redirect
  const handleConnect = useCallback(async () => {
    if (!isConnected) {
      setkeepAccountAlive(true)
      const acc = await connect()
      if (!acc) return
      router.push('/dashboard')
    } else {
      setkeepAccountAlive(false)
      await disconnect()
      router.push('/')
    }

    setDisplayWalletPicker(false)
  }, [connect, disconnect, isConnected, router])

  const enableConnection = useCallback(async () => {
    if (!isConnected) {
      const acc = await connect()
      if (!acc) return
    } else {
      await disconnect()
    }
  }, [connect, disconnect, isConnected, account])

  const [displayWalletPicker, setDisplayWalletPicker] = useState(false)

  // --------------------

  const divRef = useRef<HTMLDivElement>(null)

  useClickOutside(() => {
    if (displayWalletPicker) setDisplayWalletPicker(false)
  }, [divRef])

  const handleDisplayWalletPicker = () => {
    setDisplayWalletPicker(!displayWalletPicker)
  }

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

  const hasBreadcrumb = router.pathname !== '/dashboard/manage'

  return {
    theme,
    account,
    displayWalletPicker,
    accountBalance,
    hasBreadcrumb,
    divRef,
    handleConnect,
    handleDisplayWalletPicker,
    provider,
  }
}
