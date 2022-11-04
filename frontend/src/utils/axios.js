import axios from 'axios';

const baseUrlVercel = `https://open-classrooms-p7-backend.vercel.app`;

export const axiosUser = axios.create({
  baseURL: `${baseUrlVercel}/api/auth`,
});

export const axiosPost = axios.create({
  baseURL: `${baseUrlVercel}/api/posts`,
});

export const axiosComment = axios.create({
  baseURL: `${baseUrlVercel}/api/comments`,
});
