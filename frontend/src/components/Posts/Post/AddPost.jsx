import React, { useReducer, useState } from 'react';
import { useAuthContext } from '../../../store/useAuthContext';
import { AuthContext } from '../../../store/AuthContext';

import {
  ACTIONS,
  POST_INITIAL_STATE,
  postReducer,
} from '../../../reducer/postReducer';
import { formData } from '../../../utils/formData';

import classes from './AddPost.module.scss';
import Input from '../../UI/Input';
import Textarea from '../../UI/Textarea';
import Error from '../../UI/Error';
import { FaCameraRetro } from 'react-icons/fa';
import { ImArrowUp } from 'react-icons/im';
import defaultProfilePicture from '../../../assets/images/defaultProfilePicture.svg';

const AddPost = (add) => {
  const { ...auth } = useAuthContext(AuthContext);
  const [isEmptyForm, setIsEmptyForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [state, dispatch] = useReducer(postReducer, POST_INITIAL_STATE);

  const inputHandler = (e) => {
    if (!state.post) state.isValidPost = true;
    if (!state.title) state.isValidTitle = true;

    setIsEditing(true);
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
      add.onAddPost(formData(state), auth);
      e.target.reset();
      dispatch({
        type: ACTIONS.CLEAR_INPUT,
      });
      setIsEditing(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      onKeyDown={(e) => e.key === 'Escape' && setIsEditing(false)}
    >
      {isEmptyForm && (
        <Error className={classes.errorMain}>
          Écrivez un message avant de l'envoyer
        </Error>
      )}
      <header className={classes.header}>
        <h2>Bonjour {auth.username}</h2>
        {!state.isValidTitle ? (
          <Error className={classes.error}>
            Vous devez donnez un titre à votre message
          </Error>
        ) : (
          ''
        )}
        <Input
          className={classes.title}
          name="title"
          placeholder="Quelles sont les nouvelles ?"
          onChange={inputHandler}
          onBlur={() => {
            if (!state.title && !state.post) {
              setIsEditing(false);
            }
          }}
          isValid={state.isValidTitle}
        />
      </header>
      <div className={classes.container}>
        <div className={`${classes.postCard} ${!isEditing && classes.hidden}`}>
          <Input
            className={classes.upload}
            name="imageUrl"
            htmlFor="postPicture"
            id="postPicture"
            type="file"
            value={state.imageUrl}
            onChange={inputHandler}
            label={
              <>
                {state.imageUrl ? (
                  <div className={classes.image}>
                    <img src={URL.createObjectURL(state.imageUrl)} alt="post" />
                  </div>
                ) : (
                  <FaCameraRetro className={classes.faCamera} />
                )}
              </>
            }
            isValid={state.isValidImageUrl}
          />
          {!state.isValidPost ? (
            <Error className={classes.error}>
              Vous devez écrire un message
            </Error>
          ) : (
            ''
          )}
          <Textarea
            placeholder="...message"
            name="post"
            id="post"
            rows="10"
            onChange={inputHandler}
            isvalid={state.isValidPost.toString()}
          />
          <button type="submit" className={classes.btnHidden}>
            <ImArrowUp className={classes.send} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddPost;
