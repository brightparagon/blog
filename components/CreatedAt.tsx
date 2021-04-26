import dayjs from 'dayjs'

import type { FC } from 'react'

interface Props {
  className?: string
  createdAt: string
}

const CreatedAt: FC<Props> = ({ className, createdAt }) => {
  return (
    <span className={className}>
      {dayjs(createdAt).format('MMMM D YYYY h:mma')}
    </span>
  )
}

export default CreatedAt
