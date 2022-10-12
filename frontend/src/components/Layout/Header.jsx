import React, { useEffect, useState } from 'react';
import classes from '../Layout/Header.module.scss';
import logo from '../../assets/logo/icon-monochrome-black.svg';
import defaultProfilePicture from '../../assets/images/defaultProfilePicture.svg';

import { axiosUser } from '../../data/axios';

import { useNavigate } from 'react-router-dom';

import SearchBar from './SearchBar';

const Header = () => {
  const [authLog, setAuthLog] = useState(
    JSON.parse(localStorage.getItem('auth'))
  );

  const [profilePicture, setProfilePicture] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    authLog
      ? getProfil()
      : setTimeout(() => {
          navigate('/');
        }, 150);
  }, [authLog]);

  const getProfil = async () => {
    try {
      const res = await axiosUser.get(`${authLog?.id}`);
      setProfilePicture(res.data.user.profilePictureUrl);
    } catch (err) {
      console.error('Profil utilisateur introuvable ' + err);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('auth');
    setAuthLog('');
  };

  const onProfileHandler = () => {
    setTimeout(() => {
      navigate('/profile');
    }, 150);
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={logo} alt="logo" />
          <h1>Groupomania</h1>
        </div>
        {/*<SearchBar />*/}
        <div className={classes.user}>
          <button className={classes.profilePicture} onClick={onProfileHandler}>
            {profilePicture ? (
              <img src={profilePicture} alt="profil" />
            ) : (
              <img src={defaultProfilePicture} alt="profil" />
            )}
          </button>
          <button className={classes.btn} onClick={logoutHandler}>
            Se déconnecter
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
