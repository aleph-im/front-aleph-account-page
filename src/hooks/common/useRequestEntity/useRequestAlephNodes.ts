import { useMemo } from 'react'
import { CCN, CRN, NodeLastVersions, NodeManager } from '@/domain/node'
import { useAppState } from '@/contexts/appState'
import { useAppStoreRequest } from '../useStoreRequest'
import { useRequest } from '@aleph-front/core'
import { EntitySetAction } from '@/store/entity'

export type UseRequestAlephNodesProps = {
  triggerDeps?: unknown[]
}

export type UseRequestAlephNodesReturn = {
  ccns?: CCN[]
  crns?: CRN[]
  ccnLastVersion?: NodeLastVersions
  crnLastVersion?: NodeLastVersions
}

export function useRequestAlephNodes({
  triggerDeps,
}: UseRequestAlephNodesProps): UseRequestAlephNodesReturn {
  const { state: appState, dispatch } = useAppState()
  const { account } = appState.connection
  const { ccns, crns } = appState

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const state = useMemo(() => {
    return {
      data: {
        ccns: { data: ccns.entities, loading: ccns.loading, error: ccns.error },
        crns: { data: crns.entities, loading: crns.loading, error: crns.error },
        timestamp: Date.now(),
      },
      loading: ccns.loading || crns.loading,
      error: ccns.error || crns.error,
    }
  }, [ccns, crns])

  const { data } = useRequest({
    state,
    setState: (newState) => {
      const { ccns, crns } = newState.data || {}
      ccns && dispatch(new EntitySetAction({ name: 'ccns', state: ccns }))
      crns && dispatch(new EntitySetAction({ name: 'crns', state: crns }))
    },
    doRequest: async () => {
      const res = await nodeManager.getAllNodes()
      return {
        ccns: { data: res.ccns, loading: false, error: undefined },
        crns: { data: res.crns, loading: false, error: undefined },
        timestamp: Date.now(),
      }
    },
    onSuccess: () => null,
    flushData: false,
    triggerOnMount: true,
    triggerDeps,
  })

  // -----------------------------

  const { data: ccnLastVersion } = useAppStoreRequest({
    name: 'lastCCNVersion',
    doRequest: () => nodeManager.getLatestCCNVersion(),
    onSuccess: () => null,
    onError: () => null,
    flushData: false,
    triggerOnMount: true,
  })

  // -----------------------------

  const { data: crnLastVersion } = useAppStoreRequest({
    name: 'lastCRNVersion',
    doRequest: () => nodeManager.getLatestCRNVersion(),
    onSuccess: () => null,
    onError: () => null,
    flushData: false,
    triggerOnMount: true,
  })

  return {
    ccns: data?.ccns.data,
    crns: data?.crns.data,
    ccnLastVersion,
    crnLastVersion,
  }
}
