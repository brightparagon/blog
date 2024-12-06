import Layout from 'components/Layout'
import { useEffect } from 'react'

export function ErrorPage({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Layout>
      <h2>에러가 생겼어요 🥲🥲🥲</h2>
    </Layout>
  )
}
