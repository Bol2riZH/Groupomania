import React, { useReducer } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import classes from './EditPost.module.scss';

import { axiosPost } from '../../../data/axios';

import {
  ACTIONS,
  dataReducer,
  POST_INITIAL_STATE,
} from '../../Reducer/dataReducer';
import { formData } from '../../../data/formData';

import Input from '../../UI/Input';
import Button from '../../UI/Button';

const EditPost = (props) => {
  const { ...auth } = useAuthContext();

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

  const confirmEditHandler = async () => {
    const editData = formData(state);
    try {
      const res = await axiosPost.put(`${props._id}`, editData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'content-type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      props.onConfirmEditing();
      props.onEditPost();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEditHandler = () => {
    props.onCancelEditing();
  };

  const deletePostPicture = async () => {
    const editData = formData(state);
    try {
      const res = await axiosPost.put(`remove-image/${props._id}`, editData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'content-type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      props.onConfirmEditing();
      props.onEditPost();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className={classes.post}>
        <Input
          name="title"
          placeHolder={props.title}
          defaultValue={props.title}
          onChange={inputHandler}
        />
        <textarea
          autoFocus
          name={'post'}
          defaultValue={props.post}
          onChange={inputHandler}
        ></textarea>
        <div className={props.imageUrl && classes.img}>
          {props.imageUrl ? (
            <>
              <img src={props.imageUrl} alt="message" />
              <Button onClick={deletePostPicture}>X</Button>
            </>
          ) : (
            ''
          )}
        </div>
        <Input
          name="imageUrl"
          htmlFor="postPicture"
          id="postPicture"
          type="file"
          onChange={inputHandler}
        />
        <Button className={classes.btn} onClick={confirmEditHandler}>
          Confirmer
        </Button>
        <Button className={classes.btn} onClick={cancelEditHandler}>
          Annuler
        </Button>
      </section>
    </>
  );
};

export default EditPost;
