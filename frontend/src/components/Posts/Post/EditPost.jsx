import React, { useReducer, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

import { axiosPost } from '../../../data/axios';

import {
  ACTIONS,
  postReducer,
  POST_INITIAL_STATE,
} from '../../Reducer/postReducer';
import { formData, formEditData } from '../../../data/formData';

import classes from './EditPost.module.scss';
import Input from '../../UI/Input';
import Textarea from '../../UI/Textarea';
import { ImCross } from 'react-icons/im';
import { BsCheckLg } from 'react-icons/bs';
import { FaCameraRetro } from 'react-icons/fa';

const EditPost = (edit) => {
  const { ...auth } = useAuthContext();

  const [state, dispatch] = useReducer(postReducer, POST_INITIAL_STATE);
  const [imageUrl, setImageUrl] = useState('');

  const inputHandler = (e) => {
    console.log(e.target.files);
    dispatch({
      type: ACTIONS.INPUT,
      payload:
        e.target.name === 'imageUrl'
          ? { name: e.target.name, files: e.target.files[0] }
          : { name: e.target.name, value: e.target.value },
    });
  };

  const confirmEditHandler = async () => {
    const editData = formEditData(imageUrl, state);
    try {
      const res = await axiosPost.put(`${edit._id}`, editData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'content-type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      edit.onConfirmEditing();
      edit.onEditPost();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePostPicture = async () => {
    const editData = formData(state);
    try {
      const res = await axiosPost.put(`remove-image/${edit._id}`, editData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'content-type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      edit.onConfirmEditing();
      edit.onEditPost();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className={classes.post}>
      <Input
        className={classes.input}
        name="title"
        placeholder={edit.title}
        value={edit.title}
        onChange={inputHandler}
        isValid={state.isValidTitle}
      />
      {edit.imageUrl ? (
        <>
          <ImCross onClick={deletePostPicture} className={classes.cross} />
          <div className={classes.image}>
            <img src={edit.imageUrl} alt="message" />
          </div>
        </>
      ) : (
        <>
          <label htmlFor="editImage">
            {imageUrl ? (
              <div className={classes.image}>
                <img src={URL.createObjectURL(imageUrl)} alt="post" />
              </div>
            ) : (
              <FaCameraRetro className={classes.faCamera} />
            )}
          </label>
          <input
            id="editImage"
            className={classes.upload}
            type="file"
            onChange={(e) => {
              setImageUrl(e.target.files[0]);
            }}
          />
        </>
      )}

      <Textarea
        autoFocus
        name={'post'}
        defaultValue={edit.post}
        onChange={inputHandler}
        isvalid={state.isValidPost.toString()}
      />

      <BsCheckLg
        onClick={confirmEditHandler}
        className={classes.confirmation}
      />
    </section>
  );
};

export default EditPost;
