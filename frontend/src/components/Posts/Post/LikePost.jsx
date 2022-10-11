import React, { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import classes from './Post.module.scss';

import { axiosPost } from '../../../data/axios';

import Button from '../../UI/Button';

const LikePost = (props) => {
  const { ...auth } = useAuthContext();

  const [likePost, setLikePost] = useState(+props.likes);

  const likeHandler = async () => {
    const stateLike = props.usersLiked.find((userId) => userId === auth.id);
    try {
      const res = await axiosPost.post(
        `notice/${props._id}`,
        {
          like: stateLike ? 0 : 1,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'content-type': 'application/json',
          },
        }
      );
      console.log(res.data);
      !stateLike
        ? setLikePost(+props.likes + 1)
        : setLikePost(+props.likes - 1);
      props.onLikePost();
    } catch (err) {
      console.error(err);
    }
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
