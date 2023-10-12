import { CCN } from '@/domain/node'
import { Table } from '@aleph-front/aleph-core'
import styled from 'styled-components'

export const StyledTable = styled(Table<CCN>)`
  thead th {
    font-size: 0.8125rem;
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
