import React, { useReducer, useState } from 'react';
import classes from './Post.module.scss';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import {
  ACTIONS,
  dataReducer,
  POST_INITIAL_STATE,
} from '../../Reducer/dataReducer';
import { formData } from '../../../data/formData';
import axios from 'axios';

const EditPost = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));
  const [isEditing, setIsEditing] = useState(true);

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
    const res = await axios.put(
      `http://localhost:4000/api/posts/${props._id}`,
      editData,
      {
        headers: {
          Authorization: `Bearer ${authLog.token}`,
          'content-type': 'multipart/form-data',
        },
      }
    );
    console.log(res.data);
    setIsEditing(false);
    props.onConfirmEditing();
    props.onEditPost();
  };

  return (
    <>
      {isEditing ? (
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
            {props.imageUrl ? <img src={props.imageUrl} alt="message" /> : ''}
          </div>
          <Input
            name="imageUrl"
            htmlFor="postPicture"
            id="postPicture"
            type="file"
            onChange={inputHandler}
          />
          <Button onClick={confirmEditHandler} {...props}>
            Confirmer
          </Button>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default EditPost;
