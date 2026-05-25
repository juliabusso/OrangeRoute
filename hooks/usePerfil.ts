import { useMutation, useQuery } from '@tanstack/react-query';

import { apiFetch } from '../services/api';

export function usePerfil(id: string | null) {
  return useQuery({
    queryKey: ['perfil', id],

    enabled: !!id,

    queryFn: async () => {
      const response = await apiFetch(`/usuario/${id}`);

      return response.usuario ?? response;
    },
  });
}

export function useAtualizarPerfil() {
  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id: number;
      body: any;
    }) => {
      return await apiFetch(`/usuario/${id}`, {
        method: 'PUT',

        body: JSON.stringify(body),
      });
    },
  });
}

export function useExcluirConta() {
  return useMutation({
    mutationFn: async (id: number) => {
      return await apiFetch(`/usuario/${id}`, {
        method: 'DELETE',
      });
    },
  });
}