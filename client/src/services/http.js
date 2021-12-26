import axios from 'axios'
import { BASE_URL } from '../utils/constants'


export const login = (user) => {
  return axios.post(`${BASE_URL}/user/login`, user, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const register = (user) => {
  return axios.post(`${BASE_URL}/user`, user, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const createPost = (post) => {
  return axios.post(`${BASE_URL}/post/create`, post, {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export const getAllPosts = () => {
  return axios.get(`${BASE_URL}/post`, {
    headers: {
      'content-type': 'application/json',
    },
  });
}