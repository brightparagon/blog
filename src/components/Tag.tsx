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
    <Styled className={className} color={color}>
      {content}
    </Styled>
  )
}

export default Tag

type StyledSpanProps = Pick<Props, 'color'>

const Styled = styled.div<StyledSpanProps>`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  margin: 2px 4px 2px 0;
  min-height: 26px;
  font-weight: 400;
  background-color: ${({ color }) => color};
  color: ${cultured};
  border-radius: 10px;
`
