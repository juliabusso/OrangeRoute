import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../services/api';

export type Trilha = {
  idTrilhaCarreira: string;

  tituloTrilha: string;

  conteudoTrilha: string;
};

export function useTrilhas() {
  return useQuery({
    queryKey: ['trilhas'],

    queryFn: async () => {
      const response = await apiFetch('/trilhas');

      return response.data ?? [];
    },
  });
}