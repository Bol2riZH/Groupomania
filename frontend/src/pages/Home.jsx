import React, { useState } from 'react';

import classes from './Home.module.scss';

import Header from '../components/Layout/Header';
import PostSummary from '../components/Posts/PostSummary';
import AddPost from '../components/Posts/Post/AddPost';
import { addPost } from '../data/axios';

const Home = () => {
  const addPostHandler = async (postData, authLog) => {
    const res = await addPost.post('/', postData, {
      headers: {
        Authorization: `Bearer ${authLog.token}`,
        'content-type': 'multipart/form-data',
      },
    });
    console.log(res.data);
  };

  return (
    <>
      <Header />
      <div className={classes.posts}>
        <AddPost onAddPost={addPostHandler} />
        <PostSummary />
      </div>
    </>
  );
};

export default Home;
