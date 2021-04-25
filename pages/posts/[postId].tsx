import { promises as fs } from 'fs'
import path from 'path'

import Layout from '../../components/Layout'

import type { GetStaticPaths, GetStaticProps } from 'next'

const Post = () => {
  return (
    <Layout>
      
    </Layout>
  )
}

export default Post

// export const getStaticPaths: GetStaticPaths = async () => {
//   const postsDirectory = path.join(process.cwd(), 'posts')
//   const filenames = await fs.readdir(postsDirectory)

//   const posts = filenames.map(async (filename) => {
//     const filePath = path.join(postsDirectory, filename)
//     const fileContents = await fs.readFile(filePath, 'utf8')

//     // Generally you would parse/transform the contents
//     // For example you can transform markdown to HTML here

//     return {
//       filename,
//       content: fileContents,
//     }
//   })
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts: await Promise.all(posts),
//     },
//   }
// }

// export const getStaticProps: GetStaticProps = async () => {
  
// }
