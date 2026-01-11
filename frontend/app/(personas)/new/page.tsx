import CreatePersona from '@/components/CreateEditPersona'

export default function NewPersonaPage() {
  return (
    <main className="py-16">
      <h1 className="mb-4 text-center text-2xl font-bold md:text-4xl">
        Crear nueva persona
      </h1>

      <p className="mx-auto mb-10 max-w-2xl px-2 text-center text-base text-zinc-500">
        Completá los campos para crear una nueva persona.
      </p>

      <CreatePersona />
    </main>
  )
}