import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const API_URL = 'http://localhost:8080';

export default function ProfileScreen() {
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [foto, setFoto] = useState<string | null>(null);

  const router = useRouter();


  // Carrega perfil

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('usuarioId');
      if (!id) {
        Alert.alert('Sessão expirada', 'Faça login novamente.');
        router.replace('../(tabs)/login');
        return;
      }

      try {
        const resp = await fetch(`${API_URL}/usuario/${id}`);
        if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);

        const json = await resp.json();
        const data = json.usuario ?? json;

        setUsuario(data);
        setNome(data.nomeUsuario ?? '');
        setEmail(data.email ?? '');
        setFoto(
          data.fotoBase64
            ? `data:image/png;base64,${data.fotoBase64}`
            : null
        );
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        Alert.alert('Erro', 'Não foi possível carregar seu perfil.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Atualiza dados (PUT /usuario/{id})

  const handleSave = async () => {
    if (!usuario?.idUsuario) return;

    try {
      const body: any = { nomeUsuario: nome, email };
      if (senha.trim()) body.senha = senha.trim();

      const resp = await fetch(`${API_URL}/usuario/${usuario.idUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);

      const json = await resp.json();
      const atualizado = json.usuario ?? json;

      setUsuario(atualizado);
      setSenha('');
      Alert.alert('✅ Sucesso', 'Perfil atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      Alert.alert('❌ Erro', 'Falha ao atualizar seu perfil.');
    }
  };

  // Upload de foto
  const handleUploadPhoto = async () => {
    const id = usuario?.idUsuario;
    if (!id) return;

    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permissão negada', 'Permita o acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.8,
    });

    if (result.canceled) return;

    try {
      const formData = new FormData();
      const img = result.assets[0];
      const uriParts = img.uri.split('.');
      const ext = uriParts[uriParts.length - 1];

      formData.append('foto', {
        uri: img.uri,
        name: `foto.${ext}`,
        type: `image/${ext}`,
      } as any);

      const resp = await fetch(`${API_URL}/usuario/${id}/foto`, {
        method: 'PUT',
        body: formData,
      });

      if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);

      const json = await resp.json();
      const atualizado = json.usuario ?? json;

      if (atualizado.fotoBase64) {
        setFoto(`data:image/png;base64,${atualizado.fotoBase64}`);
      }

      Alert.alert('📸 Sucesso', 'Foto atualizada com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar foto:', err);
      Alert.alert('❌ Erro', 'Falha ao enviar a foto.');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>
      </View>

      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleUploadPhoto}>
          <Image
            source={
              foto
                ? { uri: foto }
                : require('../../assets/images/default-avatar-profile-icon.jpg')
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.changePhoto}>Toque para alterar foto</Text>
      </View>

      <View>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          placeholder="Seu nome"
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Seu e-mail"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha (opcional)</Text>
        <TextInput
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          placeholder="Nova senha"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logout]}
          onPress={async () => {
            await AsyncStorage.clear();
            router.replace('/login');
          }}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4E6', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '700', color: '#FF6B00' },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: '#FF6B00' },
  changePhoto: { color: '#FF6B00', marginTop: 8, fontSize: 14 },
  label: { fontWeight: '600', color: '#333', marginTop: 10 },
  input: {
    backgroundColor: '#fff',
    borderColor: '#FF6B00',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  logout: { backgroundColor: '#EF4444' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
