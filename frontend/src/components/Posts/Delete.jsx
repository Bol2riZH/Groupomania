import React, { useState } from 'react';
import { useAuthContext } from '../../store/useAuthContext';

import { axiosPost, axiosComment } from '../../utils/axios';

import classes from './Delete.module.scss';
import ConfirmModal from '../UI/ConfirmModal';
import { FaTrash } from 'react-icons/fa';

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
    let sendTo;
    if (props.post) sendTo = axiosPost;
    if (props.comment) sendTo = axiosComment;
    try {
      const res = await sendTo.delete(`${props._id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'content-type': 'application/json',
        },
      });
      props.onDelete();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {confirm && (
        <ConfirmModal
          title="Suppression"
          message={
            props.post
              ? 'Supprimer votre message ?'
              : 'Supprimer votre commentaire ?'
          }
          onConfirm={deleteHandler}
          onCancel={onCancel}
        />
      )}
      <FaTrash className={classes.delete} onClick={confirmModalHandler} />
    </>
  );
};

export default DeletePost;
