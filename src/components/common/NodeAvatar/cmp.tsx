import { memo, useMemo } from 'react'
import Image from 'next/image'
import { apiServer } from '@/helpers/constants'
import { Avatar } from '../Avatar'
import tw from 'twin.macro'
import { AlephNode } from '@/domain/node'

export type NodeAvatarProps = {
  picture: AlephNode['picture']
  size?: 'md' | 'lg'
}

export const NodeAvatar = memo(
  ({ picture, size = 'md', ...rest }: NodeAvatarProps) => {
    const imgSize = useMemo(() => (size === 'md' ? 24 : 48), [size])
    const twSize = useMemo(
      () => [tw`rounded-full`, size === 'md' ? tw`w-6 h-6` : tw`w-12 h-12`],
      [size],
    )

    return (
      <>
        {picture ? (
          <Image
            src={`${apiServer}/api/v0/storage/raw/${picture}`}
            alt="Node profile image"
            width={imgSize}
            height={imgSize}
            css={twSize}
            {...rest}
          />
        ) : (
          <Avatar css={twSize} {...rest} />
        )}
      </>
    )
  },
)
NodeAvatar.displayName = 'NodeAvatar'

export default NodeAvatar
