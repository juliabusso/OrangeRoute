// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (name.trim()) {
      await AsyncStorage.setItem('@user_name', name);
      router.replace('/home'); // Navega para a tela Home usando Expo Router
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OrangeRoute</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome..."
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF4E6',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderColor: '#FF6B00',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#FF6B00',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
