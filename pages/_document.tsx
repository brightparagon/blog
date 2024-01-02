import { css, Global } from '@emotion/react'
import Document, { Head, Html, Main, NextScript } from 'next/document'

import * as colors from 'constants/colors'
import { GA_MEASUREMENT_ID } from 'constants/env'

const ResetStyles = css`
  * {
    box-sizing: border-box;
    font-family: 'Apple SD Gothic Neo', 'Noto Sans', sans-serif;

    ::selection {
      background-color: ${colors.salmon};
      color: ${colors.cultured};
    }
  }

  body {
    margin: 0;
    padding: 0;
    text-rendering: optimizelegibility;
  }

  a {
    color: initial;
    text-decoration: none;
  }
`

// load google fonts 참고: https://csswizardry.com/2020/05/the-fastest-google-fonts/
class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang="ko">
          <meta charSet="UTF-8" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
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
          {/* Global site tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_MEASUREMENT_ID}', {
                  send_page_view: false
                });
              `,
            }}
          />
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
