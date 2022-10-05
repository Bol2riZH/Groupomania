import axios from 'axios';

export const login = axios.create({
  baseURL: `http://localhost:4000/api/auth`,
});

export const signup = axios.create({
  baseURL: `http://localhost:4000/api/auth`,
  headers: {
    'content-type': 'multipart/form-data',
  },
});

export const getPost = axios.create({
  baseURL: `http://localhost:4000/api/posts`,
});

export const addPost = axios.create({
  baseURL: `http://localhost:4000/api/posts`,
});
