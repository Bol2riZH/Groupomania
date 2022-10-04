import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from '../Layout/Header.module.scss';
import Button from '../UI/Button';
import { login } from '../../data/axios';

const Header = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));
  const [log, setLog] = useState(authLog?.token);
  const [profilePicture, setProfilePicture] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    if (log === '')
      setTimeout(() => {
        navigate('/');
      }, 600);
  }, [log]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await login.get(`${authLog.id}`);
      console.log(res.data);
      setProfilePicture(res.data.user.profilePictureUrl);
      console.log(profilePicture);
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
          {profilePicture ? (
            <img src={profilePicture} alt="photo de profil" />
          ) : (
            <img src="./defaultProfile.svg" alt="photo de profil" />
          )}
        </div>
        {props.children}
      </header>
    </>
  );
};

export default Header;
