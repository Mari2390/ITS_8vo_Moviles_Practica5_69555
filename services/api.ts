import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://bowling-operation-nathan-coordinator.trycloudflare.com/api';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

// Función para obtener el token de autenticación
const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Obtener todas las tareas
  getTareas: async (): Promise<Tarea[]> => {
    try {
      const headers = await getAuthHeader();  // Añadir encabezado de autorización
      const response = await fetch(`${API_BASE_URL}/tareas`, { headers });
      if (!response.ok) throw new Error('Error fetching tareas');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tareas:', error);
      throw error;
    }
  },

  // Obtener una tarea por ID
  getTarea: async (id: number): Promise<Tarea> => {
    try {
      const headers = await getAuthHeader();  // Añadir encabezado de autorización
      const response = await fetch(`${API_BASE_URL}/tareas/${id}`, { headers });
      if (!response.ok) throw new Error(`Error fetching tarea ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching tarea ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva tarea
  createTarea: async (tarea: Omit<Tarea, 'id'>): Promise<Tarea> => {
    try {
      const headers = await getAuthHeader();  // Añadir encabezado de autorización
      const response = await fetch(`${API_BASE_URL}/tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(tarea),
      });
      if (!response.ok) throw new Error('Error creating tarea');
      return await response.json();
    } catch (error) {
      console.error('Error creating tarea:', error);
      throw error;
    }
  },

  // Actualizar una tarea existente
  updateTarea: async (id: number, tarea: Partial<Tarea>): Promise<Tarea> => {
    try {
      const headers = await getAuthHeader();  // Añadir encabezado de autorización
      const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(tarea),
      });
      if (!response.ok) throw new Error(`Error updating tarea ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating tarea ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una tarea
  deleteTarea: async (id: number): Promise<void> => {
    try {
      const headers = await getAuthHeader();  // Añadir encabezado de autorización
      const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (!response.ok) throw new Error(`Error deleting tarea ${id}`);
    } catch (error) {
      console.error(`Error deleting tarea ${id}:`, error);
      throw error;
    }
  },

  login: async (username: string, password: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) throw new Error('Credenciales incorrectas');
      const data = await response.json();
      return data.token; // JWT Token
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (username: string, password: string): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) throw new Error('Error al registrar');
      return await response.json();
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }
};
