import React from 'react';
import Post from './Post/Post';

const PostSummary = (props) => {
  return (
    <ul>
      {props.onAddPost
        .sort((a, b) => b.date - a.date)
        .map((post) => (
          <Post key={post._id} post={post} />
        ))}
    </ul>
  );
};

export default PostSummary;
