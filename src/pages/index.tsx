import styled from '@emotion/styled'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dayjs from 'dayjs'

import Layout, { maxContentWidth, mediumWidth } from '../components/Layout'
import PostCard from '../components/PostCard'

import type { GetStaticProps } from 'next'
import { FC } from 'react'

interface Props {
  posts: Post[]
}

export const Home: FC<Props> = ({ posts }) => {
  return (
    <Layout>
      <PostsGrid>
        {posts
          .sort((a, b) => {
            if (dayjs(a.data.createdAt).isAfter(b.data.createdAt)) {
              return -1
            }

            return 1
          })
          .map((post) => (
            <PostCard key={post.data.key} post={post} />
          ))
        }
      </PostsGrid>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = await fs.readdir(postsDirectory)
  const posts = fileNames
    .filter((filename) => !filename.startsWith('pending'))
    .map(async (filename) => {
      const postPath = path.join(postsDirectory, filename)
      const post = await fs.readFile(postPath, 'utf8')
      const matteredPost = matter(post)

      return {
        content: matteredPost.content,
        data: matteredPost.data,
      }
    })

  return {
    props: {
      posts: await Promise.all(posts),
    },
  }
}

const gridHorizontalGap = 20

const PostsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, calc(50% - ${gridHorizontalGap}px));
  grid-gap: ${gridHorizontalGap}px ${gridHorizontalGap * 2}px;
  grid-auto-rows: auto;
  max-width: ${maxContentWidth}px;

  @media (max-width: ${maxContentWidth}px) {
    grid-template-columns: repeat(2, calc(50% - ${gridHorizontalGap * 0.8}px));
    grid-gap: ${gridHorizontalGap * 0.8}px ${(gridHorizontalGap * 0.8) * 2}px;
  }

  @media (max-width: ${mediumWidth}px) {
    grid-template-columns: repeat(2, calc(50% - ${gridHorizontalGap * 0.5}px));
    grid-gap: ${gridHorizontalGap * 0.5}px ${(gridHorizontalGap * 0.5) * 2}px;
  }
`
