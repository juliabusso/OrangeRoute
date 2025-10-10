// app/home.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { areas as areasData } from '../src/data/areas';
import AreaCard from '../src/components/AreaCard';
import SearchBar from '../src/components/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [areas, setAreas] = useState(areasData);
  const [favorites, setFavorites] = useState({});
  const router = useRouter();

  useEffect(() => {
    // carregar favoritos do AsyncStorage
    (async () => {
      const favJson = await AsyncStorage.getItem('@favorites');
      if (favJson) setFavorites(JSON.parse(favJson));
    })();
  }, []);

  useEffect(() => {
    // filtro simples
    if (!query) setAreas(areasData);
    else {
      const q = query.toLowerCase();
      setAreas(areasData.filter(a => a.nome.toLowerCase().includes(q) || a.tecnologias.join(' ').toLowerCase().includes(q)));
    }
  }, [query]);

  const toggleFav = async (id) => {
    const next = { ...favorites, [id]: !favorites[id] };
    setFavorites(next);
    await AsyncStorage.setItem('@favorites', JSON.stringify(next));
  };

  return (
    <ScrollView style={{ padding:16 }}>
      <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <Text style={{ fontSize:22, fontWeight:'700' }}>Áreas</Text>
        <TouchableOpacity onPress={() => { AsyncStorage.removeItem('@isLogged'); router.replace('/'); }}>
          <Text style={{ color:'#EF4444' }}>Sair</Text>
        </TouchableOpacity>
      </View>

      <SearchBar value={query} onChange={setQuery} />

      {areas.map(area => (
        <AreaCard key={area.id} area={area}>
          <TouchableOpacity onPress={() => toggleFav(area.id)} style={{ marginLeft:8 }}>
            <Text style={{ color: favorites[area.id] ? '#F59E0B' : '#94A3B8' }}>
              {favorites[area.id] ? '★ Favorito' : '☆ Favoritar'}
            </Text>
          </TouchableOpacity>
        </AreaCard>
      ))}
    </ScrollView>
  );
}
