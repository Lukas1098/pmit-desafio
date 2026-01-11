import { useMemo } from 'react'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, createColumnHelper } from '@tanstack/react-table'
import type { Persona } from '@/lib/zod-definitions'

const columnHelper = createColumnHelper<Persona>()

export const usePersonasTable = (data: Persona[]) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('nombre', {
        header: 'Nombre',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('apellido', {
        header: 'Apellido',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('telefono', {
        header: 'Teléfono',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('direccion', {
        header: 'Dirección',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('estado', {
        header: 'Estado',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('tiene_deuda', {
        header: 'Deuda',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('id', {
        header: 'Acciones',
        cell: info => info.getValue(),
      }),
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    autoResetPageIndex: false
  })

  return table
}