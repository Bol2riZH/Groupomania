import axios from 'axios';

// base url from heroku
const baseUrl = 'https://bgroupomania.herokuapp.com';

export const axiosUser = axios.create({
  baseURL: `${baseUrl}/api/auth`,
});

export const axiosPost = axios.create({
  baseURL: `${baseUrl}/api/posts`,
});

export const axiosComment = axios.create({
  baseURL: `${baseUrl}/api/comments`,
});
