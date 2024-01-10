'use client'

import { isAfter } from 'date-fns'
import styled from 'styled-components'

import Layout, { maxContentWidth, mediumWidth } from '../src/components/Layout'
import PostCard from '../src/components/PostCard'

interface Props {
  posts: Post[]
}

export const HomePage = ({ posts }: Props) => {
  return (
    <Layout>
      <PostsGrid>
        {posts
          .sort((a, b) => {
            if (isAfter(a.data.createdAt.replace(/-/g, '/'), b.data.createdAt.replace(/-/g, '/'))) {
              return -1
            }

            return 1
          })
          .map((post) => (
            <PostCard key={post.data.key} post={post} />
          ))}
      </PostsGrid>
    </Layout>
  )
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
    grid-gap: ${gridHorizontalGap * 0.8}px ${gridHorizontalGap * 0.8 * 2}px;
  }

  @media (max-width: ${mediumWidth}px) {
    grid-template-columns: repeat(2, calc(50% - ${gridHorizontalGap * 0.5}px));
    grid-gap: ${gridHorizontalGap * 0.5}px ${gridHorizontalGap * 0.5 * 2}px;
  }
`
