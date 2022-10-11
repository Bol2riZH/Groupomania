import axios from 'axios';

export const axiosUser = axios.create({
  baseURL: `http://localhost:4000/api/auth`,
});

export const axiosPost = axios.create({
  baseURL: `http://localhost:4000/api/posts`,
});

export const axiosComment = axios.create({
  baseURL: `http://localhost:4000/api/comments`,
});
