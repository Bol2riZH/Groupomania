import React, { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import classes from './AddComment.module.scss';

import { axiosComment } from '../../../data/axios';

import Button from '../../UI/Button';
import Input from '../../UI/Input';

const AddComment = (props) => {
  const { ...auth } = useAuthContext();

  const [comment, setComment] = useState('');

  const inputHandler = (e) => {
    setComment(e.target.value);
  };

  const confirmCommentHandler = async () => {
    try {
      const res = await axiosComment.post(
        `${props._id}`,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'content-type': 'application/json',
          },
        }
      );
      console.log(res.data);
      props.onConfirmComment();
      props.onComment();
    } catch (err) {
      console.error(err);
    }
  };
  const cancelCommentHandler = () => {
    props.onCancelComment();
  };

  return (
    <div className={classes.comment}>
      <Input
        name="comment"
        id="comment"
        placeHolder="Écrivez un commentaire..."
        onChange={inputHandler}
      />
      <Button onClick={confirmCommentHandler}>Envoyer</Button>
      <Button onClick={cancelCommentHandler}>Annuler</Button>
    </div>
  );
};

export default AddComment;
