import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import Card from '../../UI/Card';
import Button from '../../UI/Button';
import classes from './ListOfPosts.module.scss';

const ListOfPosts = () => {
  const effectRan = useRef(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (effectRan.current === false) {
        const res = await axios.get('http://localhost:4000/api/posts/');
        setPosts(res.data.posts);
        console.log(res.data.posts);
      }
      effectRan.current = true;
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <ul>
      {posts.map((post, index) => (
        <li key={index}>
          <Card className={classes.postCard}>
            <header className={classes.info}>
              <h2>{post.userInfo.username}</h2>
              <div className={classes.profilePicture}>
                {post.userInfo.profilePictureUrl ? (
                  <img
                    src={post.userInfo.profilePictureUrl}
                    alt="profile picture"
                  />
                ) : (
                  ''
                )}
              </div>
            </header>
            <div className={classes.post}>
              <h2>{post.title}</h2>
              <div className={post.imageUrl && classes.img}>
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt="profile picture" />
                ) : (
                  ''
                )}
              </div>
              <p>{post.post}</p>
            </div>
            <div className={classes.like}>
              <Button>Like</Button>
              <span>{post.usersLiked.length}</span>
              <Button>DisLike</Button>
              <span>{post.usersDisliked.length}</span>
            </div>
            <time>{post.date}</time>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default ListOfPosts;
