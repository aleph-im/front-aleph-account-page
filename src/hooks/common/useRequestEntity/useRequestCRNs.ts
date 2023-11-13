import { useMemo } from 'react'
import { useAppStoreEntityRequest } from '../useStoreEntitiesRequest'
import { CRN, NodeLastVersions, NodeManager } from '@/domain/node'
import { useAppState } from '@/contexts/appState'
import { useAppStoreRequest } from '../useStoreRequest'

export type UseRequestCRNsProps = {
  triggerDeps?: unknown[]
}

export type UseRequestCRNsReturn = {
  nodes?: CRN[]
  lastVersion?: NodeLastVersions
}

export function useRequestCRNs({
  triggerDeps,
}: UseRequestCRNsProps): UseRequestCRNsReturn {
  const [state] = useAppState()
  const { account } = state.account

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const { data: nodes } = useAppStoreEntityRequest({
    name: 'crns',
    doRequest: () => nodeManager.getCRNNodes(),
    onSuccess: () => null,
    flushData: false,
    triggerOnMount: true,
    triggerDeps,
  })

  // -----------------------------

  const { data: lastVersion } = useAppStoreRequest({
    name: 'lastCRNVersion',
    doRequest: () => nodeManager.getLatestCRNVersion(),
    onSuccess: () => null,
    onError: () => null,
    flushData: false,
    triggerOnMount: true,
  })

  return {
    nodes,
    lastVersion,
  }
}
