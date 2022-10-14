import React, { Fragment } from 'react';
import classes from './ConfirmModal.module.scss';

import { createPortal } from 'react-dom';

import Card from './Card';
import Button from './Button';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCancel} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <Button onClick={props.onConfirm}>Confirmer</Button>
      <Button onClick={props.onCancel}>Annuler</Button>
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
