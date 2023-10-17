import Head from 'next/head'
import {
  Button,
  Checkbox,
  TableColumn,
  Tabs,
  TextInput,
} from '@aleph-front/aleph-core'
import NodesTable from '@/components/common/NodesTable'
import NameCell from '@/components/common/NameCell'
import LinkedCell from '@/components/common/LinkedCell'
import ScoreCell from '@/components/common/ScoreCell'
import APYCell from '@/components/common/APYCell'
import StakedCell from '@/components/common/StakedCell'
import { useStakingPage } from '@/hooks/pages/earn/useStakingPage'
import RewardCalculator from '@/components/common/RewardCalculator'
import { CCN } from '@/domain/node'
import { memo, useMemo } from 'react'
import StakeButton from '@/components/common/StakeButton/cmp'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import AmountCell from '@/components/common/AmountCell/cmp'

type NodesProps = {
  nodes: CCN[]
  filteredNodes: CCN[]
  stakeNodes: CCN[]
  account?: Account
  accountBalance?: number
  showStakedAmount?: boolean
  handleStake: (nodeHash: string) => void
  handleUnStake: (nodeHash: string) => void
}

const Nodes = memo(
  ({
    nodes,
    stakeNodes,
    filteredNodes,
    account,
    accountBalance,
    showStakedAmount,
    handleStake: onStake,
    handleUnStake: onUnStake,
  }: NodesProps) => {
    const columns = useMemo(() => {
      const cols = [
        {
          label: 'EST.APY',
          render: (row) => <APYCell node={row} nodes={nodes} />,
        },
        {
          label: 'NAME',
          sortable: true,
          sortBy: (row) => row.name,
          render: (row) => (
            <NameCell
              hash={row.hash}
              name={row.name}
              picture={row.picture}
              locked={row.locked}
            ></NameCell>
          ),
        },
        {
          label: 'STAKED',
          sortable: true,
          sortBy: (row) => row.total_staked,
          render: (row) => (
            <StakedCell staked={row.total_staked} status={row.status} />
          ),
        },
        {
          label: 'LINKED',
          sortable: true,
          sortBy: (row) => row.resource_nodes.length,
          render: (row) => <LinkedCell nodes={row.crnsData} />,
        },
        {
          label: 'SCORE',
          sortable: true,
          sortBy: (row) => row.score,
          render: (row) => <ScoreCell score={row.score} />,
        },
        {
          label: '',
          align: 'right',
          render: (node) => (
            <div tw="flex gap-3 justify-end">
              <StakeButton
                {...{
                  node,
                  account,
                  accountBalance,
                  stakeNodes,
                  onStake,
                  onUnStake,
                }}
              />
              <Button
                kind="neon"
                size="regular"
                variant="secondary"
                color="main0"
              >
                Info
              </Button>
            </div>
          ),
        },
      ] as TableColumn<CCN>[]

      if (showStakedAmount && account) {
        cols.splice(cols.length - 1, 0, {
          label: 'AMOUNT',
          sortable: true,
          sortBy: (row) => row.stakers[account.address] || 0,
          render: (row) => (
            <AmountCell amount={row.stakers[account.address] || 0} />
          ),
        })
      }

      return cols.map((col, i) => {
        col.width = i === cols.length - 1 ? '100%' : `${70 / cols.length - 1}%`
        return col
      })
    }, [
      account,
      accountBalance,
      nodes,
      onStake,
      onUnStake,
      showStakedAmount,
      stakeNodes,
    ])

    return (
      <NodesTable
        columns={columns}
        data={filteredNodes}
        borderType="solid"
        oddRowNoise
      />
    )
  },
)
Nodes.displayName = 'Nodes'

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
        <div tw="mt-14">
          <div tw="flex items-end justify-between mb-8">
            <div tw="flex items-center gap-4">
              <Tabs
                tabs={tabs}
                align="left"
                selected={selectedTab}
                onTabChange={handleTabChange}
              />
              <Checkbox
                label="Stakeable"
                checked={stakeableOnly}
                onChange={handleChangeStakeableOnly}
                disabled={selectedTab !== 'nodes'}
              />
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
              <Nodes
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
                <Nodes
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
