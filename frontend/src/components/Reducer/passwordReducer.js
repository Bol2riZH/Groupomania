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
  PASSWORD_INPUT: 'password_input',
  PASSWORD_BLUR: 'password_blur',
};

export const passwordReducer = (state, action) => {
  if (action.type === 'PASSWORD_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'PASSWORD_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: '', isValid: false };
};
