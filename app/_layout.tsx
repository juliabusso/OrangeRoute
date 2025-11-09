import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
    <Stack
      screenOptions={{
        headerShown: false, // oculta o header
        contentStyle: { backgroundColor: theme.background }, // aplica a cor de fundo global
      }}
    >
    </Stack>
  );
}
