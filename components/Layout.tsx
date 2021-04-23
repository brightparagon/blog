import styled from '@emotion/styled'

import { FC, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Container>
      <Navigation>
        <ul>
          <li><Link href="/">Home</Link></li>
        </ul>
      </Navigation>
      <Main>
        {children}
      </Main>
      <Footer>
        this is footer~
      </Footer>
    </Container>
  )
}

export default Layout

const navigationHeight = 60

const Navigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: ${navigationHeight}px;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100%;
      cursor: pointer;

      &:hover {
        background-color: ivory;
      }

      a {
        text-decoration: none;
        color: initial;
      }
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  display: flex;
  width: 768px;
  width: 100%;
  margin-top: ${navigationHeight}px;
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  background-color: #f5f5f5;
`
