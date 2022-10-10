import React, { useEffect, useState } from 'react';
import classes from './Post.module.scss';

import Card from '../../UI/Card';
import Button from '../../UI/Button';

import DeletePost from './DeletePost';
import LikePost from './LikePost';
import EditPost from './EditPost';
import AddComment from './AddComment';
import Comment from './Comment';
import PostUserProfile from './PostUserProfile';
import axios from 'axios';

const Post = (props) => {
  const authLog = JSON.parse(localStorage.getItem('auth'));
  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const editHandler = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  };

  const commentHandler = () => {
    isCommenting ? setIsCommenting(false) : setIsCommenting(true);
  };

  const getComment = async () => {
    const res = await axios.get(`http://localhost:4000/api/posts/comment`);
    console.log(res.data);
  };

  return (
    <li>
      <Card className={classes.postCard}>
        <PostUserProfile {...props} />
        {!isEditing ? (
          <section className={classes.post}>
            <h2>{props.title}</h2>
            <p>{props.post}</p>
            <div className={props.imageUrl && classes.img}>
              {props.imageUrl ? <img src={props.imageUrl} alt="message" /> : ''}
            </div>
            <ul>
              <Comment {...props} />
            </ul>

            {authLog.id === props.userId ? (
              <Button className={classes.btnEdit} onClick={editHandler}>
                Modifier
              </Button>
            ) : (
              ''
            )}
          </section>
        ) : (
          <EditPost
            {...props}
            onConfirmEditing={editHandler}
            onCancelEditing={editHandler}
          />
        )}
        <footer>
          <div className={classes.footerTop}>
            {authLog.id === props.userId ? (
              <DeletePost {...props} />
            ) : (
              <LikePost {...props} />
            )}
          </div>
          {isCommenting ? (
            <AddComment
              {...props}
              onComment={getComment}
              onConfirmComment={commentHandler}
              onCancelComment={commentHandler}
            />
          ) : (
            <Button className={classes.btnComment} onClick={commentHandler}>
              Commenter
            </Button>
          )}
          <time>{props.postedTime}</time>
        </footer>
      </Card>
    </li>
  );
};

export default Post;
