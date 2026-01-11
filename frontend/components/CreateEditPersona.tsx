'use client'

import { useActionState, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPersona, updatePersona } from '@/app/actions/personas'
import { Persona, ActionResponse } from '@/lib/zod-definitions'
import { toast } from 'sonner'

interface PersonaFormProps {
    persona?: Persona
    isEditing?: boolean
}

const initialState: ActionResponse = {
    success: false,
    message: '',
    errors: undefined,
}

const getInitialFormData = (persona?: Persona) => ({
    nombre: persona?.nombre ?? '',
    apellido: persona?.apellido ?? '',
    email: persona?.email ?? '',
    telefono: persona?.telefono ?? '',
    direccion: persona?.direccion ?? '',
    estado: (persona?.estado ?? 'PENDIENTE') as
        | 'PENDIENTE'
        | 'EN_PROCESO'
        | 'OBSERVADO'
        | 'APROBADO'
        | 'RECHAZADO',
    tiene_deuda: persona?.tiene_deuda ?? false,
})

export default function CreateEditPersona({
    persona,
    isEditing = false,
}: PersonaFormProps) {
    const router = useRouter()

    const [formData, setFormData] = useState(() => getInitialFormData(persona))

    const [state, formAction, isPending] = useActionState<
        ActionResponse,
        FormData
    >(
        async (_, formData) => {
            const data = {
                nombre: formData.get('nombre') as string,
                apellido: formData.get('apellido') as string,
                email: formData.get('email') as string,
                telefono: formData.get('telefono') as string,
                direccion: formData.get('direccion') as string,
                estado: formData.get('estado') as
                    | 'PENDIENTE'
                    | 'EN_PROCESO'
                    | 'OBSERVADO'
                    | 'APROBADO'
                    | 'RECHAZADO',
                tiene_deuda: formData.get('tiene_deuda') === 'true',
            }

            if (isEditing) {
                const result = await updatePersona(Number(persona!.id), data)
                if (result.success) {
                    toast.success('Persona actualizada correctamente')
                    setTimeout(() => {
                        router.push('/')
                    }, 1000) 
                }
                return result
            } else {
                const result = await createPersona(data)
                if (result.success) {
                    toast.success('Persona creada correctamente')
                    setTimeout(() => {
                        router.push('/')
                    }, 1000) 
                }
                return result
            }
        },
        initialState
    )

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'tiene_deuda' ? value === 'true' : value,
        }))
    }

    return (
        <div className="mx-auto max-w-2xl px-4">
            <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="nombre"
                            className="mb-2 block text-sm font-medium text-zinc-700"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full border h-10 appearance-none shadow-none border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                            placeholder="Juan"
                            required
                        />
                        {state.errors?.nombre && (
                            <p className="mt-1 text-xs text-red-600">
                                {state.errors.nombre[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="apellido"
                            className="mb-2 block text-sm font-medium text-zinc-700"
                        >
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="w-full border h-10 appearance-none shadow-none border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                            placeholder="Pérez"
                            required
                        />
                        {state.errors?.apellido && (
                            <p className="mt-1 text-xs text-red-600">
                                {state.errors.apellido[0]}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border h-10 appearance-none shadow-none border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                        placeholder="juan.perez@ejemplo.com"
                        required
                    />
                    {state.errors?.email && (
                        <p className="mt-1 text-xs text-red-600">
                            {state.errors.email[0]}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="telefono"
                        className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full border h-10 appearance-none shadow-none border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                        placeholder="+54 11 1234-5678"
                        required
                    />
                    {state.errors?.telefono && (
                        <p className="mt-1 text-xs text-red-600">
                            {state.errors.telefono[0]}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="direccion"
                        className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                        Dirección
                    </label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        className="w-full border h-10 appearance-none shadow-none border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                        placeholder="Av. Corrientes 1234"
                        required
                    />
                    {state.errors?.direccion && (
                        <p className="mt-1 text-xs text-red-600">
                            {state.errors.direccion[0]}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="mb-4">
                        <label
                            htmlFor="estado"
                            className="mb-2 block text-sm font-medium text-zinc-700"
                        >
                            Estado
                        </label>
                        <select
                            id="estado"
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className="w-full border h-10 appearance-none shadow-none border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                            required
                        >
                            <option value="PENDIENTE">Pendiente</option>
                            <option value="EN_PROCESO">En proceso</option>
                            <option value="OBSERVADO">Observado</option>
                            <option value="APROBADO">Aprobado</option>
                            <option value="RECHAZADO">Rechazado</option>
                        </select>
                        {state.errors?.estado && (
                            <p className="mt-1 text-xs text-red-600">
                                {state.errors.estado[0]}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="tiene_deuda"
                            className="mb-2 block text-sm font-medium text-zinc-700"
                        >
                            ¿Tiene deuda?
                        </label>
                        <select
                            id="tiene_deuda"
                            name="tiene_deuda"
                            value={formData.tiene_deuda ? 'true' : 'false'}
                            onChange={handleChange}
                            className="w-full border h-10 appearance-none shadow-none border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                            required
                        >
                            <option value="false">No</option>
                            <option value="true">Sí</option>
                        </select>
                        {state.errors?.tiene_deuda && (
                            <p className="mt-1 text-xs text-red-600">
                                {state.errors.tiene_deuda[0]}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="cursor-pointer gap-1 rounded-full bg-neutral-100 px-3 py-1 text-sm text-black hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isPending}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="flex text-black cursor-pointer items-center justify-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-sm hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <span>Guardando...</span>
                        ) : (
                            <span>
                                {isEditing
                                    ? 'Actualizar persona'
                                    : 'Crear persona'}
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}