import axios from 'axios';
import type { 
  AuthResponse, 
  User, 
  Task, 
  CreateTaskData, 
  UpdateTaskData,
  TaskStats 
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor pentru a adăuga token-ul la fiecare request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  register: async (email: string, name: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post('/api/auth/register', { email, name, password });
    return data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post('/api/auth/login', { email, password });
    return data;
  },

  getMe: async (): Promise<{ user: User }> => {
    const { data } = await api.get('/api/auth/me');
    return data;
  }
};

// Tasks API
export const tasksApi = {
  getAll: async (): Promise<{ tasks: Task[] }> => {
    const { data } = await api.get('/api/tasks');
    return data;
  },

  getById: async (id: string): Promise<{ task: Task }> => {
    const { data } = await api.get(`/api/tasks/${id}`);
    return data;
  },

  create: async (taskData: CreateTaskData): Promise<{ task: Task }> => {
    const { data } = await api.post('/api/tasks', taskData);
    return data;
  },

  update: async (id: string, taskData: UpdateTaskData): Promise<{ task: Task }> => {
    const { data } = await api.put(`/api/tasks/${id}`, taskData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/tasks/${id}`);
  },

  getStats: async (): Promise<{ stats: TaskStats }> => {
    const { data } = await api.get('/api/tasks/stats');
    return data;
  }
};

export default api;