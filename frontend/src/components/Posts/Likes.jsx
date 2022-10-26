import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../store/useAuthContext';

import { axiosPost, axiosComment } from '../../utils/axios';

import classes from './Likes.module.scss';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';

const Likes = (props) => {
  const { ...auth } = useAuthContext();

  const [likes, setLikes] = useState(+props.likes);
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
    console.log(stateLike);

    let sendTo;
    if (props.post) sendTo = axiosPost;
    if (props.comment) sendTo = axiosComment;

    try {
      const res = await sendTo.post(
        `like/${props._id}`,
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
      console.log(res.data.stateLike);
      !stateLike ? setLikes(+props.likes + 1) : setLikes(+props.likes - 1);
      props.onLike();
      setStateLike(res.data.stateLike);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.like}>
      {auth.id !== props.userId && auth.role !== 'admin' ? (
        stateLike === 0 || stateLike === undefined ? (
          <BsSuitHeart
            className={props.post ? classes.icon : classes.iconComment}
            onClick={likeHandler}
          />
        ) : (
          <BsSuitHeartFill
            className={props.post ? classes.icon : classes.iconComment}
            onClick={likeHandler}
          />
        )
      ) : (
        <BsSuitHeartFill
          className={props.post ? classes.iconOnly : classes.iconOnlyComment}
        />
      )}
      <span>{likes}</span>
    </div>
  );
};

export default Likes;
