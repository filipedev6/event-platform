import { Lesson } from './Lesson'
import { useGetLessonsQuery } from '../graphql/generated'

export function Sidebar() {
  const { data } = useGetLessonsQuery()

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
              type={lesson.lessonType}
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
