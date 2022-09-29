import React from 'react';

import classes from './Header.module.scss';

const HeaderTest = (props) => {
  return (
    <>
      <header className={classes.header}>{props.children}</header>
    </>
  );
};

export default HeaderTest;
