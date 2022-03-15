export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const GET_USER_POSTS_REQUEST = 'GET_USER_POSTS_REQUEST';
export const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS';
export const GET_USER_POSTS_FAILURE = 'GET_USER_POSTS_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';


export const createPost = (post) => ({
  type: CREATE_POST_REQUEST,
  payload: post
})

export const createPostSuccess = (post) => ({
  type: CREATE_POST_SUCCESS,
  payload: post
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

export const updatePost = (postData) => ({
  type: UPDATE_POST_REQUEST,
  payload: postData
})

export const updatePostSuccess = (post) => ({
  type: UPDATE_POST_SUCCESS,
  payload: post
});

export const updatePostFailure = (error) => ({
  type: UPDATE_POST_FAILURE,
  payload: error
});

export const deletePost = (id) => ({
  type: DELETE_POST_REQUEST,
  payload: id
})

export const deletePostSuccess = (id) => ({
  type: DELETE_POST_SUCCESS,
  payload: id
});

export const deletePostFailure = (error) => ({
  type: DELETE_POST_FAILURE,
  payload: error
});