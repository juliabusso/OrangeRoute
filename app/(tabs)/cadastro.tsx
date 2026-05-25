import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';

import { useRouter } from 'expo-router';

import { Colors } from '../../constants/theme';

import { useCadastro } from '../../hooks/useCadastro';

export default function CadastroScreen() {
  const router = useRouter();

  const colorScheme = useColorScheme();

  const theme = Colors[colorScheme ?? 'light'];

  const [nomeUsuario, setNomeUsuario] = useState('');

  const [email, setEmail] = useState('');

  const [senha, setSenha] = useState('');

  const cadastroMutation = useCadastro();

  async function handleCadastro() {
    if (!nomeUsuario || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (senha.length < 8) {
      Alert.alert(
        'Erro',
        'A senha deve ter no mínimo 8 caracteres'
      );
      return;
    }

    try {
      await cadastroMutation.mutateAsync({
        nomeUsuario,
        email,
        senha,
        idTipoUsuario: 2,
      });

      Alert.alert(
        'Sucesso',
        'Usuário cadastrado com sucesso'
      );

      router.replace('./login');
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.message || 'Erro ao cadastrar usuário'
      );
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[
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
        Criar Conta
      </Text>

      <Text
        style={[
          styles.label,
          {
            color: theme.text,
          },
        ]}
      >
        Nome
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
        placeholder="Digite seu nome"
        placeholderTextColor={theme.placeholder}
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
      />

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
        placeholder="seu@email.com"
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
        onPress={handleCadastro}
        disabled={cadastroMutation.isPending}
      >
        {cadastroMutation.isPending ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>
            Cadastrar
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },

  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});