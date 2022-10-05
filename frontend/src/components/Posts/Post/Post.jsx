import React, { useState } from 'react';

import classes from './Post.module.scss';

import Card from '../../UI/Card';
import Button from '../../UI/Button';

const Post = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);

  const authorize = () => {
    return JSON.parse(localStorage.getItem('auth')) === post.id;
  };

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
          {authorize() && <Button onClick={isEditingHandler}>Modifier</Button>}
        </header>
        <section className={classes.post}>
          <h2>{post.title}</h2>
          <p>{post.post}</p>
          <div className={post.imageUrl && classes.img}>
            {post.imageUrl ? <img src={post.imageUrl} alt="message" /> : ''}
          </div>
        </section>
        <footer className={classes.like}>
          <Button className={classes.btnLike}>like</Button>
          <span>{post.postedTime}</span>
        </footer>
      </Card>
    </li>
  );
};

export default Post;
