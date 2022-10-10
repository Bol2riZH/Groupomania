import React from 'react';
import classes from './Comment.module.scss';

import CommentUserProfile from './CommentUserProfile';

const Comment = (props) => {
  return props.comments.map((comment, index) => (
    <div key={index} className={classes.commentCard}>
      <CommentUserProfile {...props} />
      <p>{comment.comment}</p>
    </div>
  ));
};
export default Comment;
