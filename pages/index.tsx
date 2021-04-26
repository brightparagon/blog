import styled from '@emotion/styled'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Layout, { maxContentWidth } from '../components/Layout'
import Post from '../components/Post'

import type { GetStaticProps } from 'next'
import { FC } from 'react'
import { salmon } from '../utils/colors'

interface Props {
  posts: Post[]
}

// TODO: createdAt 순으로 내림차순 정렬

const Home: FC<Props> = ({ posts }) => {
  return (
    <Layout>
      <PostsGrid>
        {posts.map((post) => (
          <Post key={post.data.key} post={post} />
        ))}
      </PostsGrid>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = await fs.readdir(postsDirectory)

  const posts = fileNames.map(async (filename) => {
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

const PostsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px 20px;
  grid-auto-rows: 500px;
  width: ${maxContentWidth}px;
`
