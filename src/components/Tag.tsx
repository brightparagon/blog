import styled from '@emotion/styled'

import { cultured, blackCoral } from '../constants/colors'

import type { FC } from 'react'

interface Props {
  className?: string
  content: string
  color?: string
}

const Tag: FC<Props> = ({ className, content, color = blackCoral }) => {
  return (
    <StyledSpan className={className} color={color}>
      {content}
    </StyledSpan>
  )
}

export default Tag

type StyledSpanProps = Pick<Props, 'color'>

const StyledSpan = styled.span<StyledSpanProps>`
  display: flex;
  align-items: center;
  padding: 3px 6px;
  margin: 2px 4px 2px 0;
  height: 26px;
  font-weight: 400;
  background-color: ${({ color }) => color};
  color: ${cultured};
  border-radius: 10px;
`
