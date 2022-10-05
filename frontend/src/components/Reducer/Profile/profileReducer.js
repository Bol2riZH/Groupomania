export const USER_INITIAL_STATE = {
  profilePictureUrl: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const POST_INITIAL_STATE = {
  title: '',
  post: '',
  imageUrl: '',
};

export const ACTIONS = {
  INPUT_TEXT: 'input_text',
  INPUT_FILE: 'input_file',
};

export const profileReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INPUT_TEXT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTIONS.INPUT_FILE:
      return {
        ...state,
        [action.payload.name]: action.payload.files,
      };
    default:
      return state;
  }
};
