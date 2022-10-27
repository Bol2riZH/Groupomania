export const LOG_INITIAL_STATE = {
  email: '',
  password: '',
  isValidEmail: true,
  isValidPassword: true,
};

export const ACTIONS = {
  INPUT_TEXT: 'input_text',
  IS_VALID: 'is_valid',
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INPUT_TEXT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTIONS.IS_VALID:
      if (!state.email.includes('@')) {
        return {
          ...state,
          isValidEmail: false,
        };
      }
      if (state.password.length < 8) {
        return {
          ...state,
          isValidPassword: false,
        };
      }
      return {
        ...state,
        isValidEmail: true,
        isValidPassword: true,
      };
    default:
      return state;
  }
};
