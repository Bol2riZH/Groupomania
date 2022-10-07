import React from 'react';
import classes from './Comment.module.scss';

import Button from '../../UI/Button';

const CommentPost = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));

  const confirmCommentPostHandler = () => {
    props.onConfirmCommentPost();
  };
  const cancelCommentPostHandler = () => {
    props.onCancelCommentPost();
  };

  return (
    <div className={classes.comment}>
      <Button onClick={confirmCommentPostHandler}>Envoyer</Button>
      <Button onClick={cancelCommentPostHandler}>Annuler</Button>
      <textarea name="comment" id="" cols="30" rows="10"></textarea>
    </div>
  );
};

export default CommentPost;
