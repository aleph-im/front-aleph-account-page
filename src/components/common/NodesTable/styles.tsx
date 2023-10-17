import { CCN } from '@/domain/node'
import { Table } from '@aleph-front/aleph-core'
import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledTable = styled(Table<CCN>)`
  thead th {
    font-size: 0.8125rem;
    ${tw`whitespace-nowrap`}
  }

  td,
  th {
    padding: 0.75rem 1rem;
    width: 0;
  }

  tr,
  td {
    border: none;
  }
`
