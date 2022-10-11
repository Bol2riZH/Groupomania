import React, { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import classes from './AddComment.module.scss';

import Button from '../../UI/Button';
import Input from '../../UI/Input';
import axios from 'axios';

const AddComment = (props) => {
  const { ...auth } = useAuthContext();

  const [comment, setComment] = useState('');

  const inputHandler = (e) => {
    setComment(e.target.value);
  };

  const confirmCommentHandler = async () => {
    const res = await axios.post(
      `http://localhost:4000/api/comments/${props._id}`,
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
