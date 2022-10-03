import React from 'react';

import StorageComponent from '../hooks/useStorage/StorageComponent';

const Home = () => {
  const user = localStorage.getItem('user');

  return (
    <div>
      <StorageComponent>hello</StorageComponent>
      <h1 style={{ color: '#eec5b0' }}>{user}</h1>
      <button
        onClick={() => {
          localStorage.removeItem('user');
        }}
      >
        log out
      </button>
    </div>
  );
};

export default Home;
