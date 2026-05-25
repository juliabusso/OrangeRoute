import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const Colors = {
  light: {
    background: '#FFF4E6',
  },
  dark: {
    background: '#1F2937',
  },
};

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      />
    </QueryClientProvider>
  );
}