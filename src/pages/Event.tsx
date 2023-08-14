import { Header } from '../components/Header'
import { NotSelectedVideo } from '../components/NotSelectedVideo'
import { Sidebar } from '../components/Sidebar'
import { Video } from '../components/Video'
import { Navigate, useParams } from 'react-router-dom'

export function Event() {
  const { slug } = useParams<{ slug: string }>()
  const subscriberID = localStorage.getItem('@ignite-lab-platform:user-1.0')

  if (!subscriberID) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {slug ? <Video lessonSlug={slug} /> : <NotSelectedVideo />}
        <Sidebar />
      </main>
    </div>
  )
}
