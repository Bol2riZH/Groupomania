import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosUser } from '../data/axios';

import UserProfile from '../components/Users/UserProfile';
import UpdateUserProfile from '../components/Users/UpdateUserProfile';

import Card from '../components/UI/Card';
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

  const onEditHandler = () => {
    !isEditing ? setIsEditing(true) : setIsEditing(false);
  };

  const onConfirmUpdateHandler = async (updateUserInfo) => {
    const authLog = JSON.parse(localStorage.getItem('auth'));
    try {
      const res = await axiosUser.put(`/update/${authLog.id}`, updateUserInfo, {
        headers: {
          Authorization: `Bearer ${authLog.token}`,
          'content-type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      setIsEditing(false);
      setIsUnique(true);

      setTimeout(() => {
        navigate('/home');
      }, 150);
    } catch (err) {
      setIsUnique(false);
      console.error("Nom d'utilisateur : " + err);
    }
  };

  return (
    <Card>
      <section>
        {!isEditing ? (
          <>
            <UserProfile />
            <Button onClick={onEditHandler}>Modifier le profil</Button>
            <Button onClick={goBackHandler}>Retour</Button>
          </>
        ) : (
          <>
            <UpdateUserProfile onUpdate={onConfirmUpdateHandler} />
            {!isUnique && <Error>Nom d'utilisateur déjà utilisé</Error>}
            <Button onClick={onEditHandler}>Annuler</Button>
          </>
        )}
      </section>
    </Card>
  );
};

export default Profile;
