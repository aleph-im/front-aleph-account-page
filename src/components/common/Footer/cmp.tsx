import { Footer as BaseFooter } from '@aleph-front/core'

export const Footer = () => {
  return (
    <BaseFooter
      {...{
        small: true,
        buttons: [],
        media: [
          {
            name: 'x',
            icon: 'x',
            label: 'Follow us',
            href: 'https://twitter.com/TwentySixCloud',
            small: true,
          },
          {
            name: 'telegram',
            icon: 'telegram',
            label: 'Telegram',
            href: 'https://t.me/alephim',
          },
          {
            name: 'medium',
            icon: 'medium',
            label: 'Medium',
            href: 'https://medium.com/aleph-im',
            small: true,
          },
        ],
        mainLinks: [
          {
            label: 'Documentation',
            href: 'https://docs.aleph.im',
          },
          {
            label: 'Telegram Developers',
            href: 'https://t.me/alephim/119590',
          },
        ],
        links: [],
      }}
    />
  )
}

export default Footer
