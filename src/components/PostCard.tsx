import Link from 'next/link'
import styled from '@emotion/styled'

import ReadingTime from './ReadingTime'
import CreatedAt from './CreatedAt'
import Tag from './Tag'
import { maxContentWidth, mediumWidth, smallWidth } from './Layout'

import { getReadingTime, getAltFromThumbnailUrl } from 'utils/misc'
import { blackCoral, blackCoralRGB, eerieBlack } from 'constants/colors'

import type { FC } from 'react'


interface Props {
  post: Post
}

const PostCard: FC<Props> = ({ post }) => {
  const { content, data } = post
  const thumbnailAlt = getAltFromThumbnailUrl(data.thumbnail)
  const readingTime = getReadingTime(content)

  return (
    <Link href={`/posts/${data.key}`}>
      <StyledArticle data={data}>
        <PostHead>
          <ReadingTime readingTime={readingTime} />
        </PostHead>
        <Thumbnail
          data={data}
          className="Thumbnail"
          src={data.thumbnail}
          alt={`post card thumbnail ${thumbnailAlt}`}
          style={{ objectPosition: data.thumbnailPosition }}
        />
        <PostInformation>
          <h1>{data.title}</h1>
          <CreatedAt createdAt={data.createdAt} />
          {data.categories ? (
            <Badges>
              {data.categories.slice(0, 5).map((category) => (
                <Tag key={category} content={category} color={eerieBlack} />
              ))}
            </Badges>
          ) : null}
          {data.tags ? (
            <Badges>
              {data.tags.slice(0, 5).map((tag) => (
                <Tag key={tag} content={tag} color={blackCoral} />
              ))}
            </Badges>
          ) : null}
        </PostInformation>
      </StyledArticle>
    </Link>
  )
}

export default PostCard

type StyleProps = Pick<Post, 'data'>

const StyledArticle = styled.article<StyleProps>`
  position: relative;
  display: flex;
  flex-direction: column;

  grid-column: ${({ data: { isRowLong } }) => (isRowLong ? '1 / 3' : null)};
  margin-top: 40px;
  cursor: pointer;
  border-radius: 10px;
  z-index: 1;

  &:hover::before {
    opacity: 1;
    transform: scale(1.009);
  }

  &::before {
    position: absolute;
    content: '';
    opacity: 0;
    box-shadow: 0 6px 500px rgba(${blackCoralRGB}, 0.8);
    top: 0;
    left: -12px;
    right: -12px;
    bottom: -8px;
    border-radius: 16px;
    z-index: -1;
    transition-property: opacity, transform;
    transition-duration: 200ms;
  }
`

const PostHead = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 0;
  width: 100%;
  height: 60px;
`

const Thumbnail = styled.img<StyleProps>`
  object-fit: cover;
  width: 100%;
  height: ${({ data: { isRowLong } }) => isRowLong ? '460px' : '280px'};

  @media (max-width: ${maxContentWidth}px) {
    height: ${({ data: { isRowLong } }) => isRowLong ? '350px' : '200px'};
  }

  @media (max-width: ${mediumWidth}px) {
    height: ${({ data: { isRowLong } }) => isRowLong ? '280px' : '180px'};
  }

  @media (max-width: ${smallWidth}px) {
    height: ${({ data: { isRowLong } }) => isRowLong ? '220px' : '140px'};
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
  padding: 0;
  margin: 0;
  margin-top: 8px;
  list-style: none;
`
