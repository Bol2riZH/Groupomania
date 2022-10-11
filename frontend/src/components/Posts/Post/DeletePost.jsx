import React from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import classes from './DeletePost.module.scss';

import { axiosPost } from '../../../data/axios';

import Button from '../../UI/Button';

const DeletePost = (props) => {
  const { ...auth } = useAuthContext();

  const deleteHandler = async () => {
    try {
      const res = await axiosPost.delete(`${props._id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'content-type': 'application/json',
        },
      });
      console.log(res.data);
      props.onDeletePost();
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

export default DeletePost;
