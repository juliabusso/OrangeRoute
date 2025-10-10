// app/cadastro.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [interesses, setInteresses] = useState(''); 
  const router = useRouter();


  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem('@cadastroForm');
      if (json) {
        const data = JSON.parse(json);
        setNome(data.nome || '');
        setEmail(data.email || '');
        setInteresses(data.interesses || '');
      }
    })();
  }, []);

  // Salvar enquanto digita (persistência incremental)
  useEffect(() => {
    const payload = JSON.stringify({ nome, email, interesses });
    AsyncStorage.setItem('@cadastroForm', payload);
  }, [nome, email, interesses]);

  const handleSubmit = async () => {
    // item mockado: "criar conta" salva isLogged e vai pra home
    await AsyncStorage.setItem('@isLogged', 'true');
    router.replace('/home');
  };

  const handleClear = async () => {
    setNome(''); setEmail(''); setInteresses('');
    await AsyncStorage.removeItem('@cadastroForm');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Seu nome" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="seu@email.com" />

      <Text style={styles.label}>Interesses (separe por vírgula)</Text>
      <TextInput style={styles.input} value={interesses} onChangeText={setInteresses} placeholder="Front-end, Mobile, DevOps" />

      <View style={{ marginTop:12 }}>
        <Button title="Criar conta" onPress={handleSubmit} />
      </View>

      <View style={{ marginTop:8 }}>
        <Button title="Limpar formulário" onPress={handleClear} color="#EF4444" />
      </View>

      <View style={{ marginTop:20 }}>
        <Text style={{ fontWeight:'600', marginBottom:6 }}>Dados digitados (ao vivo)</Text>
        <Text>Nome: {nome || '—'}</Text>
        <Text>Email: {email || '—'}</Text>
        <Text>Interesses: {interesses || '—'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding:20 },
  title: { fontSize:26, fontWeight:'700', marginBottom:16 },
  label: { marginTop:8, marginBottom:6, fontWeight:'600' },
  input: { borderWidth:1, borderColor:'#E2E8F0', padding:10, borderRadius:8, backgroundColor:'#fff' },
});
