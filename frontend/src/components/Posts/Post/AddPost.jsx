import React, { useReducer } from 'react';
import classes from './AddPost.module.scss';

import Card from '../../UI/Card';
import Input from '../../UI/Input';
import {
  ACTIONS,
  POST_INITIAL_STATE,
  dataReducer,
} from '../../Reducer/dataReducer';
import { formData } from '../../../data/formData';
import Button from '../../UI/Button';

const AddPost = (props) => {
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
    const authLog = JSON.parse(localStorage.getItem('auth'));
    props.onAddPost(formData(state), authLog);
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <h2>Quelles sont les nouvelles ?</h2>
        <Input
          name="title"
          placeHolder="Titre de votre message"
          onChange={inputHandler}
        />
        <textarea
          className={classes.textArea}
          name="post"
          id="post"
          rows="10"
          onChange={inputHandler}
        ></textarea>
        <Input
          name="imageUrl"
          htmlFor="postPicture"
          id="postPicture"
          type="file"
          onChange={inputHandler}
        />
        <Button type="submit">Envoyer</Button>
      </form>
    </Card>
  );
};

export default AddPost;
