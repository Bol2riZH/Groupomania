import React, { useState } from 'react';
import { useAuthContext } from '../../../store/useAuthContext';
import classes from './DeletePost.module.scss';

import { axiosPost } from '../../../utils/axios';

import Button from '../../UI/Button';
import ConfirmModal from '../../UI/ConfirmModal';
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
          message="Supprimer votre message ?"
          onConfirm={deleteHandler}
          onCancel={onCancel}
        />
      )}
      <FaTrash className={classes.delete} onClick={confirmModalHandler} />
    </>
  );
};

export default DeletePost;
