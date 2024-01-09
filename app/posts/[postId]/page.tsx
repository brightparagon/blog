import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { PostPage } from './post-client'

// TODO: ko 부분 변수화 i18n
const getPost = async (postId: string) => {
  const markdownDirectory = path.join(process.cwd(), `posts/${postId}.ko.md`)
  const file = await fs.readFile(markdownDirectory, 'utf8')
  const matteredFile = matter(file)

  return {
    content: matteredFile.content,
    data: matteredFile.data,
  } as Post
}

export default async function Page({
  params,
}: {
  params: {
    postId: string
  }
}) {
  const post = await getPost(params.postId)

  return <PostPage post={post} />
}

export const dynamicParams = false

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = await fs.readdir(postsDirectory, 'utf8')
  const paths = fileNames
    .filter((filename) => !filename.startsWith('pending'))
    .map(async (filename) => {
      const postPath = path.join(postsDirectory, filename)
      const post = await fs.readFile(postPath, 'utf8')
      const matteredPost = matter(post)

      return {
        postId: matteredPost.data.key,
      }
    })

  return await Promise.all(paths)
}

type MetadataProps = {
  params: { postId: string }
}
export async function generateMetadata({ params }: MetadataProps) {
  const { postId } = params
  const postsDirectory = path.join(process.cwd(), 'posts')
  // const postPath = path.join(postsDirectory, postId)
  const postPath = path.join(postsDirectory, `${postId}.ko.md`)
  const post = await fs.readFile(postPath, 'utf8')
  const matteredPost = matter(post)
  const data = matteredPost.data as PostData

  return {
    title: data.title,
    openGraph: {
      title: data.title,
      description: `${data.description} ${data.tags.join(', ')}`,
      url: `https://www.brightparagon.me/posts/${data.key}`,
      siteName: `Kyeongmo Noh`,
      images: [
        {
          url: data.thumbnail,
          width: 800,
          height: 600,
        },
      ],
      type: 'website',
    },
  }
}
