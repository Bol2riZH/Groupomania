import React from 'react';

const Button = (props) => {
  return (
    <div className={props.className}>
      <button
        type={props.type || 'button'}
        className={props.className}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
