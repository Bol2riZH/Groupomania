import React, { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

import { axiosComment } from '../../../data/axios';

import classes from './LikeComment.module.scss';
import Button from '../../UI/Button';
import { BiLike } from 'react-icons/bi';

const LikeComment = (comment) => {
  const { ...auth } = useAuthContext();

  const [likeComment, setLikeComment] = useState(+comment.likes);

  const likeHandler = async () => {
    const stateLike = comment.usersLiked.find((userId) => userId === auth.id);
    try {
      const res = await axiosComment.post(
        `like/${comment._id}`,
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
        ? setLikeComment(+comment.likes + 1)
        : setLikeComment(+comment.likes - 1);
      comment.onLikeComment();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <BiLike className={classes.like} onClick={likeHandler} />
      <span>{likeComment}</span>
    </>
  );
};

export default LikeComment;
