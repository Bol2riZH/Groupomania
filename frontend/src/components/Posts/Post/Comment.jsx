import React, { useState, useEffect } from 'react';
import classes from './Comment.module.scss';

import axios from 'axios';

import CommentUserProfile from './CommentUserProfile';

const Comment = (props) => {
  const [user, setUser] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    getComment().catch(console.error);
  }, []);

  const getComment = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/posts/${props._id}/comment`
    );
    setComments(res.data.postComment);
  };

  return (
    <div>
      {comments &&
        comments
          .filter((comment) => comment.postId === props._id)
          .map((comment) => (
            <li key={comment._id}>
              <CommentUserProfile {...comment} />
              <p>{comment.comment}</p>
              <time>{comment.postedTime}</time>
            </li>
          ))}
    </div>
  );
};
export default Comment;
