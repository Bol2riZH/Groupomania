import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const userLog = JSON.parse(localStorage.getItem('user'));
  const [log, setLog] = useState(userLog?.token);

  const navigate = useNavigate();
  useEffect(() => {
    if (log === '')
      setTimeout(() => {
        navigate('/');
      }, 600);
  }, [log]);

  return (
    <div>
      <h1 style={{ color: '#eec5b0' }}>HOME</h1>
      <button
        onClick={() => {
          localStorage.removeItem('user');
          setLog('');
        }}
      >
        log out
      </button>
    </div>
  );
};

export default Home;
