import { HomePage } from './home-client'

import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { isPublishReadyPost } from 'utils/post-file'

const getPosts = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = await fs.readdir(postsDirectory)
  const posts = fileNames
    .filter(isPublishReadyPost)
    .map(async (filename) => {
      const postPath = path.join(postsDirectory, filename)
      const post = await fs.readFile(postPath, 'utf8')
      const matteredPost = matter(post)

      return {
        content: matteredPost.content,
        data: matteredPost.data,
      }
    })

  return (await Promise.all(posts)) as Post[]
}

export default async function Page() {
  const posts = await getPosts()

  return <HomePage posts={posts} />
}
