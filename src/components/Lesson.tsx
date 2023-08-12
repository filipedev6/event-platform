import { Link, useParams } from 'react-router-dom'
import { CheckCircle, Lock } from '@phosphor-icons/react'

import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'class' | 'live'
}

export function Lesson(props: LessonProps) {
  const isLessonAvaible = isPast(props.availableAt)
  const availableDateFormatted = format(
    props.availableAt,
    "EEEE ' • ' d ' de ' MMMM ' • ' k'h'mm ",
    {
      locale: ptBR,
    },
  )

  const { slug } = useParams<{ slug: string }>()
  const isSelectedSlugLesson = slug === props.slug

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        data-active={isSelectedSlugLesson}
        className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-all data-[active=true]:bg-green-500 group"
      >
        <header className="flex items-center justify-between">
          {isLessonAvaible ? (
            <span className="text-sm text-blue-500 font-medium flex items-center gap-x-2 group-data-[active=true]:text-white">
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-x-2 group-data-[active=true]:text-white">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className="uppercase text-xs rounded px-2 py-0.5 text-white border border-green-300 group-data-[active=true]:border-white">
            {props.type === 'live' ? 'AO VIVO' : 'AULA PRATICA'}
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block group-data-[active=true]:text-white">
          {props.title}
        </strong>
      </div>
    </Link>
  )
}
