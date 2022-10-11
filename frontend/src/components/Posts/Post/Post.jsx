import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import classes from './Post.module.scss';

import { axiosComment } from '../../../data/axios';

import Card from '../../UI/Card';
import Button from '../../UI/Button';

import DeletePost from './DeletePost';
import LikePost from './LikePost';
import EditPost from './EditPost';
import PostUserProfile from './PostUserProfile';

import CommentUserProfile from '../Comments/CommentUserProfile';
import AddComment from '../Comments/AddComment';
import DeleteComment from '../Comments/DeleteComment';

const Post = (props) => {
  const { ...auth } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const [comments, setComments] = useState('');

  useEffect(() => {
    getCommentHandler().catch(console.error);
  }, []);

  const getCommentHandler = async () => {
    const res = await axiosComment.get();
    setComments(res.data.postComment);
  };

  const commentHandler = () => {
    isCommenting ? setIsCommenting(false) : setIsCommenting(true);
  };

  const editHandler = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
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
              {comments &&
                comments
                  .filter((comment) => comment.postId === props._id)
                  .map((comment) => (
                    <li key={comment._id} className={classes.commentCard}>
                      <CommentUserProfile {...comment} />
                      <div className={classes.comment}>
                        <p>{comment.comment}</p>
                        <time>{comment.postedTime}</time>
                      </div>
                      {/*{authLog.id === comment.userId ? (*/}
                      {auth.id === comment.userId || auth.role === 'admin' ? (
                        <DeleteComment
                          {...comment}
                          onDeleteComment={getCommentHandler}
                        />
                      ) : (
                        ''
                      )}
                    </li>
                  ))}
            </ul>

            {auth.id === props.userId || auth.role === 'admin' ? (
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
            {auth.id === props.userId || auth.role === 'admin' ? (
              <DeletePost {...props} />
            ) : (
              <LikePost {...props} />
            )}
          </div>
          {isCommenting ? (
            <AddComment
              {...props}
              onComment={getCommentHandler}
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
