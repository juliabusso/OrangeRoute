// src/components/AreaCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function AreaCard({ area, onPress, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{area.nome}</Text>
      <Text style={styles.desc}>{area.descricao}</Text>

      <View style={styles.row}>
        <Link href={`/area/${area.id}`} style={styles.linkBtn}>
          <Text style={{ color:'#fff' }}>Ver trilha</Text>
        </Link>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor:'#fff', padding:14, borderRadius:10, marginBottom:12, shadowColor:'#000', shadowOpacity:0.03 },
  title: { fontSize:18, fontWeight:'700' },
  desc: { marginTop:6, color:'#475569' },
  row: { flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' },
  linkBtn: { backgroundColor:'#2563EB', paddingVertical:8, paddingHorizontal:12, borderRadius:8 }
});
