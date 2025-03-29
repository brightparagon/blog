import { blackCoral } from 'constants/colors'
import Link from 'next/link'
import styled from 'styled-components'

interface Props {
  maxContentWidth: number
  mediumWidth: number
}

export default function Navigation({ maxContentWidth, mediumWidth }: Props) {
  const handleRssClick = async () => {
    const rssUrl = "https://www.brightparagon.me/rss.xml";

    try {
      await navigator.clipboard.writeText(rssUrl);
      alert("RSS URL을 복사했어요.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Styled maxContentWidth={maxContentWidth} mediumWidth={mediumWidth}>
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
        <ul>
          <li>
            <StyledButton onClick={handleRssClick}>
              <StyledImage src="/images/rss.png" alt="RSS" />
            </StyledButton>
          </li>
        </ul>
      </div>
    </Styled>
  )
}

const navigationHeight = 60
const navigationMediumHeight = 40

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 8px;
`

const StyledImage = styled.img`
  width: 32px;
  height: auto;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 4px;
`

const Styled = styled.nav<{
  maxContentWidth: number
  mediumWidth: number
}>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: ${navigationHeight}px;

  @media (max-width: ${({ mediumWidth }) => mediumWidth}px) {
    height: ${navigationMediumHeight}px;
  }

  .Navigation__container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    h4 {
      cursor: pointer;

      :hover {
        color: ${blackCoral};
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
        font-size: 18px;
        font-weight: 600;
        margin-right: 20px;

        a {
          text-decoration: none;
          color: initial;
        }

        @media (max-width: ${({ mediumWidth }) => mediumWidth}px) {
          font-size: 16px;
          margin-right: 16px;
        }
      }
    }
  }
`
