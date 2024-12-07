'use client'

import * as colors from 'constants/colors'

import type { PropsWithChildren } from 'react'
import styled from 'styled-components'
import Footer from './Layout/Footer'
import Navigation from './Layout/Navigation'

export const maxContentWidth = 1024
export const mediumWidth = 768
export const smallWidth = 480

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Navigation maxContentWidth={maxContentWidth} mediumWidth={mediumWidth} />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}

export default Layout

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.cultured};
  color: ${colors.eerieBlack};
  padding: 0 32px;

  @media (max-width: ${maxContentWidth}px) {
    font-size: 14px;
  }

  @media (max-width: ${mediumWidth}px) {
    font-size: 12px;
    padding: 0 16px;
  }
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`
