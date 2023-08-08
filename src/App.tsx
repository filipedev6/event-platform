import { useQuery, gql } from "@apollo/client"

const GET_LESSONS_QUERY = gql`
  query Assets {
  lessons {
    id
    slug
    title
  }
}
`

interface Lesson {
  id: string
  title: string
  slug: string
}

function App() {
  const { data } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY)

  console.log(data)

  return (
    <ul>
      {
        data?.lessons.map((lesson) => {
          return (
            <li key={lesson.id}>{lesson.title}</li>
          )
        })
      }
    </ul>
  )
}

export default App