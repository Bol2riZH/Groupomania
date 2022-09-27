import React from 'react';

const PassswordRevealer = ({ value }) => {
  const [shown, setShown] = React.useState(false);
  return (
    <>
      <input type={shown ? 'text' : 'password'} value={value} />
      <button type="button" onClick={() => setShown(!shown)}>
        Show/Hide
      </button>
    </>
  );
};

export default PassswordRevealer;
