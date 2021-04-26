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
  data: MarkdownData
}
type MarkdownData = {
  key: string
  title: string
  createdAt: string
  thumbnail: string
  place: string
  categories: string[]
  tags: string[]
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
        <div className="PostHead__Info">
          <span>{dayjs(data.createdAt).format('MMMM D YYYY')}</span>
          {data.categories && <span>{data.categories.join(', ')}</span>}
          <div className="ReadingTime">{readingTime}</div>
        </div>
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
        {data.place && (
          <>
            <p>Written at {data.place}</p>
            <GoogleMap place={data.place} />
          </>
        )}
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1024px;
  background-color: transparent;
  outline: none;
  /* z-index: 1; */

  /* &:hover::before {
    opacity: 1;
    transform: scale(1.009);
  }

  &::before {
    position: absolute;
    content: '';
    opacity: 0.8;
    box-shadow: 0 3px 30px rgb(0, 0, 0, 0.15);
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 2px;
    z-index: -1;
    transition-property: opacity, transform;
    transition-duration: 200ms;
  } */

  img {
    object-fit: cover;
    width: auto;
    max-height: 600px;
  }

  .PostHead__Info {
    display: flex;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 10px;
    width: 680px;
    height: 30px;
    font-weight: 600;

    span {
      margin-right: 20px;
    }

    .ReadingTime {
      display: flex;
      align-items: center;
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
    margin-top: 10px;
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
      width: 4px;
      height: 100%;
      background-color: black;
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

  hr {
    margin: 20px 0;
    width: 100%;
    height: 2px;
    background-color: #a5a5a5;
    border: none;
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
