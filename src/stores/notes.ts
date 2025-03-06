import { defineStore } from 'pinia'
import api from '../plugins/axios'

interface Note {
  id: number
  title: string
  content: string
}

interface NotesState {
  notes: Note[]
}

export const useNotesStore = defineStore('notes', {
  state: (): NotesState => ({
    notes: [],
  }),

  actions: {
    // Получение списка заметок
    async fetchNotes() {
      const token = localStorage.getItem('token') // Получаем токен из localStorage

      if (!token) {
        throw new Error('Нет токена для доступа')
      }

      try {
        const response = await api.get('/notes', {
          headers: {
            Authorization: `Bearer ${token}`, // Добавляем токен в заголовки
          },
        })
        this.notes = response.data // Сохраняем заметки в state
      } catch (error) {
        throw new Error('Не удалось получить заметки')
      }
    },

    // Создание новой заметки
    async createNote(title: string, content: string) {
      const token = localStorage.getItem('token') // Получаем токен из localStorage

      if (!token) {
        throw new Error('Нет токена для доступа')
      }

      try {
        const response = await api.post(
          '/notes',
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Добавляем токен в заголовки
            },
          },
        )
        this.notes.push(response.data) // Добавляем новую заметку в state
      } catch (error) {
        throw error.response.data.message[0] + ' и ' + error.response.data.message[1]
      }
    },

    // Удаление заметки
    async deleteNote(noteId: number) {
      const token = localStorage.getItem('token') // Получаем токен из localStorage

      if (!token) {
        throw new Error('Нет токена для доступа')
      }

      try {
        await api.delete(`/notes/${noteId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Добавляем токен в заголовки
          },
        })
        this.notes = this.notes.filter((note) => note.id !== noteId) // Удаляем заметку из state
      } catch (error) {
        throw new Error('Не удалось удалить заметку')
      }
    },
  },
})
