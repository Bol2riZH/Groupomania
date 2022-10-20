import React, { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import classes from './AddComment.module.scss';

import { axiosComment } from '../../../data/axios';

import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Error from '../../UI/Error';

const AddComment = (props) => {
  const { ...auth } = useAuthContext();

  const [comment, setComment] = useState('');
  const [isValid, setIsValid] = useState(true);

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
      if (comment !== '') {
        props.onConfirmComment();
        props.onComment();
        setIsValid(true);
      }
    } catch (err) {
      setIsValid(false);
      console.error(err);
    }
  };
  const cancelCommentHandler = () => {
    props.onCancelComment();
  };

  return (
    <div className={classes.comment}>
      <Input
        autoFocus
        name="comment"
        id="comment"
        placeholder="Écrivez un commentaire..."
        value={comment}
        onChange={inputHandler}
      />
      {!isValid ? (
        <Error>Vous devez écrire un commentaire avant de l'envoyer</Error>
      ) : (
        ''
      )}
      <Button onClick={confirmCommentHandler}>Envoyer</Button>
      <Button onClick={cancelCommentHandler}>Annuler</Button>
    </div>
  );
};

export default AddComment;
