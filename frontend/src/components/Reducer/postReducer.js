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
    default:
      return state;
  }
};
