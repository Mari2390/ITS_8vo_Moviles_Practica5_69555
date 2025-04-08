//app/register.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../services/api';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await api.register(username, password);
      Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
      router.replace('/'); // Regresa al login
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error al registrar', error.message);
      } else {
        Alert.alert('Error al registrar', 'Ocurrió un error desconocido');
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
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
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  }
});
