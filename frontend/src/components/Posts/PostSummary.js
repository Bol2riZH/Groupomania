import React, { useEffect, useState } from 'react';
import Post from './Post/Post';
import { getPost } from '../../data/axios';

const PostSummary = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().catch(console.error);
  }, []);

  const getPosts = async () => {
    const res = await getPost.get();
    setPosts(res.data.posts);
    console.log(res.data.posts);
  };

  return (
    <ul>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </ul>
  );
};

export default PostSummary;
