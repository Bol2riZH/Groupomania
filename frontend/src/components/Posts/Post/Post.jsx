import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import classes from './Post.module.scss';

import { axiosComment } from '../../../data/axios';

import Card from '../../UI/Card';
import Button from '../../UI/Button';

import PostUserProfile from './PostUserProfile';
import EditPost from './EditPost';
import LikePost from './LikePost';
import DeletePost from './DeletePost';

import CommentUserProfile from '../Comments/CommentUserProfile';
import AddComment from '../Comments/AddComment';
import LikeComment from '../Comments/LikeComment';
import DeleteComment from '../Comments/DeleteComment';
import ConfirmModal from '../../UI/ConfirmModal';

const Post = (props) => {
  const { ...auth } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const [comments, setComments] = useState('');

  useEffect(() => {
    getCommentHandler().catch(console.error);
  }, []);

  const getCommentHandler = async () => {
    try {
      const res = await axiosComment.get(props._id);
      setComments(res.data.postComment);
    } catch (err) {
      console.error(err);
    }
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
                comments.map((comment) => (
                  <li key={comment._id} className={classes.commentCard}>
                    <CommentUserProfile {...comment} />
                    <div className={classes.comment}>
                      <p>{comment.comment}</p>
                      <time>{comment.postedTime}</time>
                    </div>
                    {auth.id === comment.userId || auth.role === 'admin' ? (
                      <DeleteComment
                        {...comment}
                        onDeleteComment={getCommentHandler}
                      />
                    ) : (
                      <LikeComment
                        onLikeComment={getCommentHandler}
                        {...comment}
                      />
                    )}
                  </li>
                ))}
            </ul>

            {auth.id === props.userId || auth.role === 'admin' ? (
              <Button className={classes.btnConfirmation} onClick={editHandler}>
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
          {isCommenting ? (
            <AddComment
              {...props}
              onComment={getCommentHandler}
              onConfirmComment={commentHandler}
              onCancelComment={commentHandler}
            />
          ) : (
            <Button className={classes.btn} onClick={commentHandler}>
              Commenter
            </Button>
          )}
          <div className={classes.footerTop}>
            {auth.id === props.userId || auth.role === 'admin' ? (
              <DeletePost {...props} />
            ) : (
              <LikePost {...props} />
            )}
          </div>
          <time>{props.postedTime}</time>
        </footer>
      </Card>
    </li>
  );
};

export default Post;
