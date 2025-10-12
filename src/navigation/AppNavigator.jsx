import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import LearningTree from '../screens/LearningTree';
import HomeScreen from '../screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#FF6B00' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Bem-vindo' }} />
        <Stack.Screen name="LearningTree" component={LearningTree} options={{ title: 'LearningTree' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'HomeScreen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
