import Document, { Html, Head, Main, NextScript } from 'next/document'
import { css, Global } from '@emotion/react'

const ResetStyles = css`
  * {
    box-sizing: border-box;
    font-family: 'Apple SD Gothic Neo', 'Noto Sans', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
  }
`

// load google fonts 참고: https://csswizardry.com/2020/05/the-fastest-google-fonts/
class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang="ko">
          <meta charSet="UTF-8"/>
          {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            />
          </noscript>
          <Global styles={ResetStyles} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
