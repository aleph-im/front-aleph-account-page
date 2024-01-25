import { useAppState } from '@/contexts/appState'
import { Route } from '@aleph-front/core'
import { useMemo } from 'react'
import { useFilterUserStakeNodes } from './useFilterUserStakeNodes'
import { useFilterUserNodes } from './useFilterUserNodes'
import { useFilterNodeIssues } from './useFilterNodeIssues'

export type UseRoutesReturn = {
  routes: Route[]
}

export function useRoutes(): UseRoutesReturn {
  const [state] = useAppState()
  const { entities: nodes } = state.ccns
  const { entities: crns } = state.crns

  const { stakeNodes } = useFilterUserStakeNodes({ nodes })
  const { userNodes: userCCNs } = useFilterUserNodes({ nodes })
  const { userNodes: userCRNs } = useFilterUserNodes({ nodes: crns })

  const { warningFlag: stakeNodesWarningFlag } = useFilterNodeIssues({
    nodes: stakeNodes,
  })

  const { warningFlag: userCCNsWarningFlag } = useFilterNodeIssues({
    nodes: userCCNs,
  })

  const { warningFlag: userCRNsWarningFlag } = useFilterNodeIssues({
    nodes: userCRNs,
  })

  // -----------------------------------

  const routes: Route[] = useMemo(() => {
    return [
      {
        name: 'Account',
        href: '/',
        icon: 'earn',
        children: [
          {
            name: 'Earn',
            href: '/',
            icon: 'earn',
            children: [
              {
                name: 'Staking',
                href: '/earn/staking',
                icon: 'earn',
                flag: stakeNodesWarningFlag,
              },
              {
                name: 'Core nodes',
                href: '/earn/ccn',
                icon: 'ccn',
                flag: userCCNsWarningFlag,
              },
              {
                name: 'Compute nodes',
                href: '/earn/crn',
                icon: 'crn',
                flag: userCRNsWarningFlag,
              },
            ],
          },
        ],
      },
      {
        name: 'Console',
        icon: 'console',
        href: 'https://console.aleph.im/',
        target: '_blank',
        external: true,
      },
      {
        name: 'Explorer',
        icon: 'explore',
        href: 'https://explorer.aleph.im/',
        target: '_blank',
        external: true,
      },
      {
        name: 'Swap',
        icon: 'swap',
        href: 'https://swap.aleph.im/',
        target: '_blank',
        external: true,
      },
      // {
      //   name: 'PROFILE',
      //   href: '/profile',
      //   icon: 'profile',
      //   children: [
      //     {
      //       name: 'My profile',
      //       href: '/profile',
      //       icon: 'profile',
      //     },
      //     {
      //       name: 'Notification center',
      //       href: '/notification',
      //       icon: 'notification',
      //     },
      //   ],
      // },
    ]
  }, [stakeNodesWarningFlag, userCCNsWarningFlag, userCRNsWarningFlag])

  return {
    routes,
  }
}
