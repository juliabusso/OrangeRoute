import React, { useEffect } from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  useColorScheme,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useRouter } from 'expo-router';

import { Colors } from '../../constants/theme';

import {
  useTrilhas,
  Trilha,
} from '../../hooks/useTrilhas';

export default function TrilhasScreen() {
  const router = useRouter();

  const colorScheme = useColorScheme();

  const theme = Colors[colorScheme ?? 'light'];

  const {
    data: trilhas = [],
    isLoading,
    error,
  } = useTrilhas();

  useEffect(() => {
    verificarLogin();
  }, []);

  async function verificarLogin() {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      Alert.alert(
        'Sessão expirada',
        'Faça login novamente'
      );

      router.replace('../(public)/login');
    }
  }

  function abrirTrilha(id: string) {
    router.push(`../trilha/${id}`);
  }

  function icone(titulo: string) {
    const t = titulo.toLowerCase();

    if (t.includes('java')) return '☕';

    if (t.includes('react')) return '⚛️';

    if (t.includes('dados')) return '💾';

    if (t.includes('design')) return '🎨';

    if (t.includes('cloud')) return '☁️';

    return '💻';
  }

  if (isLoading) {
    return (
      <View
        style={[
          styles.center,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={theme.primary}
        />

        <Text
          style={{
            color: theme.text,
            marginTop: 10,
          }}
        >
          Carregando trilhas...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.header,
            {
              color: theme.primary,
            },
          ]}
        >
          Trilhas de Carreira
        </Text>
      </View>

      {error ? (
        <Text style={styles.error}>
          Erro ao carregar trilhas
        </Text>
      ) : null}

      {trilhas.map((t: Trilha) => (
        <View
          key={t.idTrilhaCarreira}
          style={[
            styles.card,
            {
              backgroundColor: theme.input,
            },
          ]}
        >
          <Text style={styles.icone}>
            {icone(t.tituloTrilha)}
          </Text>

          <Text
            style={[
              styles.titulo,
              {
                color: theme.text,
              },
            ]}
          >
            {t.tituloTrilha}
          </Text>

          <Text
            style={[
              styles.descricao,
              {
                color: theme.text,
              },
            ]}
          >
            {t.conteudoTrilha}
          </Text>

          <TouchableOpacity
            style={[
              styles.botao,
              {
                backgroundColor: theme.primary,
              },
            ]}
            onPress={() =>
              abrirTrilha(t.idTrilhaCarreira)
            }
          >
            <Text style={styles.textoBotao}>
              Acessar Trilha
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
  },

  center: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  headerContainer: {
    marginBottom: 16,
  },

  header: {
    fontSize: 26,

    fontWeight: '700',
  },

  error: {
    color: '#EF4444',

    textAlign: 'center',

    marginTop: 16,
  },

  card: {
    borderRadius: 10,

    padding: 14,

    marginBottom: 14,

    elevation: 2,
  },

  icone: {
    fontSize: 28,

    marginBottom: 6,
  },

  titulo: {
    fontSize: 18,

    fontWeight: '700',

    marginBottom: 6,
  },

  descricao: {
    marginBottom: 10,
  },

  botao: {
    paddingVertical: 10,

    borderRadius: 8,

    alignItems: 'center',
  },

  textoBotao: {
    color: '#FFF',

    fontWeight: '600',
  },
});