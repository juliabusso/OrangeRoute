import { useMutation } from '@tanstack/react-query';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../services/api';

export function useUploadFoto() {
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(
        `${API_URL}/usuario/${id}/foto`,
        {
          method: 'PUT',

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || 'Erro upload foto'
        );
      }

      return data;
    },
  });
}