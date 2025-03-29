import { Post } from '@types'
import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'

export function isPublishReadyPost(filename: string) {
  return !filename.startsWith('pending')
}

export const getPostsFromDirectory = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = await fs.readdir(postsDirectory)
  const posts = fileNames
    .filter(isPublishReadyPost)
    .filter(fileName => fileName !== '.DS_Store')
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
