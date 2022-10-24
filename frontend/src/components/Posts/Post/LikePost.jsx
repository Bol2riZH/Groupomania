import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

import { axiosPost } from '../../../data/axios';

import classes from './Post.module.scss';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';

const LikePost = (props) => {
  const { ...auth } = useAuthContext();

  const [likePost, setLikePost] = useState(+props.likes);
  const [stateLike, setStateLike] = useState(
    props.usersLiked.find((userId) => userId === auth.id)
  );

  useEffect(() => {
    getStateLike();
  }, []);

  const getStateLike = async () => {
    try {
      await setStateLike(props.usersLiked.find((userId) => userId === auth.id));
    } catch (err) {
      console.error(err);
    }
  };

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
      setStateLike(res.data.stateLike);
      props.onLikePost();
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
      <span>{likePost}</span>
    </div>
  );
};

export default LikePost;
