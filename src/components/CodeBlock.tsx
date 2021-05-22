import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import type { FC, ReactNode } from 'react'

interface Props {
  language: string
  children: ReactNode
}

const CodeBlock: FC<Props> = ({ language, children }) => {
  return (
    <SyntaxHighlighter language={language} style={atomOneDarkReasonable} showLineNumbers wrapLines PreTag="div">
      {children}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
