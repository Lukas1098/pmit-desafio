import { z } from 'zod'

//Valida que el campo no este vacio y tenga entre min y max caracteres
export const nonEmptyString = (field: string, min = 2, max = 100) =>
  z
    .string()
    .trim()
    .min(min, `${field} debe tener al menos ${min} caracteres`)
    .max(max, `${field} no puede superar los ${max} caracteres`)

const estadoEnum = z.enum([
  'PENDIENTE',
  'EN_PROCESO',
  'OBSERVADO',
  'APROBADO',
  'RECHAZADO',
])

export const personaSchema = z.object({
  id: z
    .number()
    .int()
    .positive('ID debe ser positivo'),

  nombre: nonEmptyString('Nombre', 2, 50).regex(
    /^[a-zA-ZÀ-ÿ\s'-]+$/,
    'Nombre contiene caracteres inválidos'
  ),

  apellido: nonEmptyString('Apellido', 2, 50).regex(
    /^[a-zA-ZÀ-ÿ\s'-]+$/,
    'Apellido contiene caracteres inválidos'
  ),

  email: z
    .string()
    .trim()
    .email('Email inválido')
    .max(254, 'Email demasiado largo'),

  telefono: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s/g, ''))
    .pipe(
      z.string()
        .regex(
          /^\+?[0-9\-()]{7,20}$/,
          'Teléfono inválido'
        )
        .min(7, 'Teléfono debe tener al menos 7 dígitos')
        .max(20, 'Teléfono no puede superar los 20 caracteres')
    ),

  estado: estadoEnum,

  tiene_deuda: z.boolean(),

  direccion: nonEmptyString('Dirección', 5, 200),
}).strict()

export const createPersonaSchema = personaSchema.omit({
  id: true,
})

export const updatePersonaSchema = createPersonaSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: 'Debe enviarse al menos un campo para actualizar' }
  )

export type Persona = z.infer<typeof personaSchema>
export type CreatePersonaData = z.infer<typeof createPersonaSchema>
export type UpdatePersonaData = z.infer<typeof updatePersonaSchema>

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}