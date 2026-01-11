import CreatePersona from '@/components/CreateEditPersona'
import { getPersona } from '@/app/actions/personas'

export default async function EditIssuePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const persona = await getPersona(parseInt(id))
  
  return (
    <main className="py-16">
      <h1 className="mb-4 text-center text-2xl font-bold md:text-4xl">
        Editar persona
      </h1>

      <p className="mx-auto mb-10 max-w-2xl px-2 text-center text-base text-zinc-500">
        Completá los campos para editar la persona.
      </p>

      <CreatePersona persona={persona} isEditing={true} />
    </main>
  )
}