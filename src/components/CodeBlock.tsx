'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

interface Props {
  language: string
  children: string
}

const CodeBlock = ({ language, children }: Props) => {
  return (
    <SyntaxHighlighter language={language} style={atomOneDarkReasonable} showLineNumbers wrapLines PreTag="div">
      {children}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
