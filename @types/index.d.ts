export type Post = {
  content: string
  data: PostData
}

export type PostData = {
  key: string
  title: string
  description?: string
  createdAt: string
  thumbnail: string
  thumbnailPosition?: string
  place: string
  categories: string[]
  tags: string[]
  isRowLong?: boolean
  images: string[]
}
