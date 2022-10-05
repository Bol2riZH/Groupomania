import React, { useReducer } from 'react';
import { profileReducer, ACTIONS, INITIAL_STATE } from './profileReducer';

/*TODO : that's not working.....*/
const useProfileReducer = (e, inputFileName) => {
  const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE);

  if (e.target.name === inputFileName) {
    dispatch({
      type: ACTIONS.INPUT_FILE,
      payload: { name: e.target.name, files: e.target.files[0] },
    });
  } else {
    dispatch({
      type: ACTIONS.INPUT_TEXT,
      payload: { name: e.target.name, value: e.target.value },
    });
  }
  return state;
};

export default useProfileReducer;
