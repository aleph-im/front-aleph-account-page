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
import { useRouterLoadState } from '@/hooks/common/useRouterLoadState'

export default function App({ Component, pageProps }: AppProps) {
  const { loading } = useRouterLoadState()

  return (
    <ThemeProvider theme={themes.aleph}>
      <GlobalStyles />
      <GlobalStylesOverride />
      <AppStateProvider>
        <NotificationProvider max={10} timeout={2000}>
          <Viewport>
            <Sidebar />
            <Main>
              <Header />
              <Content>
                <Component {...pageProps} />
                {loading && <Loading />}
              </Content>
              <Footer />
            </Main>
          </Viewport>
        </NotificationProvider>
      </AppStateProvider>
    </ThemeProvider>
  )
}
