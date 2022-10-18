import React from 'react';
import classes from './Error.module.scss';

const Error = (props) => {
  return (
    <div className={`${classes.error} ${classes.main} ${props.className}`}>
      <p>{props.children}</p>
    </div>
  );
};

export default Error;
