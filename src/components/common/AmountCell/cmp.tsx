import { memo } from 'react'
import { Logo } from '@aleph-front/aleph-core'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L258
export const AmountCell = memo(({ amount }: { amount: number }) => {
  return (
    <div tw="inline-flex gap-2 items-center">
      {amount.toFixed(2)}
      <Logo text="" />
    </div>
  )
})
AmountCell.displayName = 'AmountCell'

export default AmountCell
