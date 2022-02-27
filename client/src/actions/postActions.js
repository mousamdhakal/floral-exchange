export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const GET_USER_POSTS_REQUEST = 'GET_USER_POSTS_REQUEST';
export const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS';
export const GET_USER_POSTS_FAILURE = 'GET_USER_POSTS_FAILURE';

export const createPost = (post) => ({
  type: CREATE_POST_REQUEST,
  payload: post
})

export const createPostSuccess = (message) => ({
  type: CREATE_POST_SUCCESS,
  payload: message
});

export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: error
});

export const getPosts = () => ({
  type: GET_POSTS_REQUEST,
  payload: null
})

export const getPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts
});

export const getPostsFailure = (error) => ({
  type: GET_POSTS_FAILURE,
  payload: error
});

export const getUserPosts = (id) => ({
  type: GET_USER_POSTS_REQUEST,
  payload: id,
})

export const getUserPostsSuccess = (posts) => ({
  type: GET_USER_POSTS_SUCCESS,
  payload: posts
});

export const getUserPostsFailure = (error) => ({
  type: GET_USER_POSTS_FAILURE,
  payload: error
});