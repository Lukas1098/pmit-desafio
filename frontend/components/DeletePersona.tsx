'use client'

import { useState } from 'react'
import { useDeletePersona } from '@/hooks/usePersona'

interface DeletePersonaProps {
    id: number
}

export function DeletePersona({ id }: DeletePersonaProps) {
    const [showConfirm, setShowConfirm] = useState(false)
    const deletePersonaMutation = useDeletePersona()

    const handleDelete = async () => {
        try {
            await deletePersonaMutation.mutateAsync(id)
            setShowConfirm(false)
        } catch (error) {
            console.error('Error al eliminar la persona:', error)
        }
    }

    if (showConfirm) {
        return (
            <div className="flex items-center space-x-2">
                <button
                    className="cursor-pointer gap-1 rounded-full bg-neutral-100 px-3 py-1 text-sm text-black hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => setShowConfirm(false)}
                    disabled={deletePersonaMutation.isPending}
                >
                    Cancelar
                </button>
                <button
                    className="cursor-pointer gap-1 rounded-full bg-neutral-100 px-3 py-1 text-sm text-black hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={handleDelete}
                    disabled={deletePersonaMutation.isPending}
                >
                    {deletePersonaMutation.isPending ? (
                        <span>Eliminando...</span>
                    ) : (
                        <span>Eliminar</span>
                    )}
                </button>
            </div>
        )
    }

    return (
        <button
            className="cursor-pointer rounded-md px-2 py-1 text-xs hover:bg-zinc-100"
            onClick={() => setShowConfirm(true)}
            disabled={deletePersonaMutation.isPending}
        >
            {deleteIcon}
        </button>
    )
}

const deleteIcon = (
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
        <path d="M4 7h16" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
        <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>
)