import axios from 'axios'
import { BASE_URL } from '../utils/constants'

export const login = (user) => {
  return axios.post(`${BASE_URL}/user/login`, user, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const register = (user) => {
  return axios.post(`${BASE_URL}/user`, user, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const createPost = (post) => {
  return axios.post(`${BASE_URL}/post/create`, post, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const getAllPosts = () => {
  return axios.get(`${BASE_URL}/post`, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const getPostsForUserAPI = (id) => {
  return axios.get(`${BASE_URL}/post/${id}`, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const getAllUsers = () => {
  return axios.get(`${BASE_URL}/user`, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const getUserInfo = (id) => {
  return axios.get(`${BASE_URL}/user/${id}`, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const getAllChats = () => {
  return axios.get(`${BASE_URL}/chat`, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const getChatWithUser = (id) => {
  return axios.get(`${BASE_URL}/chat/${id}`, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const updateUser = (user) => {
  return axios.patch(`${BASE_URL}/user`, user, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const updatePost = (id,post) => {
  return axios.patch(`${BASE_URL}/post/${id}`, post, {
    header: {
      'content-type': 'application.json',
    },
  })
}

export const contactUserForPost = (postId) => {
  return axios.post(`${BASE_URL}/contact/${postId}`,null, {
    header: {
      'content-type': 'application.json',
    },
  })
}

export const getContactWithUser = (userId) => {
  return axios.get(`${BASE_URL}/contact/${userId}`, {
    header: {
      'content-type': 'application.json',
    },
  })
}

export const deletePost = (id) => {
  return axios.delete(`${BASE_URL}/post/${id}`, {
    headers: {
      'content-type': 'application/json',
    },
  })
}
