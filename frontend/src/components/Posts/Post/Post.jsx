import React, { useState } from 'react';

import classes from './Post.module.scss';

import Card from '../../UI/Card';
import Button from '../../UI/Button';

const Post = ({ post }) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));
  const [isEditing, setIsEditing] = useState(false);

  const isEditingHandler = () => {
    setIsEditing(true);
    console.log(isEditing);
  };

  return (
    <li>
      <Card className={classes.postCard}>
        <header>
          <h2>{post.userInfo.username}</h2>
          <div className={classes.profilePicture}>
            {post.userInfo.profilePictureUrl ? (
              <img src={post.userInfo.profilePictureUrl} alt="profile" />
            ) : (
              ''
            )}
          </div>
        </header>
        <section className={classes.post}>
          <h2>{post.title}</h2>
          <p>{post.post}</p>
          <div className={post.imageUrl && classes.img}>
            {post.imageUrl ? <img src={post.imageUrl} alt="message" /> : ''}
          </div>
        </section>
        <footer className={classes.like}>
          {authLog.id === post.userId ? (
            <>
              <Button onClick={isEditingHandler}>Modifier</Button>
              <Button className={classes.btnDelete} onClick={isEditingHandler}>
                Supprimer
              </Button>
            </>
          ) : (
            <>
              <Button className={classes.btnLike}>J'aime</Button>
              <Button>Commenter</Button>
            </>
          )}
          <time>{post.postedTime}</time>
        </footer>
      </Card>
    </li>
  );
};

export default Post;
