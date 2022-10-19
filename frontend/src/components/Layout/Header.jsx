import React, { useEffect, useState } from 'react';

import { axiosUser } from '../../data/axios';
import { useNavigate } from 'react-router-dom';

import classes from '../Layout/Header.module.scss';
import logo from '../../assets/logo/icon-monochrome-black.svg';
import { MdLogout } from 'react-icons/md';
import defaultProfilePicture from '../../assets/images/defaultProfilePicture.svg';

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

  const onProfileHandler = () => {
    setTimeout(() => {
      navigate('/profile');
    }, 150);
  };

  const logoutHandler = () => {
    localStorage.removeItem('auth');
    setAuthLog('');
  };

  return (
    <header className={classes.header}>
      <div className={classes.icons}>
        {/*<h1>Groupomania</h1>*/}
        <img src={logo} alt="logo" />
        <div className={classes.user}>
          <a className={classes.profilePicture} onClick={onProfileHandler}>
            {profilePicture ? (
              <img src={profilePicture} alt="profil" />
            ) : (
              <img src={defaultProfilePicture} alt="profil" />
            )}
          </a>
          <a onClick={logoutHandler}>
            <MdLogout />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
