export const USER_INITIAL_STATE = {
  profilePictureUrl: '',
  username: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',

  isValidProfilPicture: true,
  isValidUsername: true,
  isValidEmail: true,
  isValidConfirmEmail: true,
  isValidPassword: true,
  isValidConfirmPassword: true,
};

export const ACTIONS = {
  INPUT: 'input',
  IS_VALID: 'is_valid',
};

/*///////////////*/
/* TODO : REGEX */
/*/////////////*/
export const signupReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INPUT:
      return {
        ...state,
        [action.payload.name]:
          action.payload.name === 'profilePictureUrl'
            ? action.payload.files
            : action.payload.value,
      };
    case ACTIONS.IS_VALID:
      if (state.profilePictureUrl.size > 1000000)
        return {
          ...state,
          isValidProfilPicture: false,

          isValidUsername: true,
          isValidEmail: true,
          isValidConfirmEmail: true,
          isValidPassword: true,
          isValidConfirmPassword: true,
        };
      if (!state.username)
        return {
          ...state,
          isValidUsername: false,

          isValidProfilPicture: true,
          isValidEmail: true,
          isValidConfirmEmail: true,
          isValidPassword: true,
          isValidConfirmPassword: true,
        };
      if (!state.email.includes('@'))
        return {
          ...state,
          isValidEmail: false,

          isValidProfilPicture: true,
          isValidUsername: true,
          isValidConfirmEmail: true,
          isValidPassword: true,
          isValidConfirmPassword: true,
        };
      if (state.confirmEmail !== state.email)
        return {
          ...state,
          isValidConfirmEmail: false,

          isValidProfilPicture: true,
          isValidUsername: true,
          isValidEmail: true,
          isValidPassword: true,
          isValidConfirmPassword: true,
        };
      if (state.password < 8)
        return {
          ...state,
          isValidPassword: false,

          isValidProfilPicture: true,
          isValidUsername: true,
          isValidEmail: true,
          isValidConfirmEmail: true,
          isValidConfirmPassword: true,
        };
      if (state.confirmPassword !== state.password)
        return {
          ...state,
          isValidConfirmPassword: false,

          isValidProfilPicture: true,
          isValidUsername: true,
          isValidEmail: true,
          isValidConfirmEmail: true,
          isValidPassword: true,
        };
      return {
        ...state,
        isValidProfilPicture: true,
        isValidUsername: true,
        isValidEmail: true,
        isValidConfirmEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
      };
    default:
      return state;
  }
};
