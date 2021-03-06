import moment from 'moment';
import React, { useState } from 'react';
import { Comment } from './';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { createComment, toggleLike } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Message, ThumbDownAlt, ThumbUpSharp } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const Post = ({ post }) => {
  const posts = usePosts();
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);
  const { addToast } = useToasts();

  const handleEnter = async (e, postId) => {
    if (e.key === 'Enter') {
      // console.log({ postId, newComment });
      const res = await createComment(postId, newComment);
      // console.log('Res', res);

      if (res.success) {
        setNewComment('');
        addToast('Your comment was published!', {
          appearance: 'success',
          autoDismiss: true,
        });
        posts.addCommentToState(postId, res.data.comment);
      } else {
        addToast(res.message, { appearance: 'error', autoDismiss: true });
      }
    }
  };

  const handlePostLikeClick = async () => {
    const res = await toggleLike(post._id, 'Post');

    if (res.success) {
      if (res.data.deleted) {
        setLiked(false);
        setLikes((prevLikes) => prevLikes - 1);
        addToast('Like removed successfully!', {
          appearance: 'success',
          autoDismiss: true,
        });
      } else {
        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
        addToast('Like added successfully!', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    } else {
      addToast(res.message, { appearance: 'error', autoDismiss: true });
    }
  };

  return (
    <div className={styles.postWrapper}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/709/709722.png"
            alt="user-pic"
          />
          <div>
            <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>
              {post.user.name}
            </Link>
            <span className={styles.postTime}>
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>
        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <IconButton onClick={handlePostLikeClick}>
              {liked ? <ThumbDownAlt /> : <ThumbUpSharp />}
            </IconButton>
            <span>{likes}</span>
          </div>
          <div className={styles.postCommentsIcon}>
            <IconButton>
              {' '}
              <Message />{' '}
            </IconButton>
            <span>2</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => handleEnter(e, post._id)}
          />
        </div>
        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
