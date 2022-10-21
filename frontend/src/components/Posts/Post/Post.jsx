import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import classes from './Post.module.scss';

import { axiosComment } from '../../../data/axios';

import Card from '../../UI/Card';
import Button from '../../UI/Button';
import { RiEdit2Fill } from 'react-icons/ri';

import PostUserProfile from './PostUserProfile';
import EditPost from './EditPost';
import LikePost from './LikePost';
import DeletePost from './DeletePost';

import CommentUserProfile from '../Comments/CommentUserProfile';
import AddComment from '../Comments/AddComment';
import LikeComment from '../Comments/LikeComment';
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
    <li className={classes.postCard}>
      <header>
        <PostUserProfile {...props} />
        {(auth.id === props.userId || auth.role === 'admin') && (
          <DeletePost {...props} />
        )}
      </header>
      <Card>
        {!isEditing ? (
          <div className={classes.post}>
            <section>
              <header>
                <h2>{props.title}</h2>
                {auth.id === props.userId || auth.role === 'admin' ? (
                  <RiEdit2Fill className={classes.edit} onClick={editHandler} />
                ) : (
                  ''
                )}
              </header>
              <p>{props.post}</p>
              <div className={props.imageUrl && classes.img}>
                {props.imageUrl ? (
                  <img src={props.imageUrl} alt="message" />
                ) : (
                  ''
                )}
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
            </section>
          </div>
        ) : (
          <EditPost
            {...props}
            onConfirmEditing={editHandler}
            onCancelEditing={editHandler}
          />
        )}
        <footer>
          {isEditing ? (
            ''
          ) : isCommenting ? (
            <AddComment
              {...props}
              onComment={getCommentHandler}
              onConfirmComment={commentHandler}
              onCancelComment={commentHandler}
            />
          ) : (
            <>
              <Button className={classes.btn} onClick={commentHandler}>
                Commenter
              </Button>

              <div className={classes.footerBottom}>
                {auth.id !== props.userId && auth.role !== 'admin' && (
                  <LikePost {...props} />
                )}
              </div>
            </>
          )}
          <time>{props.postedTime}</time>
        </footer>
      </Card>
    </li>
  );
};

export default Post;
