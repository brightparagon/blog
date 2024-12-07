'use client'

import Layout, { maxContentWidth } from 'components/Layout'
import { Paragraph } from 'components/Paragraph'
import styled from 'styled-components'

export function KyeongmoPage() {
  return (
    <Layout>
      <Main>
        <NameContainer>
          <Name>Kyeongmo Noh</Name>
          <Name>- Software Engineer</Name>
          <a href="https://www.instagram.com/brightparagon" rel="noreferrer">
            <Image src="/images/instagram.png" />
          </a>
        </NameContainer>
        <Paragraph>Seoul</Paragraph>
        <Contents>
          <Paragraph>한국어, 영어</Paragraph>
          <Paragraph>
            프랑스어, 일본어 <Image src="/images/loading.gif" />
          </Paragraph>
          <br />
          <Paragraph>사업의 0 to 1을 만들어내는 모든 것 탐구중</Paragraph>
          <Paragraph>심리학, 운동, 문학, 물리학, 여행</Paragraph>
        </Contents>
      </Main>
    </Layout>
  )
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: ${maxContentWidth}px;
  width: 100%;
  height: 100%;
`

const Name = styled.span`
  font-size: 18px;
  margin-right: 8px;
`

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`

const Image = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 4px;
`

const Contents = styled.div`
  margin-top: 12px;
  font-size: 18px;
  min-height: 60vh;
`
