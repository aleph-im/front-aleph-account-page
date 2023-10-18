import styled from 'styled-components'
import ColorDot from '../ColorDot'

export type StyledVersionIconProps = { $status: number }

export const StyledVersionIcon = styled(ColorDot).attrs<StyledVersionIconProps>(
  ({ $status, ...rest }) => {
    const $color = $status >= 0.8 ? 'main1' : $status >= 0.5 ? 'main0' : 'error'

    return {
      $color,
      ...rest,
    }
  },
)<StyledVersionIconProps>``
