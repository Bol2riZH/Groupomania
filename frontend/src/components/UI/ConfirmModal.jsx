import React, { Fragment } from 'react';
import classes from './ConfirmModal.module.scss';

import { createPortal } from 'react-dom';

import Card from './Card';
import { ImCross } from 'react-icons/im';
import { BsCheckLg } from 'react-icons/bs';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCancel} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <div className={classes.btn}>
        <BsCheckLg onClick={props.onConfirm} className={classes.confirmation} />
        <ImCross onClick={props.onCancel} className={classes.cross} />
      </div>
    </Card>
  );
};

const ConfirmModal = (props) => {
  return (
    <Fragment>
      {createPortal(
        <Backdrop onCancel={props.onCancel} />,
        document.getElementById('backdrop-root')
      )}
      {createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
        />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default ConfirmModal;
