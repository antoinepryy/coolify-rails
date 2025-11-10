import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const healthApi = {
  getHealth: () => api.get('/api/health'),
};

export const usersApi = {
  getUsers: () => api.get('/api/users'),
  createUser: (userData) => api.post('/api/users', userData),
};

export const postsApi = {
  getPosts: () => api.get('/api/posts'),
  createPost: (postData) => api.post('/api/posts', postData),
};

export default api;