import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL =
  'https://orangeroute-oracle-production.up.railway.app';

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth: boolean = true
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // 🔥 Só adiciona token se precisar autenticação
  if (requiresAuth) {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Erro HTTP ${response.status}`
    );
  }

  return data;
}