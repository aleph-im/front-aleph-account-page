import { memo } from 'react'
import Head from 'next/head'
import { Tabs, TextInput } from '@aleph-front/aleph-core'
import { useComputeResourceNodesPage } from '@/hooks/pages/earn/useComputeResourceNodesPage'
import ActiveNodeChart from '@/components/common/ActiveNodeChart'
import ComputeResourceNodesTable from '@/components/common/ComputeResourceNodesTable'

export const ComputeResourceNodesPage = memo((props) => {
  const {
    nodes,
    filteredNodes,
    filteredUserNodes,
    tabs,
    selectedTab,
    filter,
    handleTabChange,
    handleFilterChange,
  } = useComputeResourceNodesPage(props)

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
          <ActiveNodeChart nodes={nodes} title="COMPUTE RESOURCE NODES" />
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
            <ComputeResourceNodesTable
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
              <ComputeResourceNodesTable
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
ComputeResourceNodesPage.displayName = 'ComputeResourceNodesPage'

export default ComputeResourceNodesPage
