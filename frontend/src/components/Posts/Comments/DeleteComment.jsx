import React, { useState } from 'react';
import classes from './DeleteComment.module.scss';

import { axiosComment } from '../../../data/axios';

import Button from '../../UI/Button';
import { useAuthContext } from '../../../store/useAuthContext';
import ConfirmModal from '../../UI/ConfirmModal';
import { FaTrash } from 'react-icons/fa';

const DeleteComment = (comment) => {
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
    <>
      {confirm && (
        <ConfirmModal
          title="Suppression"
          message="Supprimer votre commentaire ?"
          onConfirm={deleteHandler}
          onCancel={onCancel}
        />
      )}
      <FaTrash className={classes.delete} onClick={confirmModalHandler} />
    </>
  );
};

export default DeleteComment;
