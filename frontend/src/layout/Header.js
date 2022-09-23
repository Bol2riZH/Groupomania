import React from 'react';

import classes from './_Header.module.scss';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>{props.children}</header>
    </>
  );
};

export default Header;
