import { memo } from 'react'
import Head from 'next/head'
import { Button, Icon, Tabs, TextInput } from '@aleph-front/aleph-core'
import { useCoreChannelNodesPage } from '@/hooks/pages/earn/useCoreChannelNodesPage'
import CoreChannelNodesTable from '@/components/common/CoreChannelNodesTable'
import ExternalLinkButton from '@/components/common/ExternalLinkButton'
import ToggleDashboard from '@/components/common/ToggleDashboard'
import Link from 'next/link'
import SpinnerOverlay from '@/components/common/SpinnerOverlay'
import NetworkHealthChart from '@/components/common/NetworkHealthChart'
import RewardChart from '@/components/common/RewardChart'
import EstimatedNodeRewardsChart from '@/components/common/EstimatedNodeRewardsChart'

export const CoreChannelNodesPage = memo((props) => {
  const {
    account,
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

  const CreateNode = (
    <Link href="/earn/ccn/new" passHref legacyBehavior>
      <Button
        color="main0"
        kind="neon"
        variant="secondary"
        size="regular"
        tw="gap-2.5"
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
          <div tw="flex items-start gap-6">
            <div tw="flex items-stretch gap-6">
              <NetworkHealthChart nodes={nodes} title="CCN NETWORK HEALTH" />
              <EstimatedNodeRewardsChart nodes={nodes} />
              <RewardChart
                title="CCN REWARDS"
                calculatedRewards={userRewards}
                distributionTimestamp={lastDistribution}
                disabled={!account || !userNodes?.length}
              />
            </div>
            <div tw="flex-auto self-stretch flex flex-col justify-between">
              <div>
                <h1 className="tp-h7" tw="mb-0">
                  What is a core node?
                </h1>
                <p className="fs-12">
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
              <div tw="mt-6">{CreateNode}</div>
            </div>
          </div>
        </ToggleDashboard>
      </section>
      <section tw="mt-14">
        <div tw="flex items-end justify-between mb-8">
          <Tabs
            tabs={tabs}
            align="left"
            selected={selectedTab}
            onTabChange={handleTabChange}
          />
          <TextInput
            value={filter}
            name="filter-ccn"
            placeholder="Search me"
            onChange={handleFilterChange}
            icon={<Icon name="search" />}
          />
        </div>
        <div tw="relative">
          <SpinnerOverlay show={!nodes} />
          <>
            {selectedTab === 'user' ? (
              <>
                {nodes && filteredUserNodes && (
                  <CoreChannelNodesTable
                    {...{
                      nodes,
                      filteredNodes: filteredUserNodes,
                      nodesIssues: userNodesIssues,
                      lastVersion,
                    }}
                  />
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
        </div>
      </section>
      <SpinnerOverlay show={!nodes} center />
    </>
  )
})
CoreChannelNodesPage.displayName = 'CoreChannelNodesPage'

export default CoreChannelNodesPage
