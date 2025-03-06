import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dist.nd.ru/api', // базовый URL для всех запросов
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default api
