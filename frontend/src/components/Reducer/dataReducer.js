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
  CLEAR_INPUT: 'clear_input',
};

export const dataReducer = (state, action) => {
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
    case ACTIONS.CLEAR_INPUT:
      return {
        [action.payload.name]: action.payload.files,
      };
    default:
      return state;
  }
};
