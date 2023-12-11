import { memo } from 'react'
import Head from 'next/head'
import { Checkbox, Icon, Tabs, TextInput } from '@aleph-front/aleph-core'
import { useStakingPage } from '@/hooks/pages/earn/useStakingPage'
import RewardCalculator from '@/components/common/RewardCalculator'
import StakingNodesTable from '@/components/common/StakingNodesTable'
import ToggleDashboard from '@/components/common/ToggleDashboard'
import SpinnerOverlay from '@/components/common/SpinnerOverlay'
import RewardChart from '@/components/common/RewardChart'
import StakeChart from '@/components/common/StakeChart'

export const StakingPage = memo((props) => {
  const {
    account,
    accountBalance,
    nodes,
    filteredNodes,
    stakeNodes,
    filteredStakeNodes,
    tabs,
    selectedTab,
    filter,
    isStakeableOnly,
    isStakeableOnlyDisabled,
    userStake,
    userRewards,
    lastDistribution,
    nodesIssues,
    handleTabChange,
    handleFilterChange,
    handleStake,
    handleUnstake,
    handleStakeableOnlyChange: handleChangeStakeableOnly,
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
      </section>
      <section>
        <ToggleDashboard>
          <div tw="flex items-start gap-6">
            <div tw="flex-auto self-stretch">
              <h2 className="tp-h7" tw="mb-0">
                What is staking with Aleph.im?
              </h2>
              <p className="fs-12">
                What is staking with Aleph.im? Staking is the heartbeat of our
                dynamic peer-to-peer network, driving security,
                decentralization, and rewards. With a minimum of 10,000 Aleph
                tokens, stakeholders form the network&apos;s foundation. Rewards
                are distributed every 10 days and are auto-compounded, allowing
                your stake to grow organically. The APY depends on factors like
                linked Compute Resource Nodes (CRNs) and node scoring, ensuring
                a fair and dynamic experience. Aleph.im staking empowers you to
                control the controllers, shaping decentralized connectivity
                while earning rewards. Plus, it&apos;s non-custodial.
                <strong className="text-main1" tw="font-bold">
                  Join us today!
                </strong>
              </p>
            </div>
            <div tw="flex items-stretch gap-6">
              <RewardCalculator nodes={nodes} />
              <RewardChart
                title="STAKING REWARDS"
                calculatedRewards={userRewards}
                distributionTimestamp={lastDistribution}
                disabled={!account || !userStake}
              />
              <StakeChart nodes={nodes} />
            </div>
          </div>
        </ToggleDashboard>
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
            <Checkbox
              label="Ready to stake"
              checked={isStakeableOnly}
              onChange={handleChangeStakeableOnly}
              size="xs"
              disabled={isStakeableOnlyDisabled}
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
          <SpinnerOverlay show={!nodes} />
          <>
            {selectedTab === 'user' ? (
              <>
                {nodes && filteredStakeNodes ? (
                  <>
                    <StakingNodesTable
                      {...{
                        nodes,
                        filteredNodes: filteredStakeNodes,
                        accountBalance,
                        account,
                        handleStake,
                        handleUnstake,
                        showStakedAmount: true,
                        nodesIssues,
                      }}
                    />
                    <div tw="my-10 mx-4 text-center opacity-60">
                      {!account
                        ? 'Connect your wallet to see your stakes.'
                        : !stakeNodes?.length
                        ? 'You are not staking.'
                        : ''}
                    </div>
                  </>
                ) : (
                  <>No data</>
                )}
              </>
            ) : (
              <>
                {nodes && filteredNodes && (
                  <StakingNodesTable
                    {...{
                      nodes,
                      filteredNodes,
                      accountBalance,
                      account,
                      handleStake,
                      handleUnstake,
                      nodesIssues,
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
StakingPage.displayName = 'StakingPage'

export default StakingPage
