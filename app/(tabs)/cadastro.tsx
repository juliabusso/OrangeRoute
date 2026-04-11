import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://localhost:8080'; //Subistituir pelo seu ip

export default function CadastroScreen() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  // ✅ Submissão do formulário
  const handleCadastro = async () => {

    if (senha.length < 8) {
      setMensagem('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    const payload = {
      nomeUsuario,
      email,
      senha,
      idTipoUsuario: Number(2), //Id de tipo-usuario User padrão
    };

    console.log(payload)
    
    try {
      const resp = await fetch(`${API_URL}/usuario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await resp.json().catch(() => ({}));

      if (resp.ok && data.usuario?.idUsuario) {
        Alert.alert('✅ Sucesso', `Usuário ${data.usuario.nomeUsuario} cadastrado com sucesso!`);
        setTimeout(() => router.replace('./login'), 1500);
        return;
      }

      const msgErro =
        data.message ||
        (resp.status === 409
          ? 'E-mail já cadastrado.'
          : resp.status === 400
          ? 'Dados inválidos. Verifique os campos.'
          : resp.status === 404
          ? 'Tipo de usuário não encontrado.'
          : `Erro ao cadastrar usuário (HTTP ${resp.status}).`);

      setMensagem(msgErro);
    } catch (err) {
      console.error('Erro ao conectar com o servidor:', err);
      setMensagem('Falha ao conectar com o servidor.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome..."
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

     

      {mensagem ? <Text style={styles.message}>{mensagem}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#FFF4E6',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6B00',
    textAlign: 'center',
    marginBottom: 20,
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
    marginBottom: 10,
  },
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  option: {
    borderColor: '#FF6B00',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  optionSelected: {
    backgroundColor: '#FF6B00',
  },
  optionText: {
    color: '#333',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
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
