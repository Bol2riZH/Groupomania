import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../store/useAuthContext';

import { axiosComment } from '../../../utils/axios';

import classes from './Post.module.scss';
import Card from '../../UI/Card';
import { RiEdit2Fill, RiArrowGoBackFill } from 'react-icons/ri';
import { FaRegCommentAlt } from 'react-icons/fa';

import Likes from '../Likes';

import PostUserProfile from './PostUserProfile';
import EditPost from './EditPost';
import DeletePost from './DeletePost';

import CommentUserProfile from '../Comments/CommentUserProfile';
import AddComment from '../Comments/AddComment';
import DeleteComment from '../Comments/DeleteComment';

const Post = (props) => {
  const { ...auth } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const [comments, setComments] = useState('');

  useEffect(() => {
    getCommentHandler();
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
          <div>
            {!isEditing ? (
              <RiEdit2Fill className={classes.edit} onClick={editHandler} />
            ) : (
              <RiArrowGoBackFill
                className={classes.edit}
                onClick={editHandler}
              />
            )}
            <DeletePost {...props} />
          </div>
        )}
      </header>
      <Card>
        {!isEditing ? (
          <section>
            <header>
              <h2>{props.title}</h2>
            </header>
            <p>{props.post}</p>
            <div className={props.imageUrl && classes.img}>
              {props.imageUrl ? <img src={props.imageUrl} alt="message" /> : ''}
            </div>
          </section>
        ) : (
          <EditPost
            {...props}
            onConfirmEditing={editHandler}
            onCancelEditing={editHandler}
          />
        )}
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
          <div className={classes.icons}>
            <FaRegCommentAlt
              className={classes.icon}
              onClick={commentHandler}
            />
            <Likes {...props} />
          </div>
        )}
        <section>
          <ul>
            {comments &&
              comments
                .sort((a, b) => b.date - a.date)
                .map((comment) => (
                  <li key={comment._id} className={classes.commentCard}>
                    <CommentUserProfile {...comment} />
                    <div className={classes.comment}>
                      <p>{comment.comment}</p>
                      <time>{comment.postedTime}</time>
                    </div>
                    <div className={classes.commentIcons}>
                      <Likes {...comment} onLike={getCommentHandler} />
                      {(auth.id === comment.userId ||
                        auth.role === 'admin') && (
                        <DeleteComment
                          {...comment}
                          onDeleteComment={getCommentHandler}
                        />
                      )}
                    </div>
                  </li>
                ))}
          </ul>
        </section>
        <footer>
          <time>{props.postedTime}</time>
        </footer>
      </Card>
    </li>
  );
};

export default Post;
