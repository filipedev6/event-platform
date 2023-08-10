import { gql, useQuery } from '@apollo/client'
import { Lesson } from './Lesson'

const GET_LESSONS_QUERY = gql`
  query Assets {
    lessons(orderBy: availableAt_DESC, stage: PUBLISHED) {
      id
      slug
      title
      availableAt
      lessonType
    }
  }
`

interface GetLessonsQueryResponse {
  lessons: {
    id: string
    title: string
    availableAt: string
    slug: string
    lessonsType: 'class' | 'live'
  }[]
}

export function Sidebar() {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY)

  console.log(data)

  return (
    <aside className="w-87 bg-gray-700 p-6 border-l border-gray-600">
      <span className="text-2xl font-bold pb-6 mb-6 border-b border-gray-500 block">
        Cronograma das aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map((lesson) => {
          return (
            <Lesson
              title={lesson.title}
              type={lesson.lessonsType}
              availableAt={new Date(lesson.availableAt)}
              slug={lesson.slug}
              key={lesson.id}
            />
          )
        })}
      </div>
    </aside>
  )
}
