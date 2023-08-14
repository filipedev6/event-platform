import { useForm } from 'react-hook-form'
import { Logo } from '../assets/Logo'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useCreateSubscribeMutation } from '../graphql/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotch } from '@phosphor-icons/react'

const SubscribeSchemaData = z.object({
  name: z.string({
    required_error: 'Name is required.',
  }),
  email: z.string({
    required_error: 'Email is required.',
  }),
})

type SubscribeSchemaDataType = z.infer<typeof SubscribeSchemaData>

export function Subscribe() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<SubscribeSchemaDataType>({
    resolver: zodResolver(SubscribeSchemaData),
  })

  const [createSubscribe, { loading }] = useCreateSubscribeMutation()

  async function handleSubscribeUser(data: SubscribeSchemaDataType) {
    const { email, name } = data

    const subscriberID = await createSubscribe({
      variables: {
        name,
        email,
      },
    })

    localStorage.setItem(
      '@ignite-lab-platform:user-1.0',
      JSON.stringify(subscriberID.data?.createSubscriber?.id),
    )
    navigate('/event')
  }

  return (
    <div className="min-h-screen bg-blur bg-no-repeat bg-cover flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{' '}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>

          <form
            onSubmit={handleSubmit(handleSubscribeUser)}
            className="flex flex-col gap-2 w-full"
          >
            <input
              className="bg-gray-900 rounded px-5 h-14 outline-none border border-transparent focus:border-green-500"
              type="text"
              placeholder="Seu nome completo"
              {...register('name')}
            />
            <input
              className="bg-gray-900 rounded px-5 h-14 outline-none border border-transparent focus:border-green-500"
              type="email"
              placeholder="Digite seu email"
              {...register('email')}
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              Garantir minha vaga
              {loading && <CircleNotch size={16} className="animate-spin" />}
            </button>
          </form>
        </div>
      </div>
      <img src="/code-mockup.png" className="mt-10" alt="" />
    </div>
  )
}
