import React, { useState } from 'react';
import classes from './AddComment.module.scss';

import Button from '../../UI/Button';
import Input from '../../UI/Input';
import axios from 'axios';

const AddComment = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));

  const [comment, setComment] = useState('');

  const inputHandler = (e) => {
    setComment(e.target.value);
  };

  const confirmCommentHandler = async () => {
    const res = await axios.post(
      `http://localhost:4000/api/posts/${props._id}/comment`,
      {
        comment: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${authLog.token}`,
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
