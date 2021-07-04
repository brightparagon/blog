import Link from 'next/link'
import styled from '@emotion/styled'

import * as colors from 'constants/colors'

import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Container>
      <Navigation>
        <div className="Navigation__container">
          <Link href="/"><h1>brightparagon</h1></Link>
          {/* <ul>
            <li><Link href="/">Home</Link></li>
          </ul> */}
        </div>
      </Navigation>
      <Main>
        {children}
      </Main>
      <Footer>
        푸터를 뭘로 하지~ 🥱
      </Footer>
    </Container>
  )
}

export default Layout

const navigationHeight = 60
export const largeWidth = 1200
export const maxContentWidth = 1024
export const mediumWidth = 768
export const smallWidth = 480

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${navigationHeight}px;

  .Navigation__container {
    display: flex;
    width: ${maxContentWidth}px;
    height: 100%;

    h1 {
      cursor: pointer;

      :hover {
        color: ${colors.blackCoral};
      }
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      height: 100%;

      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 50px;
        height: 100%;
        cursor: pointer;
        font-size: 20px;
        font-weight: 600;

        a {
          text-decoration: none;
          color: initial;
        }
      }
    }
  }
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 100%;

  @media (max-width: ${maxContentWidth}px) {
    font-size: 14px;
  }

  @media (max-width: ${mediumWidth}px) {
    font-size: 12px;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.cultured};
  color: ${colors.eerieBlack};
  padding: 0 10%;
`
