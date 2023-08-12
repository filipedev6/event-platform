import { useForm } from 'react-hook-form'
import { Logo } from '../assets/Logo'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const CREATE_SUBSCRIBE_MUTATION = gql`
  mutation CreateSubscribe($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`

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
  const { register, handleSubmit } = useForm()
  const [createSubscribe, { loading }] = useMutation<SubscribeSchemaDataType>(
    CREATE_SUBSCRIBE_MUTATION,
  )

  async function handleSubscribeUser(data: SubscribeSchemaDataType) {
    const { email, name } = data

    await createSubscribe({
      variables: {
        name,
        email,
      },
    })
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
            action=""
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
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src="/code-mockup.png" className="mt-10" alt="" />
    </div>
  )
}
