import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CardTest from '../UI/Card.test';
import ButtonTest from '../UI/Button.test';
import classes from './ListOfPosts.module.scss';

const ListOfPostsTest = () => {
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
    const userId = JSON.parse(localStorage.getItem('user'));
    if (userId) {
      const data = await fetchDataToDelete(post._id, userId).catch(
        console.error
      );
      // forbidden ? not refreshing data //
      data !== undefined && setDeletePost(true);
    } else console.log('Forbidden');
  };

  // TODO : add title and image editing
  const updatePostHandler = async (post) => {
    const userId = JSON.parse(localStorage.getItem('user'));
    if (userId.id === post.userId) {
      setIsEditing(true);
    } else console.log('Forbidden');
  };
  // TODO : editing by id
  const confirmUpdatePostHandler = async (post) => {
    const userId = JSON.parse(localStorage.getItem('user'));
    if (userId) {
      const data = await fetchDataToUpdate(post._id, userId, editContent).catch(
        console.error
      );
      setIsEditing(false);

      // forbidden ? not refreshing data //
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
    const userId = JSON.parse(localStorage.getItem('user'));
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
    const userId = JSON.parse(localStorage.getItem('user'));
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
            <CardTest className={classes.postCard}>
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
                    <ButtonTest onClick={() => updatePostHandler(post)}>
                      Update
                    </ButtonTest>
                  ) : (
                    <div>
                      <ButtonTest
                        onClick={() => confirmUpdatePostHandler(post)}
                      >
                        Confirm
                      </ButtonTest>
                      <ButtonTest onClick={() => cancelUpdatePostHandler(post)}>
                        Cancel
                      </ButtonTest>
                    </div>
                  )}
                  <ButtonTest
                    className={classes.btnDelete}
                    onClick={() => deletePostHandler(post)}
                  >
                    Delete
                  </ButtonTest>
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
                <ButtonTest
                  className={classes.btnLike}
                  onClick={() => addLikeHandler(post)}
                >
                  Like
                </ButtonTest>
                <span>{likePost}</span>
                <ButtonTest
                  className={classes.btnDislike}
                  onClick={() => addDislikeHandler(post)}
                >
                  DisLike
                </ButtonTest>
                <span>{dislikePost}</span>
              </div>
              <time>{post.postedTime}</time>
              <div>
                <ButtonTest>Comment</ButtonTest>
              </div>
            </CardTest>
          </li>
        ))}
    </ul>
  );
};

export default ListOfPostsTest;
