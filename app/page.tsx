import { getPostsFromDirectory } from 'utils/post-file'
import { HomePage } from './home-client'

export default async function Page() {
  const posts = await getPostsFromDirectory()

  return <HomePage posts={posts} />
}
