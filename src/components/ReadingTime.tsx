import styled from '@emotion/styled'

import { salmon, cultured } from 'constants/colors'

import type { FC } from 'react'

interface Props {
  readingTime: string
}

const ReadingTime: FC<Props> = ({ readingTime }) => {
  return (
    <StyledSpan>{readingTime}</StyledSpan>
  )
}

export default ReadingTime

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  padding: 3px 6px;
  min-width: 50px;
  height: 26px;
  font-weight: 400;
  background-color: ${salmon};
  color: ${cultured};
  border-radius: 10px;
`
