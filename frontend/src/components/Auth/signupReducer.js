export const INITIAL_STATE = {
  profilePictureUrl: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const ACTIONS = {
  INPUT_TEXT: 'input_text',
  INPUT_FILE: 'input_file',
};

export const signupReducer = (state, action) => {
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
