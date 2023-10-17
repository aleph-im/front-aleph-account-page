import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react'
import { Icon, TextGradient, TextInput } from '@aleph-front/aleph-core'
import SummaryTable from '../SummaryTable'
import Card1 from '../Card1/cmp'
import { StakeManager } from '@/domain/stake'
import { CCN } from '@/domain/node'

export type RewardCalculatorProps = {
  nodes: CCN[]
}

// https://github.com/aleph-im/aleph-account/blob/main/src/pages/Stake.vue#L63C13-L63C13
export const RewardCalculator = memo(({ nodes }: RewardCalculatorProps) => {
  const [value, setValue] = useState<number | undefined>(1_000)

  const handleValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined
    setValue(value)
  }, [])

  const data = useMemo(() => {
    // @todo: Refactor this (use singleton)
    const rewardManager = new StakeManager()

    const rewards = rewardManager.totalPerAlephPerDay(nodes) * (value || 0)
    const apy = rewardManager.currentAPY(nodes) * 100

    return [
      {
        name: 'Rewards per day',
        value: `${rewards.toFixed(2)} ALEPH`,
      },
      {
        name: 'Current APY',
        value: `${apy.toFixed(2)}%`,
      },
    ]
  }, [nodes, value])

  return (
    <Card1>
      <div tw="w-[320px] overflow-auto">
        <TextGradient forwardedAs="h3" type="info" color="main0" tw="mb-6">
          REWARD CALCULATOR
        </TextGradient>
        <div tw="mb-4">
          <TextInput
            value={value}
            onChange={handleValueChange}
            type="number"
            name="staked-amount"
            placeholder="0"
            label="Amount staked"
            buttonStyle="wrapped"
            button={
              <button>
                <Icon name="arrow-turn-down-left" tw="w-10" />
              </button>
            }
          />
        </div>
        <SummaryTable
          borderType="solid"
          rowKey={(row) => row.name}
          columns={[
            { label: '', render: (row) => row.name },
            { label: '', render: (row) => row.value },
          ]}
          data={data}
        />
      </div>
    </Card1>
  )
})
RewardCalculator.displayName = 'RewardCalculator'

export default RewardCalculator
