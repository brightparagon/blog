import { MetadataRoute } from 'next'
import { getPostsFromDirectory } from 'utils/post-file'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostsFromDirectory()

  return posts.map((post) => {
    return {
      url: `https://www.brightparagon.me/${post.data.key}`,
      lastModified: post.data.createdAt,
      changeFrequency: 'yearly',
    }
  })
}
