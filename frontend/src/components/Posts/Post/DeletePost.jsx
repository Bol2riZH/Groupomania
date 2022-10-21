import React, { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import classes from './DeletePost.module.scss';

import { axiosPost } from '../../../data/axios';

import Button from '../../UI/Button';
import ConfirmModal from '../../UI/ConfirmModal';

const DeletePost = (props) => {
  const { ...auth } = useAuthContext();
  const [confirm, setConfirm] = useState(false);

  const confirmModalHandler = () => {
    setConfirm(true);
  };

  const onCancel = () => {
    setConfirm(false);
  };

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
    <>
      {confirm && (
        <ConfirmModal
          title="Suppression"
          message="Voulez-vous vraiment supprimer votre message ?"
          onConfirm={deleteHandler}
          onCancel={onCancel}
        />
      )}
      <div className={classes.container}>
        <Button className={classes.btnCancel} onClick={confirmModalHandler}>
          X
        </Button>
      </div>
    </>
  );
};

export default DeletePost;
