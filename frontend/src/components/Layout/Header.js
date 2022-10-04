import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from '../Layout/Header.module.scss';
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
    getProfil().catch(console.error);
  }, []);

  const getProfil = async () => {
    const res = await login.get(`${authLog?.id}`);
    setProfilePicture(res.data.user.profilePictureUrl);
  };

  const logoutHandler = () => {
    localStorage.removeItem('auth');
    setLog('');
  };

  const onProfileHandler = () => {
    setTimeout(() => {
      navigate('/profile');
    }, 600);
  };

  return (
    <>
      <header className={classes.header}>
        <h1>Groupomania</h1>
        <div>
          <button className={classes.profilePicture} onClick={onProfileHandler}>
            {profilePicture ? (
              <img src={profilePicture} alt="photo de profil" />
            ) : (
              <img src="./defaultProfile.svg" alt="photo de profil" />
            )}
          </button>

          <button className={classes.btn} onClick={logoutHandler}>
            Déconnexion
          </button>
        </div>
        {props.children}
      </header>
    </>
  );
};

export default Header;
