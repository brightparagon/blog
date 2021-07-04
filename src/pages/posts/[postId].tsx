import Head from 'next/head'
import { FC, useEffect } from 'react'
import Markdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Layout, { maxContentWidth, mediumWidth, smallWidth } from 'components/Layout'
import GoogleMap from 'components/GoogleMap'
import ReadingTime from 'components/ReadingTime'
import CreatedAt from 'components/CreatedAt'
import Tag from 'components/Tag'

import { getReadingTime, getAltFromThumbnailUrl } from 'utils/misc'
import { blackCoral, eerieBlack } from 'constants/colors'
import { GA_MEASUREMENT_ID } from 'constants/env'
import { markdownOptions } from 'utils/markdown'

import type { GetStaticProps, GetStaticPaths } from 'next'

interface Props {
  post: Post
}

export const PostPage: FC<Props> = ({ post }) => {
  const { content, data } = post
  const thumbnailAlt = getAltFromThumbnailUrl(data.thumbnail)
  const readingTime = getReadingTime(content)

  useEffect(() => {
    gtag('event', 'page_view', {
      page_title: data.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      send_to: GA_MEASUREMENT_ID,
    })
  }, [])

  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
      </Head>
      <PostHead>
        {data.thumbnail ? (
          <img src={data.thumbnail} alt={thumbnailAlt} style={{ objectPosition: data.thumbnailPosition }} />
        ) : null}
        <div className="PostHead__Info">
          <CreatedAt createdAt={data.createdAt} />
          {data.categories ? (
            <Badges>
              {data.categories.slice(0, 5).map((category) => (
                <Tag key={category} content={category} color={eerieBlack} />
              ))}
            </Badges>
          ) : null}
          <ReadingTime readingTime={readingTime} />
        </div>
      </PostHead>
      {/* <FloatingCard></FloatingCard> */}
      <Article>
        <Markdown
          components={markdownOptions.components}
          remarkPlugins={[[gfm, { singleTilde: false }]]}
          rehypePlugins={[rehypeRaw]}
          linkTarget="_blank"
        >
          {content}
        </Markdown>
      </Article>
      <PostTail>
        {data.categories ? (
          <Badges>
            {data.categories.slice(0, 5).map((category) => (
              <Tag key={category} content={category} color={eerieBlack} />
            ))}
          </Badges>
        ) : null}
        {data.tags ? (
          <Badges
            css={css`
              margin-top: 8px;
            `}
          >
            {data.tags.slice(0, 5).map((tag) => (
              <Tag key={tag} content={tag} color={blackCoral} />
            ))}
          </Badges>
        ) : null}
        {data.place ? (
          <>
            <p>
              <span
                css={css`
                  color: ${blackCoral};
                `}
              >
                Written at
              </span>{' '}
              {data.place}
            </p>
            <GoogleMap place={data.place} />
          </>
        ) : null}
      </PostTail>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params === undefined) {
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
  const paths = fileNames
    .filter((filename) => !filename.startsWith('pending'))
    .map(async (filename) => {
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
  max-width: ${maxContentWidth}px;
  background-color: transparent;
  outline: none;

  img {
    object-fit: cover;
    width: 100%;
    height: 500px;

    @media (max-width: ${mediumWidth}px) {
      height: 300px;
    }

    @media (max-width: ${smallWidth}px) {
      height: 180px;
    }
  }

  .PostHead__Info {
    display: flex;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 10px;
    max-width: ${contentsWidth}px;
    width: 100%;
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
  max-width: ${contentsWidth}px;
  width: 100%;
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
    text-decoration: none;
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
  max-width: ${contentsWidth}px;
  width: 100%;
  margin-bottom: 80px;
  font-size: 20px;
  font-weight: 400;
`

const Badges = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
`
