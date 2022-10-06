import React, { useState } from 'react';

import classes from './Post.module.scss';

import Card from '../../UI/Card';
import Button from '../../UI/Button';
import axios from 'axios';

const Post = ({ post }) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));
  const [isEditing, setIsEditing] = useState(false);
  const [likePost, setLikePost] = useState(+post.likes);

  const isEditingHandler = () => {
    setIsEditing(true);
    console.log(isEditing);
  };

  const likeHandler = async () => {
    const user = post.usersLiked.find((userId) => userId === authLog.id);
    if (user === undefined) console.log('yes');
    console.log(user);
    const res = await axios.post(
      `http://localhost:4000/api/posts/${post._id}/notice`,
      {
        like: post.usersLiked.find((userId) => userId === authLog.id) ? 0 : 1,
      },
      {
        headers: {
          Authorization: `Bearer ${authLog.token}`,
          'content-type': 'application/json',
        },
      }
    );
    console.log(res.data);
    console.log('likes: ' + post.likes);
    setLikePost(+post.likes);
    console.log('likes: ' + post.likes);
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
        <footer>
          {authLog.id === post.userId ? (
            <>
              <Button onClick={isEditingHandler}>Modifier</Button>
              <Button className={classes.btnDelete} onClick={isEditingHandler}>
                Supprimer
              </Button>
            </>
          ) : (
            <>
              <Button className={classes.btnLike} onClick={likeHandler}>
                J'aime
              </Button>
              <span>{+post.likes}</span>
              <span>{+likePost}</span>
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
