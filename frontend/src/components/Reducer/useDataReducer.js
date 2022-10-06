import React, { useReducer } from 'react';
import { dataReducer, ACTIONS, USER_INITIAL_STATE } from './dataReducer';

/*TODO : that's not working.....*/
const useDataReducer = (e, inputFileName) => {
  const [state, dispatch] = useReducer(dataReducer, USER_INITIAL_STATE);

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

export default useDataReducer;
