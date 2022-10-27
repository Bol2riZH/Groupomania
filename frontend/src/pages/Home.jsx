import React, { useEffect, useState } from 'react';
import classes from './Home.module.scss';

import { axiosPost } from '../utils/axios';

import Header from '../components/Layout/Header';
import AddPost from '../components/Posts/Post/AddPost';
import Post from '../components/Posts/Post/Post';
import Footer from '../components/Layout/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const authLog = JSON.parse(localStorage.getItem('auth'));

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    !authLog && navigate('/');
    getPostHandler();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    try {
      const res = await axiosPost.post('/', postData, {
        headers: {
          Authorization: `Bearer ${authLog.token}`,
          'content-type': 'multipart/form-utils',
        },
      });
      console.log(res.data);
      getPostHandler();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className={classes.posts}>
        {authLog?.role !== 'admin' && <AddPost onAddPost={addPostHandler} />}
        <ul>
          {posts
            .sort((a, b) => b.date - a.date)
            .map((post) => (
              <Post
                key={post._id}
                {...post}
                onLike={getPostHandler}
                onDelete={getPostHandler}
                onEditPost={getPostHandler}
              />
            ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Home;
