import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Card from '../../UI/Card';
import Button from '../../UI/Button';
import classes from './ListOfPosts.module.scss';

const ListOfPosts = () => {
  const [posts, setPosts] = useState([]);
  const [deletePost, setDeletePost] = useState(false);

  useEffect(() => {
    fetchData().catch(console.error);
    deletePost === true && setDeletePost(false);
  }, [deletePost]);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:4000/api/posts/');
    setPosts(res.data.posts);
    console.log(res.data.posts);
  };

  const fetchDataToDelete = async (postId, userId) => {
    const res = await axios.delete(
      `http://localhost:4000/api/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${userId.token}`,
          'content-type': 'application/json',
        },
      }
    );
    return res.data;
  };

  const deletePostHandler = async (post) => {
    const userId = JSON.parse(localStorage.getItem('user'));
    if (userId) {
      const data = await fetchDataToDelete(post._id, userId).catch(
        console.error
      );
      // forbidden ? not refreshing data //
      data !== undefined && setDeletePost(true);
    } else console.log('Forbidden');
  };

  return (
    <ul>
      {posts
        // .filter((post) => post.userInfo.username.includes('Bol2riZH'))
        .sort((a, b) => b.date - a.date)
        .map((post) => (
          <li key={post._id}>
            <Card className={classes.postCard}>
              <header>
                <div>
                  <h2>{post.userInfo.username}</h2>
                  <div className={classes.profilePicture}>
                    {post.userInfo.profilePictureUrl ? (
                      <img
                        src={post.userInfo.profilePictureUrl}
                        alt="profile"
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div>
                  <Button>Update</Button>
                  <Button
                    className={classes.btnDelete}
                    onClick={() => {
                      deletePostHandler(post);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </header>
              <div className={classes.post}>
                <h2>{post.title}</h2>
                <div className={post.imageUrl && classes.img}>
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt="profile" />
                  ) : (
                    ''
                  )}
                </div>
                <p>{post.post}</p>
              </div>
              <div className={classes.like}>
                <Button className={classes.btnLike}>Like</Button>
                <span>{post.usersLiked.length}</span>
                <Button className={classes.btnDislike}>DisLike</Button>
                <span>{post.usersDisliked.length}</span>
              </div>
              <time>{post.postedTime}</time>
            </Card>
          </li>
        ))}
    </ul>
  );
};

export default ListOfPosts;
