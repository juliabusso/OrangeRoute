import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch } from '../services/api';

type LoginData = {
  email: string;
  senha: string;
};

type LoginResponse = {
  token: string;
  usuario: {
    idUsuario: number;
    nomeUsuario: string;
    email: string;
    ativo: string;
    tipoUsuario: {
      idTipoUsuario: number;
      nomeTipoUsuario: string;
    };
  };
};

export function useLogin() {
  return useMutation({
    mutationFn: async ({
      email,
      senha,
    }: LoginData): Promise<LoginResponse> => {
      return await apiFetch(
  '/auth/login',
  {
    method: 'POST',
    body: JSON.stringify({
      email,
      senha,
    }),
  },
  false
);
    },

    onSuccess: async (data) => {
      const usuario = data.usuario;

      await AsyncStorage.multiSet([
        ['usuarioId', String(usuario.idUsuario)],
        ['usuarioNome', usuario.nomeUsuario],
        ['usuarioEmail', usuario.email],
        ['usuarioTipo', usuario.tipoUsuario.nomeTipoUsuario],
        ['usuarioAtivo', usuario.ativo],
        ['token', data.token],
        ['@isLogged', 'true'],
      ]);
    },
  });
}