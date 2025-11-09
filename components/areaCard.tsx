import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

// Tipo para a área
type Area = {
  id: string;
  nome: string;
  descricao: string;
  tecnologias: string[];
};

// Props do componente
type AreaCardProps = {
  area: Area;
  children?: React.ReactNode;
};

export default function AreaCard({ area, children }: AreaCardProps) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{area.nome}</Text>
      <Text style={styles.desc}>{area.descricao}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => router.push(`./learning-tree?id=${area.id}`)}
        >
          <Text style={{ color: '#fff' }}>Ver trilha</Text>
        </TouchableOpacity>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
  },
  title: { fontSize: 18, fontWeight: '700' },
  desc: { marginTop: 6, color: '#475569' },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
