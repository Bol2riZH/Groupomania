import React, { useReducer, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { AuthContext } from '../../../store/AuthContext';

import {
  ACTIONS,
  POST_INITIAL_STATE,
  postReducer,
} from '../../Reducer/postReducer';
import { formData } from '../../../data/formData';

import Card from '../../UI/Card';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Textarea from '../../UI/Textarea';
import Error from '../../UI/Error';
import classes from '../../Auth/SignupForm.module.scss';
import { FaCameraRetro } from 'react-icons/fa';
import defaultProfilePicture from '../../../assets/images/defaultProfilePicture.svg';

const AddPost = (props) => {
  const { ...auth } = useAuthContext(AuthContext);
  const [isEmptyForm, setIsEmptyForm] = useState(null);

  const [state, dispatch] = useReducer(postReducer, POST_INITIAL_STATE);

  const inputHandler = (e) => {
    dispatch({
      type: ACTIONS.INPUT,
      payload:
        e.target.name === 'imageUrl'
          ? { name: e.target.name, files: e.target.files[0] }
          : { name: e.target.name, value: e.target.value },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.IS_VALID,
    });
    const postInput = [];
    state.title && postInput.push(state.isValidTitle);
    state.post && postInput.push(state.isValidPost);
    state.imageUrl && postInput.push(state.isValidImageUrl);

    postInput.length === 0 ? setIsEmptyForm(true) : setIsEmptyForm(false);

    if (state.title !== '' && state.post !== '') {
      props.onAddPost(formData(state), auth);
      e.target.reset();
      dispatch({
        type: ACTIONS.CLEAR_INPUT,
      });
    }
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        {isEmptyForm && <Error>Écrivez un message avant de l'envoyer</Error>}

        <h2>Quelles sont les nouvelles ?</h2>
        <Input
          name="title"
          placeHolder="Titre de votre message"
          value={state}
          onChange={inputHandler}
        />
        {!state.isValidTitle ? (
          <Error>Vous devez donnez un titre à votre message</Error>
        ) : (
          ''
        )}
        <Textarea
          placeholder="...message"
          name="post"
          id="post"
          rows="10"
          onChange={inputHandler}
        />
        {!state.isValidPost ? <Error>Vous devez écrire un message</Error> : ''}
        <Input
          className={classes.upload}
          name="imageUrl"
          htmlFor="postPicture"
          id="postPicture"
          type="file"
          value={state}
          onChange={inputHandler}
          label={
            <>
              {state.imageUrl ? (
                <>
                  <div className={classes.image}>
                    <img src={URL.createObjectURL(state.imageUrl)} alt="post" />
                  </div>
                </>
              ) : (
                <>
                  <FaCameraRetro />
                </>
              )}
            </>
          }
        />
        <Button type="submit">Envoyer</Button>
      </form>
    </Card>
  );
};

export default AddPost;
