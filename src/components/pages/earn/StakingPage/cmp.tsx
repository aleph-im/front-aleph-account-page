import { memo } from 'react'
import Head from 'next/head'
import { Checkbox, Icon, Tabs, TextInput } from '@aleph-front/aleph-core'
import { useStakingPage } from '@/hooks/pages/earn/useStakingPage'
import RewardCalculator from '@/components/common/RewardCalculator'
import StakingNodesTable from '@/components/common/StakingNodesTable'
import StakeRewardChart from '@/components/common/StakeRewardChart'
import ToggleDashboard from '@/components/common/ToggleDashboard'
import SpinnerOverlay from '@/components/common/SpinnerOverlay'

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
    userStake,
    userRewards,
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
      </section>
      <section>
        <ToggleDashboard>
          <div tw="flex items-start gap-6">
            <div tw="flex-auto self-stretch">
              <h2 className="tp-h7" tw="mb-0">
                What is staking with Aleph.im?
              </h2>
              <p className="fs-16">
                Staking is the heartbeat of our dynamic peer-to-peer network,
                driving security, decentralization, and rewards. Stakers, the
                lifeblood of our ecosystem, with a minimum stake of 10,000 Aleph
                tokens, form the network&apos;s foundation. Rewards are
                distributed every 10 days and are auto-compounded, allowing your
                stake to grow organically. The Annual Percentage Yield (APY)
                depends on factors like linked Compute Resource Nodes (CRNs) and
                node scoring, ensuring a fair and dynamic staking experience.
                Aleph.im staking empowers you to control the controllers,
                shaping decentralized connectivity while earning rewards for
                your participation. Plus, it&apos;s non-custodial.{' '}
                <strong className="text-main1" tw="font-bold">
                  Join us today!
                </strong>
              </p>
            </div>
            <div tw="flex items-stretch gap-6">
              <RewardCalculator nodes={nodes} />
              <StakeRewardChart
                rewards={userRewards}
                stake={userStake}
                nodes={nodes}
                disabled={!account || !userStake}
              />
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
              checked={stakeableOnly}
              onChange={handleChangeStakeableOnly}
              size="xs"
              disabled={!account || selectedTab !== 'nodes'}
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
          {nodes && filteredNodes && filteredStakeNodes && stakeNodes && (
            <>
              {selectedTab === 'stake' ? (
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
        </div>
      </section>
    </>
  )
})
StakingPage.displayName = 'StakingPage'

export default StakingPage
