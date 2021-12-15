export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

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