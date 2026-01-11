'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getPersonas, 
  deletePersona,
} from '@/app/actions/personas'

export const usePersonas = () => {
  return useQuery({
    queryKey: ['personas'],
    queryFn: getPersonas,
  })
}

//Invalido las queries para que se actualice la lista de personas
//Cuando se elimina una persona

export const useDeletePersona = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deletePersona,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] })
    },
  })
}