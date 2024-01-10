'use client'

import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import gfm from 'remark-gfm'

import { markdownOptions } from 'utils/markdown'

interface Props {
  contents: string
}

export default function Contents({ contents }: Props) {
  return (
    <Markdown
      components={markdownOptions.components}
      remarkPlugins={[[gfm, { singleTilde: false }]]}
      rehypePlugins={[rehypeRaw]}
      linkTarget="_blank"
    >
      {contents}
    </Markdown>
  )
}
