import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Trilha = { idTrilhaCarreira: string; tituloTrilha: string; conteudoTrilha: string };
type Tag = { idTag: string; nomeTag?: string };
type LinkItem = { tituloLink?: string; conteudoLink?: string };
type Comentario = { nomeUsuario: string; conteudoComentario: string };

export default function TrilhaScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [trilha, setTrilha] = useState<Trilha | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:8080';

  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await fetch(`${API_URL}/trilhas/${id}`);
        const json = await resp.json();
        setTrilha(json);
        await Promise.all([carregarTags(), carregarLinks(), carregarComentarios()]);
      } catch {
        Alert.alert('Erro', 'Falha ao carregar trilha');
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [id]);

  const carregarTags = async () => {
    const resp = await fetch(`${API_URL}/tags/trilha/${id}`);
    const json = await resp.json();
    setTags(json.data ?? []);
  };

  const carregarLinks = async () => {
    const resp = await fetch(`${API_URL}/links/trilha/${id}`);
    const json = await resp.json();
    setLinks(json.data ?? []);
  };

  const carregarComentarios = async () => {
    const resp = await fetch(`${API_URL}/comentarios/trilha/${id}`);
    const json = await resp.json();
    setComentarios(json.data ?? []);
  };

const enviarComentario = async () => {
  if (!comentario.trim()) {
    return Alert.alert('Digite algo');
  }

  try {
    const usuarioId = await AsyncStorage.getItem('usuarioId'); // ✅ busca do AsyncStorage

    if (!usuarioId) {
      Alert.alert('Erro', 'Usuário não identificado. Faça login novamente.');
      return;
    }

    const body = {
      conteudoComentario: comentario,
      idUsuario: Number(usuarioId), // converte pra número se necessário
      idTrilhaCarreira: id,
    };

    const resp = await fetch(`${API_URL}/comentarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      throw new Error(`Erro HTTP ${resp.status}`);
    }

    setComentario('');
    carregarComentarios();
  } catch (err) {
    console.error('Erro ao enviar comentário:', err);
    Alert.alert('Erro', 'Não foi possível enviar o comentário.');
  }
};

  if (loading) return <ActivityIndicator style={{ marginTop: 30 }} size="large" color="#FF6B00" />;

  if (!trilha) return <Text style={{ textAlign: 'center' }}>Trilha não encontrada</Text>;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}><Text style={{ color: '#FF6B00' }}>← Voltar</Text></TouchableOpacity>
      <Text style={styles.titulo}>{trilha.tituloTrilha}</Text>
      <Text style={styles.conteudo}>{trilha.conteudoTrilha}</Text>

      <View style={styles.tagsContainer}>
        {tags.map((t) => <Text key={t.idTag} style={styles.tag}>{t.nomeTag}</Text>)}
      </View>

      <View>
        {links.map((l, i) => (
          <TouchableOpacity key={i} onPress={() => Linking.openURL(l.conteudoLink ?? '')}>
            <Text style={{ color: '#2563EB' }}>🔗 {l.tituloLink}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitulo}>Comentários</Text>
      {comentarios.map((c, i) => <Text key={i}><Text style={{ fontWeight: '700' }}>{c.nomeUsuario}:</Text> {c.conteudoComentario}</Text>)}

      <TextInput
        style={styles.input}
        placeholder="Escreva um comentário..."
        value={comentario}
        onChangeText={setComentario}
      />
      <TouchableOpacity style={styles.botao} onPress={enviarComentario}>
        <Text style={styles.textoBotao}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#FFF4E6' },
  titulo: { fontSize: 22, fontWeight: '700', color: '#FF6B00', marginBottom: 6 },
  conteudo: { marginBottom: 12 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  tag: { backgroundColor: '#FFDAB6', padding: 6, borderRadius: 8, margin: 4 },
  subtitulo: { fontSize: 18, fontWeight: '600', marginVertical: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, backgroundColor: '#fff' },
  botao: { backgroundColor: '#FF6B00', marginTop: 8, padding: 10, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700' },
});
