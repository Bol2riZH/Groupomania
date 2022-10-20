import React from 'react';

const Error = (props) => {
  return (
    <div className={props.className}>
      <p>{props.children}</p>
    </div>
  );
};

export default Error;
