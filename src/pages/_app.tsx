import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { themes, GlobalStyles, Footer } from '@aleph-front/aleph-core'
import { GlobalStylesOverride } from '@/styles/global'
import { AppStateProvider } from '@/contexts/appState'

import Header from '@/components/common/Header'
import NotificationProvider from '@/components/common/NotificationProvider'
import Main from '@/components/common/Main'
import Sidebar from '@/components/common/Sidebar'
import Viewport from '@/components/common/Viewport'
import Content from '@/components/common/Content'

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
              <Content>
                <Component {...pageProps} />
              </Content>
              <Footer small />
            </Main>
          </Viewport>
        </NotificationProvider>
      </AppStateProvider>
    </ThemeProvider>
  )
}
