import React, { useState } from 'react';
import classes from './Post.module.scss';

import Card from '../../UI/Card';
import Button from '../../UI/Button';

import DeletePost from './DeletePost';
import LikePost from './LikePost';
import EditPost from './EditPost';
import AddComment from './AddComment';
import Comment from './Comment';

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

  return (
    <li>
      <Card className={classes.postCard}>
        <header>
          <h2>{props.userInfo.username}</h2>
          <div className={classes.profilePicture}>
            {props.userInfo.profilePictureUrl ? (
              <img src={props.userInfo.profilePictureUrl} alt="profile" />
            ) : (
              ''
            )}
          </div>
        </header>
        {!isEditing ? (
          <section className={classes.post}>
            <h2>{props.title}</h2>
            <p>{props.post}</p>
            <div className={props.imageUrl && classes.img}>
              {props.imageUrl ? <img src={props.imageUrl} alt="message" /> : ''}
            </div>
            <div>{props.comments && <Comment {...props} />}</div>

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
