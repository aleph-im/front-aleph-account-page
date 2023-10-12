import '../styles/font.css'

// @IMPORTANT: Read https://fontawesome.com/docs/web/use-with/react/use-with#next-js
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { themes, GlobalStyles } from '@aleph-front/aleph-core'
import { GlobalStylesOverride } from '@/styles/global'
import { AppStateProvider } from '@/contexts/appState'

import Header from '@/components/common/Header'
import NotificationProvider from '@/components/common/NotificationProvider'
import Main from '@/components/common/Main'
import Sidebar from '@/components/common/Sidebar'
import Viewport from '@/components/common/Viewport/cmp'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themes.dark}>
      <GlobalStyles />
      <GlobalStylesOverride />
      <AppStateProvider>
        <NotificationProvider>
          <Viewport>
            <Sidebar />
            <Main>
              <Header />
              <Component {...pageProps} />
            </Main>
          </Viewport>
        </NotificationProvider>
      </AppStateProvider>
    </ThemeProvider>
  )
}
