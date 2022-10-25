import React, { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

import { axiosComment } from '../../../data/axios';

import classes from './AddComment.module.scss';
import Input from '../../UI/Input';
import Error from '../../UI/Error';
import { ImArrowUp } from 'react-icons/im';

const AddComment = (props) => {
  const { ...auth } = useAuthContext();

  const [comment, setComment] = useState('');
  const [isValid, setIsValid] = useState(true);

  const inputHandler = (e) => {
    setComment(e.target.value);
    comment && setIsValid(true);
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

  return (
    <div className={classes.container}>
      <div className={classes.comment}>
        <Input
          autoFocus
          name="comment"
          id="comment"
          placeholder="Écrivez un commentaire..."
          value={comment}
          onChange={inputHandler}
          isValid={isValid}
          label={
            <ImArrowUp
              className={classes.send}
              onClick={confirmCommentHandler}
            />
          }
          onKeyDown={(e) => {
            e.key === 'Enter' && confirmCommentHandler();
            e.key === 'Escape' && props.onCancelComment();
          }}
          onBlur={() => {
            !comment && props.onCancelComment();
          }}
        />
      </div>
      {!isValid ? (
        <Error className={classes.error}>
          Vous devez écrire un commentaire avant de l'envoyer
        </Error>
      ) : (
        ''
      )}
    </div>
  );
};

export default AddComment;
