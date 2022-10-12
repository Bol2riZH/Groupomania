import React, { useContext, useEffect, useState } from 'react';
import classes from './Home.module.scss';

import { axiosPost } from '../data/axios';

import Header from '../components/Layout/Header';
import AddPost from '../components/Posts/Post/AddPost';
import Post from '../components/Posts/Post/Post';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const authLog = JSON.parse(localStorage.getItem('auth'));

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    !authLog && navigate('/');
    getPostHandler().catch(console.error);
  }, []);

  const getPostHandler = async () => {
    try {
      const res = await axiosPost.get();
      setPosts(res.data.posts);

      console.log(res.data.posts);
    } catch (err) {
      console.error(err);
    }
  };

  const addPostHandler = async (postData, authLog) => {
    const res = await axiosPost.post('/', postData, {
      headers: {
        Authorization: `Bearer ${authLog.token}`,
        'content-type': 'multipart/form-data',
      },
    });
    console.log(res.data);
    getPostHandler().catch(console.error);
  };

  return (
    <>
      <Header />
      <div className={classes.posts}>
        <AddPost onAddPost={addPostHandler} />
        <ul>
          {posts
            .sort((a, b) => b.date - a.date)
            .map((post) => (
              <Post
                key={post._id}
                {...post}
                onLikePost={getPostHandler}
                onDeletePost={getPostHandler}
                onEditPost={getPostHandler}
              />
            ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
