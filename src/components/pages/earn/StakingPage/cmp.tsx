import { memo } from 'react'
import Head from 'next/head'
import { Checkbox, Tabs, TextInput } from '@aleph-front/aleph-core'
import { useStakingPage } from '@/hooks/pages/earn/useStakingPage'
import RewardCalculator from '@/components/common/RewardCalculator'
import StakingNodesTable from '@/components/common/StakingNodesTable'

export const StakingPage = memo((props) => {
  const {
    account,
    accountBalance,
    nodes,
    stakeNodes,
    filteredNodes,
    filteredStakeNodes,
    tabs,
    selectedTab,
    filter,
    stakeableOnly,
    handleTabChange,
    handleFilterChange,
    handleStake,
    handleUnStake,
    handleChangeStakeableOnly,
  } = useStakingPage(props)

  return (
    <>
      <Head>
        <title>Aleph.im | Account</title>
        <meta name="description" content="Aleph.im Account Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <h1 className="tp-h5" tw="mb-8">
          Staking
        </h1>
        <div tw="flex items-start gap-6 mt-8 mb-14">
          <div tw="flex-auto">
            <h2 className="tp-h7" tw="mb-0">
              What is staking?
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum aliquam lectus non eros malesuada egestas eu vitae
              ipsum. Donec sed faucibus sapien. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Aenean at scelerisque tortor. Sed
              nec placerat lacus. Fusce facilisis arcu in vulputate eleifend.
              Pellentesque at ante est. Vivamus cursus lorem odio. Aenean
              porttitor rutrum erat sed suscipit. Duis viverra, ligula et
              lacinia lobortis, sem ante luctus sapien, id gravida justo odio
              vel sapien. Ut vel volutpat mauris, in congue lorem. Etiam mollis,
              magna at finibus dictum, metus diam malesuada felis, at mattis
              magna lectus eget enim.
            </p>
          </div>
          {nodes && (
            <div tw="flex-1">
              <RewardCalculator nodes={nodes} />
            </div>
          )}
        </div>
      </section>
      <section tw="mt-14">
        <div tw="flex items-end justify-between mb-8">
          <div tw="flex items-center gap-4">
            <Tabs
              tabs={tabs}
              align="left"
              selected={selectedTab}
              onTabChange={handleTabChange}
            />
            {!!account && (
              <Checkbox
                label="Ready to stake"
                checked={stakeableOnly}
                onChange={handleChangeStakeableOnly}
                disabled={selectedTab !== 'nodes'}
              />
            )}
          </div>
          <TextInput
            value={filter}
            name="filter-ccn"
            placeholder="Search me"
            onChange={handleFilterChange}
          />
        </div>
        {selectedTab === 'stake' ? (
          <>
            <StakingNodesTable
              {...{
                nodes,
                filteredNodes: filteredStakeNodes,
                stakeNodes,
                accountBalance,
                account,
                handleStake,
                handleUnStake,
                showStakedAmount: true,
              }}
            />
          </>
        ) : (
          <>
            {!nodes ? (
              <>Loading...</>
            ) : (
              <StakingNodesTable
                {...{
                  nodes,
                  filteredNodes,
                  stakeNodes,
                  accountBalance,
                  account,
                  handleStake,
                  handleUnStake,
                }}
              />
            )}
          </>
        )}
      </section>
    </>
  )
})
StakingPage.displayName = 'StakingPage'

export default StakingPage
