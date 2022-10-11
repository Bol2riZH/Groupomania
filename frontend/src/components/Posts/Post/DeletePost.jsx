import React from 'react';
import classes from './DeletePost.module.scss';

import { axiosPost } from '../../../data/axios';

import Button from '../../UI/Button';

const DeletePost = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));

  const deleteHandler = async () => {
    const res = await axiosPost.delete(`${props._id}`, {
      headers: {
        Authorization: `Bearer ${authLog.token}`,
        'content-type': 'application/json',
      },
    });
    console.log(res.data);
    props.onDeletePost();
  };

  return (
    <Button className={classes.btnDelete} onClick={deleteHandler}>
      Supprimer
    </Button>
  );
};

export default DeletePost;
