'use client'

import * as colors from 'constants/colors'
import { createGlobalStyle } from 'styled-components'

const CustomGlobalStyle = createGlobalStyle`
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

export function GlobalStyle() {
  return <CustomGlobalStyle />
}
