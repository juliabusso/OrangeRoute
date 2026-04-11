import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const API_URL = 'http://localhost:8080'; //Subistituir pelo seu ip

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

type LoginResponse = {
  token: string;
  usuario: {
    idUsuario: number;
    nomeUsuario: string;
    email: string;
    ativo: string; 
    tipoUsuario: {
      idTipoUsuario: number;
      nomeTipoUsuario: string;
    };
  };
  message?: string;
};

  const handleLogin = async () => {
  if (!email || !senha) {
    setMensagem('Preencha todos os campos.');
    return;
  }

  setMensagem('');
  setLoading(true);

  try {
    const resp = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    let data: LoginResponse = {};
    try {
      data = await resp.json();
    } catch {
      console.log("Resposta não veio em JSON");
    }
    // console.log("Resposta login:", data); // Descomentar caso precise debugar a resposta do servidor

    const usuario = data?.usuario ?? data?.usuario ?? null;
    const token = data?.token ?? data?.token ?? null;

    if (!resp.ok || !usuario?.idUsuario) {
      setMensagem('E-mail ou senha incorretos.');
      setSenha('');
      return;
    }

    await AsyncStorage.multiSet([
      ['usuarioId', String(usuario.idUsuario)],
      ['usuarioNome', usuario.nomeUsuario ?? ''],
      ['usuarioEmail', usuario.email ?? ''],
      ['usuarioTipo', usuario.tipoUsuario?.nomeTipoUsuario ?? ''],
      ['usuarioAtivo', String(usuario.ativo ?? '1')],
      ['token', token ?? ''],
      ['@isLogged', 'true'],
    ]);

    Alert.alert('Bem-vindo!', `Olá, ${usuario.nomeUsuario}!`);
    router.replace('../(auth)/trilhas');

  } catch (err) {
    console.error('Erro login:', err);
    setMensagem('Erro ao conectar com o servidor.');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {mensagem ? <Text style={styles.message}>{mensagem}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FFF4E6',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6B00',
    textAlign: 'center',
    marginBottom: 32,
  },
  label: {
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#FF6B00',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    color: '#FF6B00',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
  message: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
});
