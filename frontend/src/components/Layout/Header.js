import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from '../Layout/Header.module.scss';
import Button from '../UI/Button';
import { login } from '../../data/axios';

const Header = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));
  const [log, setLog] = useState(authLog?.token);

  const navigate = useNavigate();
  useEffect(() => {
    if (log === '')
      setTimeout(() => {
        navigate('/');
      }, 600);
  }, [log]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await login.get('http://localhost:4000/api/auth/');
      console.log(res.data);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <header className={classes.header}>
        <h1>Groupomania</h1>
        <div>
          <Button
            className={classes.btn}
            onClick={() => {
              localStorage.removeItem('auth');
              setLog('');
            }}
          >
            Déconnexion
          </Button>
        </div>
        {props.children}
      </header>
    </>
  );
};

export default Header;
