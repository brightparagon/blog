import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
