import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useRouter } from 'expo-router';

import { Colors } from '../../constants/theme';

import {
  usePerfil,
  useAtualizarPerfil,
  useExcluirConta,
} from '../../hooks/usePerfil';

import { useUploadFoto } from '../../hooks/useUploadFoto';

export default function ProfileScreen() {
  const router = useRouter();

  const colorScheme = useColorScheme();

  const theme = Colors[colorScheme ?? 'light'];

  const [usuarioId, setUsuarioId] =
    useState<string | null>(null);

  const [nome, setNome] = useState('');

  const [email, setEmail] = useState('');

  const [senha, setSenha] = useState('');

  const [foto, setFoto] = useState<string | null>(
    null
  );

  const {
    data: usuario,
    isLoading,
  } = usePerfil(usuarioId);

  const atualizarMutation =
    useAtualizarPerfil();

  const excluirMutation =
    useExcluirConta();

  const uploadMutation =
    useUploadFoto();

  useEffect(() => {
    carregarSessao();
  }, []);

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nomeUsuario ?? '');

      setEmail(usuario.email ?? '');

      setFoto(
        usuario.fotoBase64
          ? `data:image/png;base64,${usuario.fotoBase64}`
          : null
      );
    }
  }, [usuario]);

  async function carregarSessao() {
    const id =
      await AsyncStorage.getItem('usuarioId');

    if (!id) {
      Alert.alert(
        'Sessão expirada',
        'Faça login novamente'
      );

      router.replace('../(public)/login');

      return;
    }

    setUsuarioId(id);
  }

  async function handleSave() {
    if (!usuario?.idUsuario) return;

    try {
      const body: any = {
        nomeUsuario: nome,

        email,
      };

      if (senha.trim()) {
        body.senha = senha.trim();
      }

      await atualizarMutation.mutateAsync({
        id: usuario.idUsuario,

        body,
      });

      setSenha('');

      Alert.alert(
        'Sucesso',
        'Perfil atualizado'
      );
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.message || 'Erro atualizar perfil'
      );
    }
  }

  async function handleDelete() {
    Alert.alert(
      'Excluir conta',
      'Deseja realmente excluir sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',

          style: 'destructive',

          onPress: async () => {
            try {
              await excluirMutation.mutateAsync(
                usuario.idUsuario
              );

              await AsyncStorage.clear();

              Alert.alert(
                'Conta removida'
              );

              router.replace(
                '../(public)/login'
              );
            } catch (error: any) {
              Alert.alert(
                'Erro',
                error.message
              );
            }
          },
        },
      ]
    );
  }

  async function handleUploadPhoto() {
    const perm =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!perm.granted) {
      Alert.alert(
        'Permissão negada'
      );

      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        base64: true,

        quality: 0.8,
      });

    if (result.canceled) return;

    try {
      const formData = new FormData();

      const img = result.assets[0];

      const ext =
        img.uri.split('.').pop();

      formData.append('foto', {
        uri: img.uri,

        name: `foto.${ext}`,

        type: `image/${ext}`,
      } as any);

      const response =
        await uploadMutation.mutateAsync({
          id: usuario.idUsuario,

          formData,
        });

      const atualizado =
        response.usuario ?? response;

      if (atualizado.fotoBase64) {
        setFoto(
          `data:image/png;base64,${atualizado.fotoBase64}`
        );
      }

      Alert.alert(
        'Foto atualizada'
      );
    } catch (error: any) {
      Alert.alert(
        'Erro upload foto'
      );
    }
  }

  if (isLoading || !usuario) {
    return (
      <View
        style={[
          styles.center,
          {
            backgroundColor:
              theme.background,
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={theme.primary}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: theme.primary,
            },
          ]}
        >
          Meu Perfil
        </Text>
      </View>

      <View style={styles.avatarContainer}>
        <TouchableOpacity
          onPress={handleUploadPhoto}
        >
          <Image
            source={
              foto
                ? { uri: foto }
                : require('../../assets/images/default-avatar-profile-icon.jpg')
            }
            style={[
              styles.avatar,
              {
                borderColor:
                  theme.primary,
              },
            ]}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.changePhoto,
            {
              color: theme.primary,
            },
          ]}
        >
          Toque para alterar foto
        </Text>
      </View>

      <Text
        style={[
          styles.label,
          {
            color: theme.text,
          },
        ]}
      >
        Nome
      </Text>

      <TextInput
        value={nome}
        onChangeText={setNome}
        style={[
          styles.input,
          {
            backgroundColor:
              theme.input,

            borderColor:
              theme.border,

            color: theme.text,
          },
        ]}
      />

      <Text
        style={[
          styles.label,
          {
            color: theme.text,
          },
        ]}
      >
        E-mail
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        style={[
          styles.input,
          {
            backgroundColor:
              theme.input,

            borderColor:
              theme.border,

            color: theme.text,
          },
        ]}
      />

      <Text
        style={[
          styles.label,
          {
            color: theme.text,
          },
        ]}
      >
        Senha
      </Text>

      <TextInput
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={[
          styles.input,
          {
            backgroundColor:
              theme.input,

            borderColor:
              theme.border,

            color: theme.text,
          },
        ]}
      />

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              theme.primary,
          },
        ]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Salvar Alterações
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.deleteButton,
        ]}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>
          Excluir Conta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.logout,
        ]}
        onPress={async () => {
          await AsyncStorage.clear();

          router.replace(
            '../(tabs)/login'
          );
        }}
      >
        <Text style={styles.buttonText}>
          Sair
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },

  center: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  header: {
    alignItems: 'center',

    marginBottom: 20,
  },

  title: {
    fontSize: 26,

    fontWeight: '700',
  },

  avatarContainer: {
    alignItems: 'center',

    marginBottom: 20,
  },

  avatar: {
    width: 120,

    height: 120,

    borderRadius: 60,

    borderWidth: 2,
  },

  changePhoto: {
    marginTop: 8,

    fontSize: 14,
  },

  label: {
    fontWeight: '600',

    marginTop: 10,
  },

  input: {
    borderWidth: 1,

    borderRadius: 10,

    paddingHorizontal: 12,

    paddingVertical: 10,

    marginBottom: 8,
  },

  button: {
    borderRadius: 10,

    paddingVertical: 14,

    alignItems: 'center',

    marginTop: 16,
  },

  logout: {
    backgroundColor: '#EF4444',
  },

  deleteButton: {
    backgroundColor: '#991B1B',
  },

  buttonText: {
    color: '#fff',

    fontSize: 18,

    fontWeight: '600',
  },
});