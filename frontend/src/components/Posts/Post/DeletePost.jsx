import React from 'react';
import classes from './DeletePost.module.scss';

import Button from '../../UI/Button';
import axios from 'axios';

const DeletePost = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));

  const deleteHandler = async () => {
    const res = await axios.delete(
      `http://localhost:4000/api/posts/${props._id}`,
      {
        headers: {
          Authorization: `Bearer ${authLog.token}`,
          'content-type': 'application/json',
        },
      }
    );
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
