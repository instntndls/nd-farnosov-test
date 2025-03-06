import { defineStore } from 'pinia'
import api from '../plugins/axios'

interface AuthState {
  token: string | null
  user: any
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await api.post('/auth', { email, password })
        this.token = response.data.accessToken
        if (this.token) {
          localStorage.setItem('token', this.token)
        }
        return { success: true }
      } catch (error) {
        return { success: false, message: 'Неверный логин или пароль' }
      }
    },

    async fetchUserInfo() {
      if (!this.token) {
        throw new Error('No token available')
      }

      try {
        const response = await api.get('/auth', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.user = response.data
        return response.data
      } catch (error) {
        throw new Error('Failed to fetch user info')
      }
    },

    async logout() {
      if (!this.token) {
        throw new Error('No token available')
      }

      try {
        await api.delete('/auth', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.token = null
        this.user = null
        localStorage.removeItem('token')
      } catch (error) {
        throw new Error('Logout failed')
      }
    },

    async register(email: string, password: string) {
      try {
        const response = await api.post('/reg', {
          email,
          password,
          confirm_password: password,
        })

        if (response.status === 200) {
          return { success: true }
        }
      } catch (error: any) {
        return { success: false, message: error?.response?.data?.message || 'Ошибка регистрации' }
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    userEmail: (state) => state.user?.email || '',
  },
})
