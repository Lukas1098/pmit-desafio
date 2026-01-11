'use server'

import { 
  createPersonaSchema,
  updatePersonaSchema,
  type Persona,
  type CreatePersonaData,
  type UpdatePersonaData,
  type ActionResponse
} from '@/lib/zod-definitions'

//Obtiene todas las personas
export async function getPersonas(): Promise<Persona[]> {
  try {
    const response = await fetch(process.env.API_URL + '/personas', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.BACKEND_SECRET ?? '',
      },
    })
    if (!response.ok) {
      throw new Error('Error al obtener las personas')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener las personas')
  }
} 

//Obtiene una persona por su ID
export async function getPersona(id: number): Promise<Persona> {
  try {
    const response = await fetch(`${process.env.API_URL}/personas/${id}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.BACKEND_SECRET ?? '',
      },
    })
    if (!response.ok) {
      throw new Error('Error al obtener la persona')
    }
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error(error)
    throw new Error('Error al obtener la persona')
  }
}

//Crea una nueva persona
export async function createPersona(
  data: CreatePersonaData
): Promise<ActionResponse> {

  const parsed = createPersonaSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Errores de validación, por favor revisá los campos',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/personas`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': process.env.BACKEND_SECRET ?? '' },
        body: JSON.stringify(parsed.data),
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error()
    }

    await response.json()
    return {
      success: true,
      message: 'Persona creada correctamente',
    }

  } catch {
    return {
      success: false,
      message: 'Error al crear la persona',
      error: 'INTERNAL_ERROR',
    }
  }
}

//Actualiza una persona
export async function updatePersona(
  id: number,
  data: UpdatePersonaData
): Promise<ActionResponse> {

  if (!Number.isInteger(id) || id <= 0) {
    return {
      success: false,
      message: 'ID inválido',
    }
  }

  const parsed = updatePersonaSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Errores de validación, por favor revisá los campos',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/personas/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': process.env.BACKEND_SECRET ?? '' },
        body: JSON.stringify(parsed.data),
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error()
    }

    await response.json()
    return {
      success: true,
      message: 'Persona actualizada correctamente',
    }

  } catch {
    return {
      success: false,
      message: 'Error al actualizar la persona',
      error: 'INTERNAL_ERROR',
    }
  }
}

//Elimina una persona
export async function deletePersona(
  id: number
): Promise<ActionResponse> {

  if (!Number.isInteger(id) || id <= 0) {
    return {
      success: false,
      message: 'ID inválido',
    }
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/personas/${id}`,
      {
        method: 'DELETE',
        cache: 'no-store',
        headers: { 'X-API-Key': process.env.BACKEND_SECRET ?? '' },
      }
    )

    if (!response.ok) {
      throw new Error()
    }

    await response.json()
    return {
      success: true,
      message: 'Persona eliminada correctamente',
    }
  } catch {
    return {
      success: false,
      message: 'Error al eliminar la persona',
      error: 'INTERNAL_ERROR',
    }
  }
}