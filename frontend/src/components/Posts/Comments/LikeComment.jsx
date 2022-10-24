import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

import { axiosComment } from '../../../data/axios';

import classes from './LikeComment.module.scss';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';

const LikeComment = (comment) => {
  const { ...auth } = useAuthContext();

  const [likeComment, setLikeComment] = useState(+comment.likes);
  const [stateLike, setStateLike] = useState(
    comment.usersLiked.find((userId) => userId === auth.id)
  );

  useEffect(() => {
    getStateLike();
  }, []);

  const getStateLike = async () => {
    try {
      await setStateLike(
        comment.usersLiked.find((userId) => userId === auth.id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const likeHandler = async () => {
    const stateLike = await comment.usersLiked.find(
      (userId) => userId === auth.id
    );
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
      setStateLike(res.data.stateLike);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.like}>
      {stateLike === 0 || stateLike === undefined ? (
        <BsSuitHeart className={classes.icon} onClick={likeHandler} />
      ) : (
        <BsSuitHeartFill className={classes.icon} onClick={likeHandler} />
      )}
      <span>{likeComment}</span>
    </div>
  );
};

export default LikeComment;
