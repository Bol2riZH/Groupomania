import React, { useState } from 'react';
import classes from './Post.module.scss';

import axios from 'axios';
import Button from '../../UI/Button';

const LikePost = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));

  const [likePost, setLikePost] = useState(+props.likes);

  const likeHandler = async () => {
    const stateLike = props.usersLiked.find((userId) => userId === authLog.id);
    const res = await axios.post(
      `http://localhost:4000/api/posts/${props._id}/notice`,
      {
        like: stateLike ? 0 : 1,
      },
      {
        headers: {
          Authorization: `Bearer ${authLog.token}`,
          'content-type': 'application/json',
        },
      }
    );
    console.log(res.data);
    !stateLike ? setLikePost(+props.likes + 1) : setLikePost(+props.likes - 1);
    props.onLikePost();
  };

  return (
    <>
      <Button className={classes.btnLike} onClick={likeHandler}>
        J'aime
      </Button>
      <span>{likePost}</span>
    </>
  );
};

export default LikePost;
