import React from 'react';

const PasswordRevealer = (value) => {
  const [shown, setShown] = React.useState(false);
  return (
    <>
      <input
        type={shown ? 'text' : 'password'}
        value={value}
        onChange={value.onChange}
      />
      <button type="button" onClick={() => setShown(!shown)}>
        Show/Hide
      </button>
    </>
  );
};

export default PasswordRevealer;
