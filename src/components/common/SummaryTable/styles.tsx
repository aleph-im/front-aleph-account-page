import { Table } from '@aleph-front/aleph-core'
import { ReactNode } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledTable = styled(Table<{ name: string; value: ReactNode }>)`
  && {
    thead {
      ${tw`hidden`}
    }

    td,
    th {
      ${tw`w-0 whitespace-nowrap text-ellipsis overflow-hidden px-4 py-3`}
      border-bottom: 1px solid #ffffff22;

      &:first-child {
        ${tw`w-2/3 max-w-0 text-xs uppercase`}
      }

      &:last-child {
        ${tw`text-right`}
      }
    }
  }
`
