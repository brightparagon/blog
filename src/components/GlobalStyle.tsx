'use client'

import { createGlobalStyle } from 'styled-components'

const CustomGlobalStyle = createGlobalStyle`
   * {
    box-sizing: border-box;
    font-family: 'Apple SD Gothic Neo', 'Noto Sans', sans-serif;
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
