import { useAppState } from '@/contexts/appState'
import { AlephNode } from '@/domain/node'
import { NextRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

const defaultNames = {
  '/': 'HOME',
  // '/earn': '-',
  '/earn/ccn': 'CORE NODES',
  '/earn/crn': 'COMPUTE RESOURCE NODES',
  '/earn/ccn/new': 'CREATE CORE NODE',
  '/earn/crn/new': 'CREATE COMPUTE RESOURCE NODE',
}

export type UseBreadcrumbNamesReturn = {
  names: Record<string, string | ((route: NextRouter) => string)>
}

export function useBreadcrumbNames(): UseBreadcrumbNamesReturn {
  const [state] = useAppState()

  const nameGetter = useCallback((entities?: AlephNode[]) => {
    if (!entities) return ''

    return (router: NextRouter) => {
      const node = entities.find((entity) => entity.hash === router.query.hash)
      return (node?.name || '').toUpperCase()
    }
  }, [])

  let names = useMemo(() => ({ ...defaultNames }), [])

  names = useMemo(() => {
    return {
      ...names,
      '/earn/ccn/[hash]': nameGetter(state.ccns.entities),
    }
  }, [names, nameGetter, state.ccns.entities])

  names = useMemo(() => {
    return {
      ...names,
      '/earn/crn/[hash]': nameGetter(state.crns.entities),
    }
  }, [names, nameGetter, state.crns.entities])

  return {
    names,
  }
}
