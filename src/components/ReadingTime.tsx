/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { salmon, cultured } from '../../utils/colors'

import type { FC } from 'react'

interface Props {
  readingTime: string
}

const ReadingTime: FC<Props> = ({ readingTime }) => {
  return (
    <span css={readingTimeStyle}>{readingTime}</span>
  )
}

export default ReadingTime

const readingTimeStyle = css`
  display: flex;
  align-items: center;
  padding: 3px 6px;
  height: 100%;
  font-weight: 400;
  background-color: ${salmon};
  color: ${cultured};
  border-radius: 10px;
`
