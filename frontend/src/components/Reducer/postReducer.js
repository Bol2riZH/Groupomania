export const POST_INITIAL_STATE = {
  title: '',
  post: '',
  imageUrl: '',

  isValidTitle: true,
  isValidPost: true,
  isValidImageUrl: true,
};

export const ACTIONS = {
  INPUT: 'input',
  CLEAR_INPUT: 'clear_input',
  IS_VALID: 'is_valid',
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INPUT:
      return {
        ...state,
        [action.payload.name]:
          action.payload.name === 'imageUrl'
            ? action.payload.files
            : action.payload.value,
      };
    case ACTIONS.CLEAR_INPUT:
      return {
        ...POST_INITIAL_STATE,
      };
    case ACTIONS.IS_VALID:
      if (!state.title && !state.post)
        return {
          ...state,
          isValidTitle: false,
          isValidPost: false,

          isValidImageUrl: true,
        };
      if (!state.title)
        return {
          ...state,
          isValidTitle: false,

          isValidImageUrl: true,
          isValidPost: true,
        };
      if (!state.post)
        return {
          ...state,
          isValidPost: false,

          isValidTitle: true,
          isValidImageUrl: true,
        };

      if (state.imageUrl.size > 5000000)
        return {
          ...state,
          isValidImageUrl: false,

          isValidTitle: true,
          isValidPost: true,
        };
      return {
        ...state,
        isValidTitle: true,
        isValidPost: true,
        isValidImageUrl: true,
      };
    default:
      return state;
  }
};
