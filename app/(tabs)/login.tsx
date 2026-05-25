import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  useColorScheme,
} from 'react-native';

import { useRouter } from 'expo-router';

import { useLogin } from '../../hooks/useLogin';
import { Colors } from '../../constants/theme';

export default function LoginScreen() {
  const router = useRouter();

  const colorScheme = useColorScheme();

  const theme = Colors[colorScheme ?? 'light'];

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const loginMutation = useLogin();

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await loginMutation.mutateAsync({
        email,
        senha,
      });

      Alert.alert('Sucesso', 'Login realizado com sucesso');

      router.replace('../(auth)/trilhas');
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.message || 'E-mail ou senha inválidos'
      );
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.primary,
          },
        ]}
      >
        Entrar
      </Text>

      <Text
        style={[
          styles.label,
          {
            color: theme.text,
          },
        ]}
      >
        E-mail
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.input,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
        placeholder="Digite seu e-mail"
        placeholderTextColor={theme.placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text
        style={[
          styles.label,
          {
            color: theme.text,
          },
        ]}
      >
        Senha
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.input,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
        placeholder="Digite sua senha"
        placeholderTextColor={theme.placeholder}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={handleLogin}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 32,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },

  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});