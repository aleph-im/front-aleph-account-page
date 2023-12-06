import styled from 'styled-components'
import ColorDot from '../ColorDot'

export type StyledAPYIconProps = { $performance: number }

export const StyledAPYIcon = styled(ColorDot).attrs<StyledAPYIconProps>(
  ({ $performance, ...rest }) => {
    const $color =
      $performance >= 0.8 ? 'main1' : $performance >= 0.5 ? 'main0' : 'error'

    return {
      $color,
      ...rest,
    }
  },
)<StyledAPYIconProps>``
