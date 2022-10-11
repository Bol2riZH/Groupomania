import React from 'react';
import classes from './DeleteComment.module.scss';

import { axiosComment } from '../../../data/axios';

import Button from '../../UI/Button';

const DeleteComment = (comment) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));

  const deleteHandler = async () => {
    const res = await axiosComment.delete(`${comment._id}`, {
      headers: {
        Authorization: `Bearer ${authLog.token}`,
        'content-type': 'application/json',
      },
    });
    console.log(res.data);
    comment.onDeleteComment();
  };

  return (
    <Button className={classes.btnDelete} onClick={deleteHandler}>
      Supprimer
    </Button>
  );
};

export default DeleteComment;
