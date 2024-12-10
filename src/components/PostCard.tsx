'use client'

import Link from 'next/link'

import { maxContentWidth, mediumWidth, smallWidth } from './Layout'
import ReadingTime from './ReadingTime'
import Tag from './Tag'

import styled from 'styled-components'
import { getAltFromThumbnailUrl, getReadingTime } from 'utils/misc'
import CreatedAt from './CreatedAt'
import { Post } from '@types'

interface Props {
  post: Post
}

const PostCard = ({ post }: Props) => {
  const { content, data } = post
  const thumbnailAlt = getAltFromThumbnailUrl(data.thumbnail)
  const readingTime = getReadingTime(content)

  return (
    <StyledArticle data={data}>
      <Link href={`/posts/${data.key}`}>
        <ThumbnailContainer>
          <Thumbnail
            data={data}
            className="Thumbnail"
            src={data.thumbnail}
            alt={`post card thumbnail ${thumbnailAlt}`}
            style={{ objectPosition: data.thumbnailPosition }}
          />
          <ReadingTime
            readingTime={readingTime}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
            }}
          />
        </ThumbnailContainer>
        <PostInformation>
          <h1>{data.title}</h1>
          <CreatedAt createdAt={data.createdAt} />

          {data.categories ? (
            <Badges>
              {data.categories.slice(0, 5).map((category) => (
                <Tag key={category} content={category} />
              ))}
            </Badges>
          ) : null}

          {data.tags ? (
            <Badges>
              {data.tags.slice(0, 5).map((tag) => (
                <Tag key={tag} content={tag} />
              ))}
            </Badges>
          ) : null}
        </PostInformation>
      </Link>
    </StyledArticle>
  )
}

export default PostCard

type StyleProps = Pick<Post, 'data'>

const StyledArticle = styled.article<StyleProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-column: ${({ data: { isRowLong } }) => (isRowLong ? '1 / 3' : null)};
  cursor: pointer;
  border-radius: 10px;
  z-index: 1;
  margin-top: 24px;

  @media (max-width: ${mediumWidth}px) {
    margin-top: 12px;
  }
`

const ThumbnailContainer = styled.div`
  position: relative;
`

const Thumbnail = styled.img<StyleProps>`
  object-fit: cover;
  width: 100%;
  height: ${({ data: { isRowLong } }) => (isRowLong ? '600px' : '300px')};
  border-radius: 10px;

  @media (max-width: ${maxContentWidth}px) {
    height: ${({ data: { isRowLong } }) => (isRowLong ? '350px' : '200px')};
  }

  @media (max-width: ${mediumWidth}px) {
    height: ${({ data: { isRowLong } }) => (isRowLong ? '280px' : '180px')};
  }

  @media (max-width: ${smallWidth}px) {
    height: ${({ data: { isRowLong } }) => (isRowLong ? '220px' : '140px')};
  }
`

const PostInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0;

  h1 {
    margin: 8px 0;
  }
`

const Badges = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 4px;
`
