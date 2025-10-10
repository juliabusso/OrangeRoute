// src/components/SearchBar.jsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Pesquisar áreas, tecnologias..." value={value} onChangeText={onChange} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom:12 },
  input: { backgroundColor:'#fff', padding:10, borderRadius:8, borderWidth:1, borderColor:'#E2E8F0' }
});
