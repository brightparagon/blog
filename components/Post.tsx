/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import ReadingTime from '../components/ReadingTime'
import CreatedAt from '../components/CreatedAt'
import Tag from '../components/Tag'

import { getReadingTime } from '../utils/misc'
import { blackCoralRGB } from '../utils/colors'

import type { FC } from 'react'

interface Props {
  post: Post
}

const Post: FC<Props> = ({ post }) => {
  const { content, data } = post
  const thumbnailAlt = /\w+.jpg/.exec(data.thumbnail)?.[0].split('.')[0]
  const readingTime = getReadingTime(content)

  return (
    <article
      style={{ gridColumn: data.isRowLong ? '1 / 3' : undefined }}
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
        width: ${data.isRowLong ? '100%' : '480px'};
        height: ${data.isRowLong ? '740px' : '480px'};
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
          box-shadow: 0 3px 30px rgba(${blackCoralRGB}, 0.8);
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border-radius: 2px;
          z-index: -1;
          transition-property: opacity, transform;
          transition-duration: 200ms;
        }
      
        .PostHead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          width: 100%;
          height: 60px;
        }
      
        .Thumbnail {
          object-fit: cover;
          width: 100%;
          height: ${data.isRowLong ? '540px' : '280px'};
        }

        .PostInformation {
          display: flex;
          flex-direction: column;
          padding: 8px 0;

          h1 {
            margin: 8px 0;
          }

          .Categories, .Tags {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0;
            margin: 0;
            margin-top: 8px;
            list-style: none;
          }
        }
      `}
    >
      <div className="PostHead">
        <span>{data.key}</span>
        <ReadingTime readingTime={readingTime} />
      </div>
      <img
        className="Thumbnail"
        src={data.thumbnail}
        alt={`post thumbnail ${thumbnailAlt}`}
        style={{ objectPosition: data.thumbnailPosition }}
      />
      <div className="PostInformation">
        <h1>{data.title}</h1>
        <CreatedAt createdAt={data.createdAt} />
        {data.categories && (
          <ul className="Categories">
            {data.categories.slice(0, 5).map((category) => (
              <Tag content={category} />
            ))}
          </ul>
        )}
        {data.tags && (
          <ul className="Tags">
            {data.tags.slice(0, 5).map((tag) => (
              <Tag content={tag} />
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export default Post
