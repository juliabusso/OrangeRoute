// app/index.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    const verificarLogin = async () => {
      if (!rootNavigationState?.key) return;

      const isLogged = await AsyncStorage.getItem('@isLogged');
      if (isLogged === 'true') {
        router.replace('./(auth)/trilhas'); // vai pra área autenticada
      } else {
        router.replace('./(tabs)/login'); // vai pra tela de login
      }
    };

    verificarLogin();
  }, [rootNavigationState?.key]);

  return (
    <View style={styles.container}>
      <ActivityIndicator color="#FF6B00" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF4E6',
  },
});
