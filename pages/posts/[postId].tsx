
import type { FC } from 'react'

import Layout from '../../components/Layout'

const Post: FC = () => {
  return (
    <Layout>
      
    </Layout>
  )
}

export default Post

export async function getStaticPaths() {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  // // Get the paths we want to pre-render based on posts
  // const paths = posts.map((post) => ({
  //   params: { id: post.id },
  // }))

  // // We'll pre-render only these paths at build time.
  // // { fallback: false } means other routes should 404.
  // return { paths, fallback: false }
}
