import React, { useState } from 'react';

import classes from './Post.module.scss';

import axios from 'axios';
import { formData } from '../../../data/formData';

import Card from '../../UI/Card';
import Button from '../../UI/Button';

import DeletePost from './DeletePost';
import LikePost from './LikePost';

const Post = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(false);

  const editHandler = () => {
    setIsEditing(true);
    console.log(isEditing);
  };

  const confirmEditHandler = async () => {
    formData(editContent);
    const res = await axios.put(
      `http://localhost:4000/api/posts/${props._id}`,
      formData,
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
  const cancelEditHandler = () => {
    setEditContent(props.post);
    setIsEditing(false);
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
          <h2>{props.title}</h2>
          {!isEditing ? (
            <p>{editContent ? editContent : props.post}</p>
          ) : (
            <textarea
              autoFocus
              defaultValue={editContent ? editContent : props.post}
              onChange={(e) => setEditContent(e.target.value)}
            ></textarea>
          )}
          <div className={props.imageUrl && classes.img}>
            {props.imageUrl ? <img src={props.imageUrl} alt="message" /> : ''}
          </div>
        </section>
        <footer>
          {authLog.id === props.userId ? (
            <>
              {!isEditing ? (
                <Button onClick={editHandler}>Modifier</Button>
              ) : (
                <>
                  <Button onClick={confirmEditHandler}>Confirmer</Button>
                  <Button onClick={cancelEditHandler}>Annuler</Button>
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
