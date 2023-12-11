import { useEffect, useMemo, useState } from 'react'
import { CCN, NodeManager, NodesResponse } from '@/domain/node'
import { useAppState } from '@/contexts/appState'
import { EntitySetAction } from '@/store/entity'
import { Future } from '@/helpers/utils'

export type UseRequestCCNsFeedReturn = {
  nodes?: NodesResponse
}

export function useRequestCCNsFeed(): UseRequestCCNsFeedReturn {
  const [state, dispatch] = useAppState()
  const { account } = state.account

  // @todo: Refactor this (use singleton)
  const manager = useMemo(() => new NodeManager(account), [account])

  // -----------------------------

  const [nodes, setNodes] = useState<NodesResponse>()

  useEffect(() => {
    const abort = new Future<void>()

    async function subscribe() {
      const it = manager.subscribeNodesFeed(abort.promise)

      for await (const data of it) {
        setNodes(data)
      }
    }

    subscribe()

    return () => abort.resolve()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!nodes) return

    dispatch(
      new EntitySetAction<CCN>({
        name: 'ccns',
        state: { data: nodes.ccns, loading: false, error: undefined },
      }),
    )
  }, [dispatch, nodes])

  return { nodes }
}
