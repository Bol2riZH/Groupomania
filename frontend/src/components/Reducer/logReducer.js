export const LOG_INITIAL_STATE = {
  email: '',
  password: '',
  isValidEmail: true,
  isValidPassword: true,
};

export const ACTIONS = {
  INPUT_TEXT: 'input_text',
  IS_VALID_EMAIL: 'is_valid_email',
  IS_VALID_PASSWORD: 'is_valid_password',
};

export const logReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INPUT_TEXT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTIONS.IS_VALID_EMAIL:
      if (!state.email.includes('@')) {
        return {
          ...state,
          isValidEmail: false,
        };
      }
      return {
        ...state,
        isValidEmail: true,
      };
    case ACTIONS.IS_VALID_PASSWORD:
      if (state.password.length < 8) {
        return {
          ...state,
          isValidPassword: false,
        };
      }
      return {
        ...state,
        isValidPassword: true,
      };
    default:
      return state;
  }
};
