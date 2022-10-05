import React, { useReducer } from 'react';

import classes from './AddPost.module.scss';

import Card from '../../UI/Card';
import Input from '../../UI/Input';
import {
  ACTIONS,
  INITIAL_STATE,
  profileReducer,
} from '../../Reducer/Profile/profileReducer';
import { formData } from '../../../data/formData';
import Button from '../../UI/Button';

const AddPost = (props) => {
  const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE);

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
    props.onAddPost(formData(state), state);
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <h2>Quelles sont les nouvelles ?</h2>
        <Input placeHolder="Titre de votre message" onChange={inputHandler} />
        <textarea
          className={classes.textArea}
          name="message"
          id="message"
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
