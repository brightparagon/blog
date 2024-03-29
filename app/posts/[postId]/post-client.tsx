'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import Layout, { maxContentWidth, mediumWidth, smallWidth } from 'components/Layout'

import { blackCoral, eerieBlack, salmon } from 'constants/colors'
import { GA_MEASUREMENT_ID } from 'constants/env'
import { getAltFromThumbnailUrl, getReadingTime } from 'utils/misc'

import Contents from 'components/Contents'
import CreatedAt from 'components/CreatedAt'
import ReadingTime from 'components/ReadingTime'
import Tag from 'components/Tag'
import styled from 'styled-components'

const DynamicGoogleMap = dynamic(() => import('components/GoogleMap'), {
  loading: () => <p>Loading...</p>,
})

interface Props {
  post: Post
}

export const PostPage = ({ post }: Props) => {
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
      <Article>
        <Contents contents={content} />
      </Article>

      {data.images != null ? (
        <>
          {data.images.map((imageUrl) => {
            return (
              <ImageWrapper key={imageUrl}>
                <img
                  className="fixedImage"
                  width={contentsWidth}
                  height={contentsWidth}
                  src={imageUrl}
                  alt={imageUrl}
                />
              </ImageWrapper>
            )
          })}
        </>
      ) : null}

      <PostTail>
        {data.categories ? (
          <Badges>
            {data.categories.slice(0, 5).map((category) => (
              <Tag key={category} content={category} color={eerieBlack} />
            ))}
          </Badges>
        ) : null}

        {data.tags ? (
          <Badges $marginTop={8}>
            {data.tags.slice(0, 5).map((tag) => (
              <Tag key={tag} content={tag} color={blackCoral} />
            ))}
          </Badges>
        ) : null}

        {data.place ? (
          <>
            <p>
              <ColoredSpan color={blackCoral}>Written at</ColoredSpan> {data.place}
            </p>
            <DynamicGoogleMap place={data.place} />
          </>
        ) : null}
      </PostTail>
    </Layout>
  )
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

const Article = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: ${contentsWidth}px;
  width: 100%;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0;
  margin-bottom: 40px;
  word-wrap: break-word;

  h1 {
    display: inline-block;
    margin: 50px 0;
    font-size: 46px;
    line-height: 56px;
  }

  p {
    font-weight: 400;
  }

  blockquote {
    position: relative;
    padding: 0 50px;
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
    color: ${salmon};
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

const ColoredSpan = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`

const PostTail = styled.section`
  display: flex;
  flex-direction: column;
  max-width: ${contentsWidth}px;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 80px;
  font-size: 20px;
  font-weight: 400;
`

const Badges = styled.ul<{ $marginTop?: number }>`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
  margin-top: ${({ $marginTop }) => $marginTop}px;
`

const ImageWrapper = styled.div`
  width: ${contentsWidth}px;
  position: relative;

  .fixedImage {
    object-fit: contain !important;
    position: relative !important;
    height: auto !important;
  }
`
