import { FC } from 'react'
import Markdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import styled from '@emotion/styled'

import { getReadingTime } from '../../utils/misc'

import Layout from '../../components/Layout'
import GoogleMap from '../../components/GoogleMap'

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
  const thumbnailAlt = /\w+.jpg/.exec(data.thumbnail)?.[0].split('.')[0]
  const readingTime = getReadingTime(content)

  return (
    <Layout>
      <PostHead>
        {data.thumbnail && (
          <img src={data.thumbnail} alt={thumbnailAlt} />
        )}
        <p>{dayjs(data.createdAt).format('MMMM D YYYY')} <div>{readingTime}</div></p>
      </PostHead>
      <Article>
        <Markdown
          remarkPlugins={[[gfm, { singleTilde: false }]]}
          rehypePlugins={[rehypeRaw]}
          linkTarget="_blank"
        >
          {content}
        </Markdown>
      </Article>
      <PostTail>
        <p>Written at {data.place}</p>
        <GoogleMap place={data.place} />
      </PostTail>
    </Layout>
  )
}

export default Example

export const getStaticProps: GetStaticProps = async () => {
  const markdownExampleDirectory = path.join(process.cwd(), 'markdown/learned-from-sk.ko.md')
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

const contentsWidth = 680

const PostHead = styled.section`
  display: flex;
  flex-direction: column;
  width: 1024px;

  img {
    object-fit: cover;
    width: 100%;
    height: 600px;
  }

  p {
    display: flex;
    align-items: center;
    height: 30px;
    font-weight: 600;

    div {
      display: flex;
      align-items: center;
      margin-left: 20px;
      padding: 3px 6px;
      height: 100%;
      font-weight: 400;
      background-color: #22eb2c;
      color: white;
      border-radius: 10px;
    }
  }
`

const Article = styled.article`
  display: flex;
  flex-direction: column;
  width: ${contentsWidth}px;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0;
  margin-bottom: 40px;
  word-wrap: break-word;
  text-rendering: optimizelegibility;

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

  img {
    width: 100%;
    height: auto;
  }
`

const PostTail = styled.section`
  display: flex;
  flex-direction: column;
  width: ${contentsWidth}px;
  margin-bottom: 80px;
  font-size: 20px;
  font-weight: 400;
`
