import React from 'react';

import classes from './Card.module.scss';

const CardTest = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default CardTest;
