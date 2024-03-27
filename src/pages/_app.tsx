import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import {
  themes,
  GlobalStyles,
  Notification as NotificationProvider,
} from '@aleph-front/core'
import { GlobalStylesOverride } from '@/styles/global'
import { AppStateProvider } from '@/contexts/appState'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Main from '@/components/common/Main'
import Sidebar from '@/components/common/Sidebar'
import Viewport from '@/components/common/Viewport'
import Content from '@/components/common/Content'
import Loading from './loading'
import { ConnectionProvider } from '@/contexts/connection'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themes.aleph}>
      <GlobalStyles />
      <GlobalStylesOverride />
      <AppStateProvider>
        <ConnectionProvider>
          <NotificationProvider max={10} timeout={2000}>
            <Viewport>
              <Sidebar />
              <Main>
                <Header />
                <Content>
                  <Component {...pageProps} />
                  <Loading />
                </Content>
                <Footer />
              </Main>
            </Viewport>
          </NotificationProvider>
        </ConnectionProvider>
      </AppStateProvider>
    </ThemeProvider>
  )
}
