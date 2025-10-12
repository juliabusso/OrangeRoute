import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { area as areasData } from '../data/area';
import AreaCard from '../components/AreaCard';
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [areas, setAreas] = useState(areasData);
  const [favorites, setFavorites] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const favJson = await AsyncStorage.getItem('@favorites');
      if (favJson) setFavorites(JSON.parse(favJson));
    })();
  }, []);

  useEffect(() => {
    if (!query) {
      setAreas(areasData);
    } else {
      const q = query.toLowerCase();
      setAreas(
        areasData.filter(a =>
          a.nome.toLowerCase().includes(q) ||
          a.tecnologias.join(' ').toLowerCase().includes(q)
        )
      );
    }
  }, [query]);

  const toggleFav = async (id) => {
    const next = { ...favorites, [id]: !favorites[id] };
    setFavorites(next);
    await AsyncStorage.setItem('@favorites', JSON.stringify(next));
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@isLogged');
    navigation.replace('Login'); // navega para a tela de Login
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '700' }}>Áreas</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: '#EF4444', fontWeight: '600' }}>Sair</Text>
        </TouchableOpacity>
      </View>

      <SearchBar value={query} onChange={setQuery} />

      {areas.map((area) => (
        <AreaCard key={area.id} area={area}>
          <TouchableOpacity onPress={() => toggleFav(area.id)} style={{ marginLeft: 8 }}>
            <Text
              style={{
                color: favorites[area.id] ? '#F59E0B' : '#94A3B8',
                fontWeight: '500',
              }}
            >
              {favorites[area.id] ? '★ Favorito' : '☆ Favoritar'}
            </Text>
          </TouchableOpacity>
        </AreaCard>
      ))}
    </ScrollView>
  );
}
