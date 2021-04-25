import { FC } from 'react'
import Markdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import styled from '@emotion/styled'

import Layout from '../../components/Layout'

import type { GetStaticProps } from 'next'

interface Props {
  markdownFile: MarkdownFile
}

type MarkdownFile = {
  content: string
  data: { [key in string]: string }
}

const Example: FC<Props> = ({ markdownFile }) => {
  const { content, data } = markdownFile

  return (
    <Layout>
      <Article>
        <p>
          {dayjs(data.createdAt).format('MMMM D YYYY')}
        </p>
        <Markdown
          remarkPlugins={[[gfm, { singleTilde: false }]]}
          rehypePlugins={[rehypeRaw]}
          linkTarget="_blank"
        >
          {content}
        </Markdown>
      </Article>
    </Layout>
  )
}

export default Example

export const getStaticProps: GetStaticProps = async () => {
  const markdownExampleDirectory = path.join(process.cwd(), 'markdown/make-choices.ko.md')
  const file = await fs.readFile(markdownExampleDirectory, 'utf8')
  const matteredFile = matter(file)

  return {
    props: {
      markdownFile: {
        content: matteredFile.content,
        data: matteredFile.data,
      },
    },
  }
}

const Article = styled.article`
  display: flex;
  flex-direction: column;
  width: 768px;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0;
  margin-bottom: 80px;

  h1 {
    display: inline-block;
    margin: 50px 0;
    font-size: 50px;
    line-height: 60px;
  }

  p {
    font-weight: 400;
  }

  blockquote {
    position: relative;
    padding: 10px 50px;
    margin: 20px 0;

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      content: '';
      width: 8px;
      height: 100%;
      background-color: #a7a7a7;
    }
  }

  a {
    color: black;
  }

  iframe {
    width: 100%;
    height: 500px;
    margin: 20px 0;
  }
`
