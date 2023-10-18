import { memo } from 'react'
import Head from 'next/head'
import { Tabs, TextInput } from '@aleph-front/aleph-core'
import { useCoreChannelNodesPage } from '@/hooks/pages/earn/useCoreChannelNodesPage'
import CoreChannelNodesTable from '@/components/common/CoreChannelNodesTable'
import StakeChart from '@/components/common/StakeChart'
import ActiveNodeChart from '@/components/common/ActiveNodeChart'

export const CoreChannelNodesPage = memo((props) => {
  const {
    nodes,
    filteredNodes,
    filteredUserNodes,
    tabs,
    selectedTab,
    filter,
    handleTabChange,
    handleFilterChange,
  } = useCoreChannelNodesPage(props)

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
        <div tw="flex items-stretch gap-9">
          <StakeChart nodes={nodes} />
          <ActiveNodeChart nodes={nodes} title="CORE CHANNEL NODES" />
          <div>
            <h1 className="tp-h7" tw="mb-0">
              What is a core node?
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum aliquam lectus non eros malesuada egestas eu vitae
              ipsum. Donec sed faucibus sapien. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Aenean at scelerisque tortor.
            </p>
          </div>
        </div>
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
          />
        </div>
        {selectedTab === 'user' ? (
          <>
            <CoreChannelNodesTable
              {...{
                nodes,
                filteredNodes: filteredUserNodes,
              }}
            />
          </>
        ) : (
          <>
            {!nodes ? (
              <>Loading...</>
            ) : (
              <CoreChannelNodesTable
                {...{
                  nodes,
                  filteredNodes,
                }}
              />
            )}
          </>
        )}
      </section>
    </>
  )
})
CoreChannelNodesPage.displayName = 'CoreChannelNodesPage'

export default CoreChannelNodesPage
