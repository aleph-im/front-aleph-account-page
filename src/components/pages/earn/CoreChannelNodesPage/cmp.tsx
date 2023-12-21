import { memo } from 'react'
import Head from 'next/head'
import { Button, Icon, Tabs, TextInput } from '@aleph-front/aleph-core'
import {
  UseCoreChannelNodesPageProps,
  useCoreChannelNodesPage,
} from '@/hooks/pages/earn/useCoreChannelNodesPage'
import CoreChannelNodesTable from '@/components/common/CoreChannelNodesTable'
import ExternalLinkButton from '@/components/common/ExternalLinkButton'
import ToggleDashboard from '@/components/common/ToggleDashboard'
import Link from 'next/link'
import SpinnerOverlay from '@/components/common/SpinnerOverlay'
import NetworkHealthChart from '@/components/common/NetworkHealthChart'
import RewardChart from '@/components/common/RewardChart'
import EstimatedNodeRewardsChart from '@/components/common/EstimatedNodeRewardsChart'
import { useLazyRender } from '@/hooks/common/useLazyRender'

export const CoreChannelNodesPage = (props: UseCoreChannelNodesPageProps) => {
  const {
    account,
    accountBalance,
    nodes,
    filteredNodes,
    userNodes,
    filteredUserNodes,
    userNodesIssues,
    tabs,
    selectedTab,
    filter,
    lastVersion,
    userRewards,
    lastDistribution,
    handleTabChange,
    handleFilterChange,
  } = useCoreChannelNodesPage(props)

  const { render } = useLazyRender()

  const CreateNode = (
    <Link href="/earn/ccn/new" passHref legacyBehavior>
      <Button
        color="main0"
        kind="neon"
        variant="secondary"
        size="regular"
        tw="gap-2.5"
        disabled={!account || (accountBalance || 0) <= 200_000}
      >
        <Icon name="key" />
        Create core node
      </Button>
    </Link>
  )

  return (
    <>
      <Head>
        <title>Aleph.im | Account</title>
        <meta name="description" content="Aleph.im Account Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <h1 className="tp-h5" tw="mb-8">
          Core nodes
        </h1>
      </section>
      <section>
        <ToggleDashboard buttons={CreateNode}>
          <div tw="flex items-start gap-6 flex-wrap 2xl:flex-nowrap">
            <div tw="flex-auto 2xl:flex-none max-w-full flex items-stretch gap-6 flex-wrap 2xl:flex-nowrap order-2 2xl:order-none">
              <div tw="flex-auto 2xl:flex-none max-w-full">
                <NetworkHealthChart nodes={nodes} title="CCN NETWORK HEALTH" />
              </div>
              <div tw="flex-auto 2xl:flex-none items-stretch flex gap-6 flex-wrap sm:flex-nowrap">
                <div tw="flex-1">
                  <EstimatedNodeRewardsChart nodes={nodes} />
                </div>
                <div tw="flex-1">
                  <RewardChart
                    title="CCN REWARDS"
                    calculatedRewards={userRewards}
                    distributionTimestamp={lastDistribution}
                    disabled={!account || !userNodes?.length}
                  />
                </div>
              </div>
            </div>
            <div tw="flex-auto self-stretch flex flex-col justify-between order-1 2xl:order-none">
              <div>
                <h1 className="tp-h7" tw="mb-0">
                  What is a core node?
                </h1>
                <p className="fs-16 xxl:fs-12">
                  CCNs are the cornerstone of Aleph.im, responsible for the
                  security and functionality of our peer-to-peer network. These
                  dedicated nodes, backed by a commitment of 200,000 Aleph
                  tokens, play a pivotal role in network control and governance.
                  As non-custodial operators, they are at the forefront of
                  Aleph.im&apos;s innovative ecosystem. For more information on
                  how to set up a node and detailed technical and token
                  requirements, please visit our
                </p>
                <ExternalLinkButton
                  href="https://docs.aleph.im/nodes/core/"
                  size="regular"
                >
                  Node Setup Guide
                </ExternalLinkButton>
              </div>
              <div tw="mt-6 mb-4 2xl:mb-0">{CreateNode}</div>
            </div>
          </div>
        </ToggleDashboard>
      </section>
      <section tw="mt-14">
        <div tw="flex mb-8 gap-10 justify-between flex-wrap flex-col md:flex-row items-stretch md:items-end">
          <div tw="flex flex-wrap flex-col sm:flex-row items-start sm:items-center gap-10 sm:gap-4">
            <Tabs
              tabs={tabs}
              align="left"
              selected={selectedTab}
              onTabChange={handleTabChange}
            />
          </div>
          <TextInput
            value={filter}
            name="filter-ccn"
            placeholder="Search me"
            onChange={handleFilterChange}
            icon={<Icon name="search" />}
          />
        </div>
        <div tw="relative">
          <SpinnerOverlay show={!render || !nodes} />
          {render && (
            <>
              {selectedTab === 'user' ? (
                <>
                  {nodes && filteredUserNodes && (
                    <>
                      <CoreChannelNodesTable
                        {...{
                          nodes,
                          filteredNodes: filteredUserNodes,
                          nodesIssues: userNodesIssues,
                          lastVersion,
                        }}
                      />
                      <div tw="my-10 mx-4 text-center opacity-60">
                        {!account
                          ? 'Connect your wallet to see your core node running.'
                          : !userNodes?.length
                          ? 'You have no core node running.'
                          : ''}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {nodes && filteredNodes && (
                    <CoreChannelNodesTable
                      {...{
                        nodes,
                        filteredNodes,
                        lastVersion,
                      }}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
CoreChannelNodesPage.displayName = 'CoreChannelNodesPage'

export default memo(CoreChannelNodesPage)
