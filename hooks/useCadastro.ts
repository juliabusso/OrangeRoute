import { useMutation } from '@tanstack/react-query';

import { apiFetch } from '../services/api';

type CadastroData = {
  nomeUsuario: string;
  email: string;
  senha: string;
  idTipoUsuario: number;
};

export function useCadastro() {
  return useMutation({
    mutationFn: async (data: CadastroData) => {
      return await apiFetch('/usuario', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  });
}