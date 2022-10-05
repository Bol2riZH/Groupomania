import React from 'react';

import classes from './Home.module.scss';

import Header from '../components/Layout/Header';
import PostSummary from '../components/Posts/PostSummary';
import AddPost from '../components/Posts/Post/AddPost';

const Home = () => {
  const addPostHandler = () => {};

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
