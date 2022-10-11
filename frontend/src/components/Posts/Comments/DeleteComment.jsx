import React from 'react';
import classes from './DeleteComment.module.scss';

import { axiosComment } from '../../../data/axios';

import Button from '../../UI/Button';
import { useAuthContext } from '../../../hooks/useAuthContext';

const DeleteComment = (comment) => {
  const { ...auth } = useAuthContext();

  const deleteHandler = async () => {
    try {
      const res = await axiosComment.delete(`${comment._id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'content-type': 'application/json',
        },
      });
      console.log(res.data);
      comment.onDeleteComment();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button className={classes.btnDelete} onClick={deleteHandler}>
      Supprimer
    </Button>
  );
};

export default DeleteComment;
