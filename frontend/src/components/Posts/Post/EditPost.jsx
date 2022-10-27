import React, { useReducer, useState } from 'react';
import { useAuthContext } from '../../../store/useAuthContext';

import { axiosPost } from '../../../utils/axios';

import {
  ACTIONS,
  postReducer,
  POST_INITIAL_STATE,
} from '../../../reducer/postReducer';
import { formData, formEditData } from '../../../utils/formData';

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
    dispatch({
      type: ACTIONS.INPUT,
      payload:
        e.target.name === 'imageUrl'
          ? { name: e.target.name, files: e.target.files[0] }
          : { name: e.target.name, value: e.target.value },
    });
  };

  const confirmEditHandler = async () => {
    const editData = imageUrl ? formEditData(imageUrl, state) : formData(state);
    try {
      const res = await axiosPost.put(`${edit._id}`, editData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'content-type': 'multipart/form-utils',
        },
      });
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
          'content-type': 'multipart/form-utils',
        },
      });
      edit.onConfirmEditing();
      edit.onEditPost();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // TEST :
    // no post image and no upload post image on edit > show camera
    // post image > show post image
    // upload post image on edit > show post image on edit
    <section className={classes.post}>
      {(edit.imageUrl || imageUrl) && (
        <ImCross onClick={deletePostPicture} className={classes.cross} />
      )}

      <label htmlFor="editImage">
        {!edit.ImageUrl && !imageUrl && (
          <FaCameraRetro className={classes.faCamera} />
        )}

        {edit.imageUrl && !imageUrl && (
          <div className={classes.image}>
            <img src={edit.imageUrl} alt="message" />
          </div>
        )}

        {imageUrl && (
          <div className={classes.image}>
            <img src={URL.createObjectURL(imageUrl)} alt="post" />
          </div>
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
      <Input
        className={classes.input}
        name="title"
        placeholder={edit.title}
        value={edit.title}
        onChange={inputHandler}
        isValid={state.isValidTitle}
      />
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
