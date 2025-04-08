//app/index.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { api } from '../services/api';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const token = await api.login(username, password);
      await AsyncStorage.setItem('token', token);
      router.replace('/index2');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error de inicio de sesión', error.message);
      } else {
        Alert.alert('Error de inicio de sesión', 'Ocurrió un error desconocido');
      }
    }
  };
  

  const goToRegister = () => {
    console.log('Intentando navegar a register...');
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Ingresar" onPress={handleLogin} />
      <Text style={styles.registerText} onPress={goToRegister}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  registerText: {
    marginTop: 16,
    color: '#6200ee',
    textAlign: 'center'
  }
});