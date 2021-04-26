import { FC } from 'react'
import Markdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import styled from '@emotion/styled'

import Layout, { maxContentWidth } from '../../components/Layout'
import CodeBlock from '../../components/CodeBlock'
import GoogleMap from '../../components/GoogleMap'
import ReadingTime from '../../components/ReadingTime'
import CreatedAt from '../../components/CreatedAt'

import { getReadingTime } from '../../utils/misc'
import { blackCoral, eerieBlack } from '../../utils/colors'

import type { GetStaticProps, GetStaticPaths } from 'next'

interface Props {
  post: Post
}

const PostPage: FC<Props> = ({ post }) => {
  const { content, data } = post
  const thumbnailAlt = /\w+.jpg/.exec(data.thumbnail)?.[0].split('.')[0]
  const readingTime = getReadingTime(content)

  return (
    <Layout>
      <PostHead>
        {data.thumbnail && (
          <img src={data.thumbnail} alt={thumbnailAlt} style={{ objectPosition: data.thumbnailPosition }} />
        )}
        <div className="PostHead__Info">
          <CreatedAt createdAt={data.createdAt} />
          {data.categories && <span>{data.categories.join(', ')}</span>}
          <ReadingTime readingTime={readingTime} />
        </div>
      </PostHead>
      {/* <FloatingCard></FloatingCard> */}
      <Article>
        <Markdown
          components={{
            code: ({className, inline, children, ...props}) => {
              const classNameWithLanguage = className as string
              const match = /language-(\w+)/.exec(classNameWithLanguage ?? '')
          
              if (!inline && match) {
                return <CodeBlock language={match[1]} children={children.toString().replace(/\n$/, '')} {...props} />
              }
          
              return <code className={classNameWithLanguage} {...props} />
            }
          }}
          remarkPlugins={[[gfm, { singleTilde: false }]]}
          rehypePlugins={[rehypeRaw]}
          linkTarget="_blank"
        >
          {content}
        </Markdown>
      </Article>
      <PostTail>
        {data.tags && <span>{data.tags.join(', ')}</span>}
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

export default PostPage

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return {
      notFound: true,
    }
  }

  const markdownDirectory = path.join(process.cwd(), `posts/${context.params.postId}.ko.md`)
  const file = await fs.readFile(markdownDirectory, 'utf8')
  const matteredFile = matter(file)

  return {
    props: {
      post: {
        content: matteredFile.content,
        data: matteredFile.data,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = await fs.readdir(postsDirectory, 'utf8')
  const paths = fileNames.map(async (filename) => {
    const postPath = path.join(postsDirectory, filename)
    const post = await fs.readFile(postPath, 'utf8')
    const matteredPost = matter(post)

    return {
      params: {
        postId: matteredPost.data.key,
      },
    }
  })

  return {
    paths: await Promise.all(paths),
    fallback: false,
  }
}

const contentsWidth = 680

const PostHead = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${maxContentWidth}px;
  background-color: transparent;
  outline: none;

  img {
    object-fit: cover;
    width: 100%;
    height: 500px;
  }

  .PostHead__Info {
    display: flex;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 10px;
    width: ${contentsWidth}px;
    height: 30px;
    font-weight: 600;

    span {
      margin-right: 20px;
    }
  }
`

// const FloatingCard = styled.section`
//   position: fixed;
//   left: 0px;
//   top: 0px;
//   display: flex;
//   width: 300px;
//   height: 500px;
//   background-color: ${cultured};
//   z-index: 1;

//   &:hover::before {
//     opacity: 1;
//     transform: scale(1.009);
//   }

//   &::before {
//     position: absolute;
//     content: '';
//     opacity: 0.7;
//     box-shadow: 0 3px 30px rgb(0, 0, 0, 0.15);
//     top: -8px;
//     left: -8px;
//     right: -8px;
//     bottom: -8px;
//     border-radius: 2px;
//     z-index: -1;
//     transition-property: opacity, transform;
//     transition-duration: 200ms;
//   }
// `

const Article = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${contentsWidth}px;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0;
  margin-bottom: 40px;
  word-wrap: break-word;

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
      background-color: ${eerieBlack};
    }
  }

  a {
    color: ${blackCoral};
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
    background-color: ${blackCoral};
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
