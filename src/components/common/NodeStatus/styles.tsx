import styled from 'styled-components'
import ColorDot from '../ColorDot'
import { AlephNode } from '@/domain/node'

export type StyledStatusIconProps = { $status: AlephNode['status'] }

export const StyledStatusIcon = styled(ColorDot).attrs<StyledStatusIconProps>(
  ({ $status, ...rest }) => {
    const $color =
      $status === 'active' || $status === 'linked' ? 'main1' : 'main2'

    return {
      $color,
      ...rest,
    }
  },
)<StyledStatusIconProps>``
