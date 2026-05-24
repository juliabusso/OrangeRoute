import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { requestNotificationPermissions } from '@/utils/notificationPermission';

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


  useEffect(() => {
    requestNotificationPermissions();
  }, []);


  return (
    <Stack
      screenOptions={{
        headerShown: false,

        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    />
  );
}