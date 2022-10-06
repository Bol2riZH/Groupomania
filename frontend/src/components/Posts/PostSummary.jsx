import React from 'react';
import Post from './Post/Post';

const PostSummary = (props) => {
  return (
    <ul>
      {props.getSummary
        .sort((a, b) => b.date - a.date)
        .map((post) => (
          <Post key={post._id} {...props} />
        ))}
    </ul>
  );
};

export default PostSummary;
