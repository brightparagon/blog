'use client'

import { cultured, mainThemeColor } from 'constants/colors'
import styled from 'styled-components'

interface Props {
  readingTime: string
}

const ReadingTime = ({ readingTime }: Props) => {
  return <StyledSpan>{readingTime}</StyledSpan>
}

export default ReadingTime

const StyledSpan = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  min-width: 48px;
  min-height: 24px;
  font-weight: 400;
  background-color: ${mainThemeColor};
  color: ${cultured};
  border-radius: 12px;
`
