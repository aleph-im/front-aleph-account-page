import { memo } from 'react'
import Head from 'next/head'
import { Button, Icon, Tabs, TextInput } from '@aleph-front/aleph-core'
import { useComputeResourceNodesPage } from '@/hooks/pages/earn/useComputeResourceNodesPage'
import ActiveNodeChart from '@/components/common/ActiveNodeChart'
import ComputeResourceNodesTable from '@/components/common/ComputeResourceNodesTable'
import ExternalLinkButton from '@/components/common/ExternalLinkButton'
import ToggleDashboard from '@/components/common/ToggleDashboard'
import Link from 'next/link'

export const ComputeResourceNodesPage = memo((props) => {
  const {
    nodes,
    filteredNodes,
    filteredUserNodes,
    tabs,
    selectedTab,
    filter,
    lastVersion,
    handleTabChange,
    handleFilterChange,
  } = useComputeResourceNodesPage(props)

  const CreateNode = (
    <Link href="/earn/crn/new" passHref legacyBehavior>
      <Button
        color="main0"
        kind="neon"
        variant="secondary"
        size="regular"
        tw="gap-2.5"
      >
        <Icon name="key" />
        Create compute node
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
          Compute nodes
        </h1>
      </section>
      <section>
        <ToggleDashboard buttons={CreateNode}>
          <div tw="flex items-stretch gap-6">
            <ActiveNodeChart nodes={nodes} title="COMPUTE RESOURCE NODES" />
            <div tw="flex flex-col justify-between">
              <div>
                <h1 className="tp-h7" tw="mb-0">
                  What is a compute node?
                </h1>
                <p>
                  Anyone can set up a Compute Resource Node (CRN) to contribute
                  to our decentralized network. These nodes play a crucial role
                  in our ecosystem, enabling various services. While no
                  commitment is needed to establish a CRN, to unlock a minimum
                  wage for your CRN, it needs the endorsement of a Core Channel
                  Node (CCN). A CCN operator can vouch for up to three CRNs,
                  ensuring fair and balanced participation.
                </p>
                <ExternalLinkButton href="https://docs.aleph.im/nodes/compute/">
                  Node Setup Guide
                </ExternalLinkButton>
              </div>
              <div>{CreateNode}</div>
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
        {selectedTab === 'user' ? (
          <>
            <ComputeResourceNodesTable
              {...{
                nodes,
                filteredNodes: filteredUserNodes,
                lastVersion,
              }}
            />
          </>
        ) : (
          <>
            {!nodes ? (
              <>Loading...</>
            ) : (
              <ComputeResourceNodesTable
                {...{
                  nodes,
                  filteredNodes,
                  lastVersion,
                }}
              />
            )}
          </>
        )}
      </section>
    </>
  )
})
ComputeResourceNodesPage.displayName = 'ComputeResourceNodesPage'

export default ComputeResourceNodesPage
