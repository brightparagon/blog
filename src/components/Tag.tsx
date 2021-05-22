/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { cultured, blackCoral } from '../../utils/colors'

import type { FC } from 'react'

interface Props {
  className?: string
  content: string
}

const Tag: FC<Props> = ({ className, content }) => {
  return (
    <span className={className} css={tagStyle}>
      {content}
    </span>
  )
}

export default Tag

const tagStyle = css`
  display: flex;
  align-items: center;
  padding: 3px 6px;
  margin-right: 4px;
  height: 100%;
  font-weight: 400;
  background-color: ${blackCoral};
  color: ${cultured};
  border-radius: 10px;
`
