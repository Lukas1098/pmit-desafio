'use client'

import { PersonasList } from '@/components/PersonasTable'

export default function Home() {
  return (
    <main className="py-16">
      <h1 className="mb-4 text-center text-2xl font-bold md:text-4xl">
        Gestión de Personas
      </h1>

      <p className="mx-auto mb-10 max-w-2xl px-2 text-center text-base text-zinc-500">
        Visualizá, creá, editá y eliminá personas almacenadas en la base de datos.
        Este listado se actualiza en tiempo real a partir de la API.
      </p>

      <PersonasList />
    </main>
  )
}