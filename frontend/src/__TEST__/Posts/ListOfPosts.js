import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './ListOfPosts.module.scss';

const ListOfPosts = () => {
  const [posts, setPosts] = useState([]);
  const [deletePost, setDeletePost] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(false);
  const [likePost, setLikePost] = useState(0);
  const [dislikePost, setDislikePost] = useState(0);

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

  const fetchDataToUpdate = async (postId, userId, data) => {
    const res = await axios.put(
      `http://localhost:4000/api/posts/${postId}`,
      ...data,
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
    const userId = JSON.parse(localStorage.getItem('auth'));
    if (userId) {
      const data = await fetchDataToDelete(post._id, userId).catch(
        console.error
      );
      // forbidden ? not refreshing utils //
      data !== undefined && setDeletePost(true);
    } else console.log('Forbidden');
  };

  // TODO : add title and image editing
  const updatePostHandler = async (post) => {
    const userId = JSON.parse(localStorage.getItem('auth'));
    if (userId.id === post.userId) {
      setIsEditing(true);
    } else console.log('Forbidden');
  };
  // TODO : editing by id
  const confirmUpdatePostHandler = async (post) => {
    const userId = JSON.parse(localStorage.getItem('auth'));
    if (userId) {
      const data = await fetchDataToUpdate(post._id, userId, editContent).catch(
        console.error
      );
      setIsEditing(false);

      // forbidden ? not refreshing utils //
      data !== undefined && setDeletePost(true);
    } else console.log('Forbidden');
  };

  const cancelUpdatePostHandler = (post) => {
    setEditContent(post.post);
    setIsEditing(false);
  };

  const addLikeHandler = async (post) => {
    console.log('likes' + post.likes);
    console.log('dislikes' + post.dislikes);
    const userId = JSON.parse(localStorage.getItem('auth'));
    const res = await axios.post(
      `http://localhost:4000/api/posts/${post._id}/notice`,
      {
        like: 1 && 0,
      },
      {
        headers: {
          Authorization: `Bearer ${userId.token}`,
          'content-type': 'application/json',
        },
      }
    );
    console.log(res.data);
    setLikePost(post.likes);
  };
  const addDislikeHandler = async (post) => {
    const userId = JSON.parse(localStorage.getItem('auth'));
    const res = await axios.post(
      `http://localhost:4000/api/posts/${post._id}/notice`,
      {
        like: -1 && 0,
      },
      {
        headers: {
          Authorization: `Bearer ${userId.token}`,
          'content-type': 'application/json',
        },
      }
    );
    console.log(res.data);
    setDislikePost(post.dislikes);
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
                  {!isEditing ? (
                    <Button onClick={() => updatePostHandler(post)}>
                      Update
                    </Button>
                  ) : (
                    <div>
                      <Button onClick={() => confirmUpdatePostHandler(post)}>
                        Confirm
                      </Button>
                      <Button onClick={() => cancelUpdatePostHandler(post)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                  <Button
                    className={classes.btnDelete}
                    onClick={() => deletePostHandler(post)}
                  >
                    Delete
                  </Button>
                </div>
              </header>
              <section className={classes.post}>
                <h2>{post.title}</h2>
                <div className={post.imageUrl && classes.img}>
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt="profile" />
                  ) : (
                    ''
                  )}
                </div>
                {isEditing ? (
                  <textarea
                    autoFocus
                    defaultValue={editContent ? editContent : post.post}
                    onChange={(e) => setEditContent(e.target.value)}
                  ></textarea>
                ) : (
                  <p>{editContent ? editContent : post.post}</p>
                )}
              </section>
              <div className={classes.like}>
                <Button
                  className={classes.btnLike}
                  onClick={() => addLikeHandler(post)}
                >
                  Like
                </Button>
                <span>{likePost}</span>
                <Button
                  className={classes.btnDislike}
                  onClick={() => addDislikeHandler(post)}
                >
                  DisLike
                </Button>
                <span>{dislikePost}</span>
              </div>
              <time>{post.postedTime}</time>
              <div>
                <Button>Comment</Button>
              </div>
            </Card>
          </li>
        ))}
    </ul>
  );
};

export default ListOfPosts;
