import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../data/axios';

import UserProfile from '../components/Users/UserProfile';
import UpdateUserProfile from '../components/Users/UpdateUserProfile';

import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const goBackHandler = () => {
    setTimeout(() => {
      navigate('/home');
    }, 600);
  };

  const onEditHandler = () => {
    !isEditing ? setIsEditing(true) : setIsEditing(false);
  };

  const onConfirmUpdateHandler = async (updateUserInfo) => {
    const authLog = JSON.parse(localStorage.getItem('auth'));

    const res = await signup.put(`/update/${authLog.id}`, updateUserInfo, {
      headers: {
        Authorization: `Bearer ${authLog.token}`,
        'content-type': 'multipart/form-data',
      },
    });
    console.log(res.data);
    setIsEditing(false);
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
            <Button onClick={onEditHandler}>Annuler</Button>
          </>
        )}
      </section>
    </Card>
  );
};

export default Profile;
