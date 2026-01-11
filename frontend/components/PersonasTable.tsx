'use client'

import Image from 'next/image'
import { usePersonas } from '@/hooks/usePersona'
import { PersonasListSkeleton } from './Skeletons'
import { useRouter } from 'next/navigation'
import { DeletePersona } from './DeletePersona'
import { usePersonasTable } from '@/hooks/usePersonasTable'

const estadoStyles: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  EN_PROCESO: 'bg-blue-100 text-blue-800',
  OBSERVADO: 'bg-orange-100 text-orange-800',
  APROBADO: 'bg-green-100 text-green-800',
  RECHAZADO: 'bg-red-100 text-red-800',
}

export function PersonasList() {
  const { data, isLoading, error } = usePersonas()
  const router = useRouter()
  const table = usePersonasTable(data ?? [])

  if (isLoading) return <PersonasListSkeleton />
  if (error)
    return (
      <p className="py-8 text-center text-sm text-red-500">
        Error al cargar personas
      </p>
    )

  return (
    <>
      <div className="mb-2 flex justify-start px-1 md:px-0 md:justify-end">
        <button className="ml-auto flex cursor-pointer items-center justify-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-sm text-black hover:bg-neutral-200" onClick={() => router.push('/new')}>
          Agregar persona
          {plusIcon}
        </button>
      </div>

      <div className="w-full rounded-lg border border-zinc-200 bg-[var(--background)]">
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-4 py-3">
          <h2 className="text-sm font-medium">Personas</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-zinc-500">
                  Persona
                </th>

                <th className="hidden px-4 py-3 text-left text-xs text-zinc-500 sm:table-cell">
                  Teléfono
                </th>

                <th className="hidden px-4 py-3 text-left text-xs text-zinc-500 md:table-cell">
                  Email
                </th>

                <th className="px-4 py-3 text-left text-xs text-zinc-500">
                  Estado
                </th>

                <th className="px-4 py-3 text-left text-xs text-zinc-500">
                  Deuda
                </th>

                <th className="px-4 py-3 text-center text-xs text-zinc-500">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200">
              {table.getRowModel().rows.map((row) => {
                const persona = row.original

                return (
                  <tr
                    key={persona.id}
                    className="transition-colors hover:bg-zinc-50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${persona.nombre}%20${persona.apellido}`}
                          alt="avatar"
                          width={32}
                          height={32}
                          className="h-8 w-8 shrink-0 rounded-full border"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium leading-tight">
                            {persona.nombre} {persona.apellido}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="hidden px-4 py-3 text-sm text-zinc-600 sm:table-cell">
                      {persona.telefono}
                    </td>

                    <td className="hidden max-w-[240px] truncate px-4 py-3 text-sm text-zinc-600 md:table-cell">
                      {persona.email}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${estadoStyles[persona.estado]
                          }`}
                      >
                        {persona.estado.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {persona.tiene_deuda ? (
                        <span className="text-xs font-medium text-red-600">
                          Con deuda
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-green-600">
                          Al día
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex gap-2">
                        <button
                          className="rounded-md px-2 py-1 text-xs hover:bg-zinc-100"
                          onClick={() => router.push(`/${persona.id}/edit`)}
                        >
                          {updateIcon}
                        </button>

                        <DeletePersona id={persona.id} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-sm">
          <span>
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-md px-3 py-1 text-xs bg-zinc-100 disabled:opacity-50 cursor-pointer hover:bg-zinc-200"
            >
              Anterior
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-md px-3 py-1 text-xs bg-zinc-100 disabled:opacity-50 cursor-pointer hover:bg-zinc-200"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const plusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
)

const updateIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 20h4l10.5-10.5a2.828 2.828 0 1 0-4-4L4 16v4" />
    <path d="M13.5 6.5l4 4" />
  </svg>
)