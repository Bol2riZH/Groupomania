import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {
  return (
    <div className={`${classes.offset} ${classes.confirmation}`}>
      <button
        type={props.type || 'button'}
        className={`${classes.button} ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
