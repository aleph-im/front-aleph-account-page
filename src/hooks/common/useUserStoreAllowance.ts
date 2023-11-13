import { useCallback, useMemo } from 'react'
import { useAppState } from '@/contexts/appState'
import { FileManager } from '@/domain/file'
import { mbPerAleph } from '@/helpers/constants'
import { useLocalRequest } from '@aleph-front/aleph-core'

export type UseUserStoreAllowanceReturn = {
  consumedSize?: number
  allowedSize?: number
}

export function useUserStoreAllowance(): UseUserStoreAllowanceReturn {
  const [state] = useAppState()
  const { account, balance: accountBalance = 0 } = state.account

  // @todo: Refactor this (use singleton)
  const manager = useMemo(() => new FileManager(account), [account])

  // -----------------------------

  const doRequest = useCallback(() => manager.getFiles(), [manager])

  const { data: fileInfo } = useLocalRequest({
    doRequest,
    onSuccess: () => null,
    triggerOnMount: true,
    triggerDeps: [manager],
    flushData: false,
  })

  const consumedSize = fileInfo?.totalSize
  const allowedSize = accountBalance ? accountBalance * mbPerAleph : undefined

  // -----------------------------

  return {
    consumedSize,
    allowedSize,
  }
}
