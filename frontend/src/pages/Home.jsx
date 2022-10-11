import React, { useEffect, useState } from 'react';
import classes from './Home.module.scss';

import { addPost, getPost } from '../data/axios';

import Header from '../components/Layout/Header';
import AddPost from '../components/Posts/Post/AddPost';
import Post from '../components/Posts/Post/Post';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostHandler().catch(console.error);
  }, []);

  const getPostHandler = async () => {
    const res = await getPost.get();
    setPosts(res.data.posts);

    console.log(res.data.posts);
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
