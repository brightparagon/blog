type Post = {
  content: string
  data: PostData
}

type PostData = {
  key: string
  title: string
  createdAt: string
  thumbnail: string
  thumbnailPosition?: string
  place: string
  categories: string[]
  tags: string[]
}
