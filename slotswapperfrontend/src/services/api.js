import axios from 'axios'

const API_BASE_URL = 'https://smarthivebackend.onrender.com'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authApi = {
  login: (payload) => api.post('/auth/login', payload).then((r) => r.data),
  signup: (payload) => api.post('/auth/signup', payload).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
}

export const eventsApi = {
  create: (payload) => api.post('/events', payload).then((r) => r.data),
  listMine: () => api.get('/events').then((r) => r.data),
  getById: (id) => api.get(`/events/${id}`).then((r) => r.data),
  update: (id, payload) => api.put(`/events/${id}`, payload).then((r) => r.data),
  updateStatus: (id, payload) => api.put(`/events/${id}/status`, payload).then((r) => r.data),
  delete: (id) => api.delete(`/events/${id}`).then((r) => r.data),
}

export const swapApi = {
  swappableSlots: () => api.get('/swappable-slots').then((r) => r.data),
  createRequest: (payload) => api.post('/swap-request', payload).then((r) => r.data),
  respond: (requestId, payload) => api.post(`/swap-response/${requestId}`, payload).then((r) => r.data),
  incoming: () => api.get('/swap-requests/incoming').then((r) => r.data),
  outgoing: () => api.get('/swap-requests/outgoing').then((r) => r.data),
}

export default api


