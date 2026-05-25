import React from 'react';

import { Tabs } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { useColorScheme } from 'react-native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Colors } from '../../constants/theme';

const queryClient = new QueryClient();

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  const theme = Colors[colorScheme ?? 'light'];

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: theme.primary,

          tabBarInactiveTintColor: theme.icon,

          tabBarStyle: {
            backgroundColor: theme.background,

            borderTopWidth: 0,

            elevation: 5,

            height: 60,
          },

          tabBarLabelStyle: {
            fontSize: 13,

            fontWeight: '600',

            marginBottom: 6,
          },
        }}
      >
        <Tabs.Screen
          name="login"
          options={{
            title: 'Login',

            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={
                  focused
                    ? 'log-in'
                    : 'log-in-outline'
                }
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="cadastro"
          options={{
            title: 'Cadastro',

            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={
                  focused
                    ? 'person-add'
                    : 'person-add-outline'
                }
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}