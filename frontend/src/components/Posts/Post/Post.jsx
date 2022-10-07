import React, { useState } from 'react';
import classes from './Post.module.scss';

import Card from '../../UI/Card';
import Button from '../../UI/Button';

import DeletePost from './DeletePost';
import LikePost from './LikePost';
import EditPost from './EditPost';

const Post = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));
  const [isEditing, setIsEditing] = useState(false);

  const editHandler = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
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
        {!isEditing ? (
          <section className={classes.post}>
            <h2>{props.title}</h2>
            <p>{props.post}</p>
            <div className={props.imageUrl && classes.img}>
              {props.imageUrl ? <img src={props.imageUrl} alt="message" /> : ''}
            </div>
            {authLog.id === props.userId ? (
              <Button onClick={editHandler}>Modifier</Button>
            ) : (
              ''
            )}
          </section>
        ) : (
          <>
            <EditPost {...props} onConfirmEditing={editHandler} />
            <Button onClick={editHandler}>Annuler</Button>
          </>
        )}
        <footer>
          {authLog.id === props.userId ? (
            <DeletePost {...props} />
          ) : (
            <LikePost {...props} />
          )}
          <Button>Commenter</Button>
          <time>{props.postedTime}</time>
        </footer>
      </Card>
    </li>
  );
};

export default Post;
