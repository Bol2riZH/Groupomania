import React, { useReducer } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

import {
  ACTIONS,
  POST_INITIAL_STATE,
  dataReducer,
} from '../../Reducer/dataReducer';
import { formData } from '../../../data/formData';

import Card from '../../UI/Card';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Textarea from '../../UI/Textarea';
import { AuthContext } from '../../../store/AuthContext';

const AddPost = (props) => {
  const { ...auth } = useAuthContext(AuthContext);

  const [state, dispatch] = useReducer(dataReducer, POST_INITIAL_STATE);

  const inputHandler = (e) => {
    if (e.target.name === 'imageUrl') {
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
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAddPost(formData(state), auth);
    e.target.reset();
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <h2>Quelles sont les nouvelles ?</h2>
        <Input
          name="title"
          placeHolder="Titre de votre message"
          value={state}
          onChange={inputHandler}
        />
        <Textarea
          placeholder="...message"
          name="post"
          id="post"
          rows="10"
          onChange={inputHandler}
        />
        <Input
          name="imageUrl"
          htmlFor="postPicture"
          id="postPicture"
          type="file"
          value={state}
          onChange={inputHandler}
        />
        <Button type="submit">Envoyer</Button>
      </form>
    </Card>
  );
};

export default AddPost;
