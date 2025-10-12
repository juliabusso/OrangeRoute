import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { area as areas } from '../data/area'; // ajuste o caminho conforme sua estrutura

export default function AreaDetail() {
  const route = useRoute();
  const { id } = route.params;

  const area = areas.find(a => a.id === id);

  if (!area) {
    return (
      <View style={styles.center}>
        <Text>Área não encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{area.nome}</Text>
      <Text style={styles.desc}>{area.descricao}</Text>

      <Text style={styles.subTitle}>Tecnologias</Text>
      <View style={styles.tagsContainer}>
        {area.tecnologias.map(t => (
          <Text key={t} style={styles.tag}>{t}</Text>
        ))}
      </View>

      <Text style={styles.subTitle}>Trilha sugerida (exemplo)</Text>
      <View>
        <Text style={styles.step}>1. Fundamentos</Text>
        <Text style={styles.step}>2. Projeto prático</Text>
        <Text style={styles.step}>3. APIs e integração</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E0E7FF',
    color: '#1E3A8A',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  step: {
    fontSize: 16,
    marginBottom: 4,
  },
});
