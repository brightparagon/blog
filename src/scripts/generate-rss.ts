import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'
import RSS from 'rss'

type Post = {
  content: string
  data: PostData
}

type PostData = {
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

function isPublishReadyPost(filename: string) {
  return !filename.startsWith('pending')
}

function generateRSSFeed(posts: PostData[]): string {
  const feed = new RSS({
    title: 'Kyeongmo Noh',
    description: '일상에서 깨달은 것을 정리합니다.',
    site_url: 'https://www.brightparagon.me',
    feed_url: 'https://www.brightparagon.me/rss.xml',
    language: 'ko',
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description ?? '',
      url: `https://www.brightparagon.me/${post.key}`,
      date: post.createdAt,
    })
  })

  return feed.xml({ indent: true })
}

const getPostsFromDirectory = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = await fs.readdir(postsDirectory)
  const posts = fileNames.filter(isPublishReadyPost).map(async (filename) => {
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

async function generateRSSFile() {
  const posts = await getPostsFromDirectory()
  const rss = generateRSSFeed(
    posts.map((post) => {
      return post.data
    })
  )

  const rssPath = path.join(process.cwd(), 'public', 'rss.xml')
  fs.writeFile(rssPath, rss).then(() => {
    console.log('RSS feed generated at:', rssPath)
  })
}

generateRSSFile().catch((error) => {
  console.error('Failed to generate RSS feed:', error)
  process.exit(1)
})
