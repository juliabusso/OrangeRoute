
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Se já estiver logado (Neste caso, está mockado), vá para a home
    (async () => {
      const logged = await AsyncStorage.getItem('@isLogged');
      if (logged === 'true') router.replace('/home');
    })();
  }, []);

  const handleLogin = async () => {
    // mock auth: apenas salva flag e vai pra home
    await AsyncStorage.setItem('@isLogged', 'true');
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <Button title="Entrar" onPress={handleLogin} />
      <TouchableOpacity onPress={() => router.push('/cadastro')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  title: { fontSize:28, fontWeight:'700', marginBottom:20 },
  input: { borderWidth:1, borderColor:'#CBD5E1', padding:10, borderRadius:8, marginBottom:12, backgroundColor:'#fff' },
  link: { color:'#2563EB', marginTop:12, textAlign:'center' }
});
