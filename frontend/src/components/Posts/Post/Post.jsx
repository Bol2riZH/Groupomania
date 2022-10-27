import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../store/useAuthContext';

import { axiosComment } from '../../../utils/axios';

import UserProfile from '../../Users/UserProfile';
import Likes from '../Likes';
import Delete from '../Delete';

import EditPost from './EditPost';
import AddComment from '../Comment/AddComment';

import classes from './Post.module.scss';
import { RiEdit2Fill, RiArrowGoBackFill } from 'react-icons/ri';
import { FaRegCommentAlt } from 'react-icons/fa';

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
      {/*////////////////////////////////////// POST HEADER //////////////////////////////////////*/}
      <header>
        <UserProfile {...props} />
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
            <Delete {...props} />
          </div>
        )}
      </header>
      {/*////////////////////////////////////// POST //////////////////////////////////////*/}
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
          <FaRegCommentAlt className={classes.icon} onClick={commentHandler} />
          <Likes {...props} />
        </div>
      )}
      {/*////////////////////////////////////// COMMENTS //////////////////////////////////////*/}
      <section>
        <ul>
          {comments &&
            comments
              .sort((a, b) => b.date - a.date)
              .map((comment) => (
                <li key={comment._id} className={classes.commentCard}>
                  <UserProfile {...comment} />
                  <div className={classes.comment}>
                    <p>{comment.comment}</p>
                    <time>{comment.postedTime}</time>
                  </div>
                  <div className={classes.commentIcons}>
                    <Likes {...comment} onLike={getCommentHandler} />
                    {(auth.id === comment.userId || auth.role === 'admin') && (
                      <Delete {...comment} onDelete={getCommentHandler} />
                    )}
                  </div>
                </li>
              ))}
        </ul>
      </section>
      {/*////////////////////////////////////// FOOTER //////////////////////////////////////*/}
      <footer>
        <time>{props.postedTime}</time>
      </footer>
    </li>
  );
};

export default Post;
