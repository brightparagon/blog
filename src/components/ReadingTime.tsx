'use client'

import { cultured, mainThemeColor } from 'constants/colors'
import styled, { CSSProperties } from 'styled-components'

interface Props {
  readingTime: string
  style?: CSSProperties
}

const ReadingTime = ({ readingTime, ...props }: Props) => {
  return <StyledSpan {...props}>{readingTime}</StyledSpan>
}

export default ReadingTime

const StyledSpan = styled.div`
  display: flex;
  align-items: center;
  min-width: 48px;
  min-height: 24px;
  font-weight: 400;
  background-color: ${mainThemeColor};
  color: ${cultured};
  border-radius: 12px;
  padding: 6px 10px;
`
