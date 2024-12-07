import { blackCoral } from 'constants/colors'
import Link from 'next/link'
import styled from 'styled-components'

interface Props {
  maxContentWidth: number
  mediumWidth: number
}

export default function Navigation({ maxContentWidth, mediumWidth }: Props) {
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
      </div>
    </Styled>
  )
}

const navigationHeight = 60
const navigationMediumHeight = 40

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
    width: ${({ maxContentWidth }) => maxContentWidth}px;
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
