import { HTMLAttributes, memo, useMemo } from 'react'
import {
  StyledContainer,
  StyledDescription,
  StyledNodeAvatar,
  StyledTitle,
} from './styles'
import { AlephNode } from '@/domain/node'
import { apiServer } from '@/helpers/constants'
import { useBasePath } from '@/hooks/common/useBasePath'

export type NodeDetailHeaderProps = HTMLAttributes<HTMLDivElement> & {
  node?: AlephNode
}

export const NodeDetailHeader = memo(
  ({ node, ...rest }: NodeDetailHeaderProps) => {
    const basePath = useBasePath()
    const $backgroundUrl = useMemo(() => {
      if (node?.banner) return `${apiServer}/api/v0/storage/raw/${node?.banner}`

      const imgPrefix = basePath?.charAt(0) === '/' ? basePath : ''
      return `${imgPrefix}/img/bg1.png`
    }, [basePath, node])

    return (
      <div {...rest}>
        <StyledContainer
          {...{
            $backgroundUrl,
            ...rest,
          }}
        >
          <StyledNodeAvatar picture={node?.picture} />
          <StyledTitle>{node?.name || node?.hash}</StyledTitle>
        </StyledContainer>
        {node?.description && (
          <StyledDescription>{node?.description}</StyledDescription>
        )}
      </div>
    )
  },
)
NodeDetailHeader.displayName = 'NodeDetailHeader'

export default NodeDetailHeader
