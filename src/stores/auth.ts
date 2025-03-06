// stores/auth.ts

import { defineStore } from 'pinia';
import api from '../plugins/axios';

interface AuthState {
  token: string | null;
  user: any;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token') || null, // Проверка на наличие токена в localStorage
    user: null,
  }),

  actions: {
    // Вход пользователя
    async login(email: string, password: string) {
      try {
        const response = await api.post('/auth', { email, password });
        this.token = response.data.accessToken;
        localStorage.setItem('token', this.token);
        return { success: true };
      } catch (error) {
        return { success: false, message: 'Неверный логин или пароль' };
      }
    },

    // Получение информации о пользователе
    async fetchUserInfo() {
      if (!this.token) {
        throw new Error('No token available');
      }

      try {
        const response = await api.get('/auth', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.user = response.data;
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch user info');
      }
    },

    // Выход пользователя
    async logout() {
      if (!this.token) {
        throw new Error('No token available');
      }

      try {
        await api.delete('/auth', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
      } catch (error) {
        throw new Error('Logout failed');
      }
    },

    // Регистрация нового пользователя
    async register(email: string, password: string) {
      try {
        const response = await api.post('/reg', {
          email,
          password,
          confirm_password: password,
        });

        if (response.status === 200) {
          return { success: true };
        }
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Ошибка регистрации' };
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token, // Проверка, если токен существует, то пользователь авторизован
    userEmail: (state) => state.user?.email || '', // Возвращаем email пользователя
  }
});
