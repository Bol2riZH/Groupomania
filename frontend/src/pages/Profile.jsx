import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosUser } from '../utils/axios';

import UserProfile from '../components/Users/UserProfile';
import UpdateUserProfile from '../components/Users/UpdateUserProfile';

import classes from './Profile.module.scss';
import Button from '../components/UI/Button';
import Error from '../components/UI/Error';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUnique, setIsUnique] = useState(true);
  const navigate = useNavigate();

  const goBackHandler = () => {
    setTimeout(() => {
      navigate('/home');
    }, 150);
  };

  const editHandler = () => {
    !isEditing ? setIsEditing(true) : setIsEditing(false);
    setIsUnique(true);
  };

  const onConfirmUpdateHandler = async (updateUserInfo) => {
    const authLog = JSON.parse(localStorage.getItem('auth'));
    try {
      const res = await axiosUser.put(`/update/${authLog.id}`, updateUserInfo, {
        headers: {
          Authorization: `Bearer ${authLog.token}`,
          'content-type': 'multipart/form-utils',
        },
      });
      console.log(res.data);
      setIsEditing(false);
      setIsUnique(true);

      setTimeout(() => {
        navigate('/profile');
      }, 150);
    } catch (err) {
      setIsUnique(false);
      console.error("Nom d'utilisateur : " + err);
    }
  };

  return (
    <div className={classes.profile}>
      <section className={classes.profileSection}>
        {!isEditing ? (
          <>
            <UserProfile />
            <div className={classes.btnPosition}>
              <Button className={classes.btnConfirmation} onClick={editHandler}>
                Modifier le profil
              </Button>
              <Button className={classes.btn} onClick={goBackHandler}>
                Retour
              </Button>
            </div>
          </>
        ) : (
          <>
            {!isUnique && (
              <Error className={classes.error}>
                Nom d'utilisateur déjà utilisé
              </Error>
            )}
            <UpdateUserProfile
              onUpdate={onConfirmUpdateHandler}
              onEditHandler={editHandler}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default Profile;
