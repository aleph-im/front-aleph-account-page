import { useCallback, useMemo } from 'react'
import { useAppState } from '@/contexts/appState'
import { FileManager } from '@/domain/file'
import { useRequest } from '@/hooks/common/useRequest'
import { mbPerAleph } from '@/helpers/constants'

export type UseUserStoreAllowanceReturn = {
  consumedSize?: number
  allowedSize?: number
}

export function useUserStoreAllowance(): UseUserStoreAllowanceReturn {
  const [{ account, accountBalance }] = useAppState()

  // @todo: Refactor this (use singleton)
  const manager = useMemo(() => new FileManager(account), [account])

  // -----------------------------

  const doRequest = useCallback(() => manager.getFiles(), [manager])

  const { data: fileInfo } = useRequest({
    doRequest,
    onSuccess: () => null,
    triggerOnMount: true,
    triggerDeps: [manager],
  })

  const consumedSize = fileInfo?.totalSize
  const allowedSize = accountBalance ? accountBalance * mbPerAleph : undefined

  // -----------------------------

  return {
    consumedSize,
    allowedSize,
  }
}
