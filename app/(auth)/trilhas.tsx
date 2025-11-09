import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

type Trilha = {
  idTrilhaCarreira: string;
  tituloTrilha: string;
  conteudoTrilha: string;
};

export default function TrilhasScreen() {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const API_URL = '';

  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await fetch(API_URL);
        if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);
        const json = await resp.json();
        setTrilhas(json.data ?? []);
      } catch (err) {
        setError('Erro ao carregar trilhas');
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  const abrirTrilha = (id: string) => router.push(`../trilha/${id}`);

  const icone = (titulo: string) => {
    const t = titulo.toLowerCase();
    if (t.includes('java')) return '☕';
    if (t.includes('react')) return '⚛️';
    if (t.includes('dados')) return '💾';
    if (t.includes('design')) return '🎨';
    if (t.includes('cloud')) return '☁️';
    return '💻';
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={{ marginTop: 10 }}>Carregando trilhas...</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Trilhas de Carreira</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {trilhas.map((t) => (
        <View key={t.idTrilhaCarreira} style={styles.card}>
          <Text style={styles.icone}>{icone(t.tituloTrilha)}</Text>
          <Text style={styles.titulo}>{t.tituloTrilha}</Text>
          <Text style={styles.descricao}>{t.conteudoTrilha}</Text>

          <TouchableOpacity style={styles.botao} onPress={() => abrirTrilha(t.idTrilhaCarreira)}>
            <Text style={styles.textoBotao}>Acessar Trilha</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#FFF4E6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: { fontSize: 26, fontWeight: '700', color: '#FF6B00' },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  logoutText: { color: '#fff', fontWeight: '600' },
  error: { color: '#EF4444', textAlign: 'center', marginTop: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
  },
  icone: { fontSize: 28, marginBottom: 6 },
  titulo: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  descricao: { color: '#475569', marginBottom: 10 },
  botao: {
    backgroundColor: '#FF6B00',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: { color: '#fff', fontWeight: '600' },
});
