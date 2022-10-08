import React from 'react';

import classes from './Comment.module.scss';

const Comment = (props) => {
  return props.comments.map((comment, index) => (
    <div key={index} className={classes.commentCard}>
      <h2>{comment.userId}</h2>
      {/*<div className={classes.img}>*/}
      {/*  <img src={comment.profilePictureUrl} alt="profil" />*/}
      {/*</div>*/}
      <p>{comment.comment}</p>
    </div>
  ));
};
// const Comment = (props) => {
//     return props.comments.map((comment, index) => (
//         <div key={index} className={classes.commentCard}>
//             <h2>{comment.username}</h2>
//             <div className={classes.img}>
//                 <img src={comment.profilePictureUrl} alt="profil" />
//             </div>
//             <p>{comment.comment}</p>
//         </div>
//     ));
// };

export default Comment;
