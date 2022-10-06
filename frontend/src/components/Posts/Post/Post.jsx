import React, { useReducer, useState } from 'react';

import classes from './Post.module.scss';

import axios from 'axios';
import { formData } from '../../../data/formData';

import Card from '../../UI/Card';
import Button from '../../UI/Button';

import DeletePost from './DeletePost';
import LikePost from './LikePost';
import Input from '../../UI/Input';
import {
  ACTIONS,
  dataReducer,
  POST_INITIAL_STATE,
} from '../../Reducer/dataReducer';

const Post = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));
  const [isEditing, setIsEditing] = useState(false);

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

  const editHandler = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
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
    props.onEditPost();
  };

  return (
    <li>
      <Card className={classes.postCard}>
        <header>
          <h2>{props.userInfo.username}</h2>
          <div className={classes.profilePicture}>
            {props.userInfo.profilePictureUrl ? (
              <img src={props.userInfo.profilePictureUrl} alt="profile" />
            ) : (
              ''
            )}
          </div>
        </header>
        <section className={classes.post}>
          {!isEditing ? (
            <>
              <h2>{props.title}</h2>
              <p>{props.post}</p>
              <div className={props.imageUrl && classes.img}>
                {props.imageUrl ? (
                  <img src={props.imageUrl} alt="message" />
                ) : (
                  ''
                )}
              </div>
            </>
          ) : (
            <>
              <Input
                name="title"
                placeHolder={props.title}
                defaultValue={props.title}
                onChange={inputHandler}
              />
              <textarea
                name={'post'}
                autoFocus
                defaultValue={props.post}
                onChange={inputHandler}
              ></textarea>
            </>
          )}
        </section>
        <footer>
          {authLog.id === props.userId ? (
            <>
              {!isEditing ? (
                <Button onClick={editHandler}>Modifier</Button>
              ) : (
                <>
                  <Button onClick={confirmEditHandler}>Confirmer</Button>
                  <Button onClick={editHandler}>Annuler</Button>
                </>
              )}
              <DeletePost {...props} />
            </>
          ) : (
            <>
              <LikePost {...props} />
            </>
          )}
          <time>{props.postedTime}</time>
        </footer>
      </Card>
    </li>
  );
};

export default Post;
