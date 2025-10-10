// app/area/[id].jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { areas } from '../../src/data/areas';

export default function AreaDetail() {
  const { id } = useLocalSearchParams();
  const area = areas.find(a => a.id === id);

  if (!area) return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Área não encontrada</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{area.nome}</Text>
      <Text style={styles.desc}>{area.descricao}</Text>

      <Text style={styles.subTitle}>Tecnologias</Text>
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        {area.tecnologias.map(t => <Text key={t} style={styles.tag}>{t}</Text>)}
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
  container: { padding:16 },
  title: { fontSize:24, fontWeight:'800', marginBottom:8 },
  desc: { color:'#475569', marginBottom:12 },
  subTitle: { marginTop:12, fontWeight:'700', marginBottom:6 },
  tag: { backgroundColor:'#fff', padding:6, borderRadius:6, marginRight:8, marginBottom:8, borderWidth:1, borderColor:'#E2E8F0' },
  step: { paddingVertical:8, color:'#334155' }
});
