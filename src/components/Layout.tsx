'use client'

import Link from 'next/link'

import * as colors from 'constants/colors'

import type { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Navigation>
        <div className="Navigation__container">
          <ul>
            <li>
              <Link href="/">
                <h4>Home</h4>
              </Link>
            </li>
            <li>
              <Link href="/kyeongmo">
                <h4>Kyeongmo Noh</h4>
              </Link>
            </li>
          </ul>
        </div>
      </Navigation>
      <Main>{children}</Main>
      <Footer>푸터푸터</Footer>
    </Container>
  )
}

export default Layout

const navigationHeight = 60
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

    h4 {
      cursor: pointer;

      :hover {
        color: ${colors.blackCoral};
      }
    }

    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      height: 100%;

      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        cursor: pointer;
        font-size: 17px;
        font-weight: 600;
        margin-right: 20px;

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
