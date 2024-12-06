'use client'

import styled from 'styled-components'
import { cultured, eerieBlack } from '../constants/colors'

interface Props {
  className?: string
  content: string
  color?: string
}

const Tag = ({ className, content, color = eerieBlack }: Props) => {
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
  padding: 6px 12px;
  margin: 2px 4px 2px 0;
  height: 26px;
  font-weight: 400;
  background-color: ${({ color }) => color};
  color: ${cultured};
  border-radius: 10px;
`
