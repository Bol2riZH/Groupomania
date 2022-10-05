import React, { useEffect, useState } from 'react';

import classes from './Home.module.scss';

import Header from '../components/Layout/Header';
import PostSummary from '../components/Posts/PostSummary';
import AddPost from '../components/Posts/Post/AddPost';
import { addPost, getPost } from '../data/axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostHandler().catch(console.error);
  }, []);

  const getPostHandler = async () => {
    const res = await getPost.get();
    setPosts(res.data.posts);
  };

  const addPostHandler = async (postData, authLog) => {
    const res = await addPost.post('/', postData, {
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
        <PostSummary onAddPost={posts} />
      </div>
    </>
  );
};

export default Home;
