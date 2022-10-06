import React, { useState } from 'react';

import classes from './Post.module.scss';

import Card from '../../UI/Card';
import Button from '../../UI/Button';
import axios from 'axios';

const Post = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));
  const [isEditing, setIsEditing] = useState(false);
  const [likePost, setLikePost] = useState(+props.likes);

  const isEditingHandler = () => {
    setIsEditing(true);
    console.log(isEditing);
  };

  const likeHandler = async () => {
    const res = await axios.post(
      `http://localhost:4000/api/posts/${props._id}/notice`,
      {
        like: props.usersLiked.find((userId) => userId === authLog.id) ? 0 : 1,
      },
      {
        headers: {
          Authorization: `Bearer ${authLog.token}`,
          'content-type': 'application/json',
        },
      }
    );
    console.log(res.data);
    setLikePost(+props.likes);
    props.onLike(props.likes);
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
          <p>{props.post}</p>
          <div className={props.imageUrl && classes.img}>
            {props.imageUrl ? <img src={props.imageUrl} alt="message" /> : ''}
          </div>
        </section>
        <footer>
          {authLog.id === props.userId ? (
            <>
              <Button onClick={isEditingHandler}>Modifier</Button>
              <Button className={classes.btnDelete} onClick={isEditingHandler}>
                Supprimer
              </Button>
            </>
          ) : (
            <>
              <Button className={classes.btnLike} onClick={likeHandler}>
                J'aime
              </Button>
              <span>{+props.likes}</span>
              <Button>Commenter</Button>
            </>
          )}
          <time>{props.postedTime}</time>
        </footer>
      </Card>
    </li>
  );
};

export default Post;
