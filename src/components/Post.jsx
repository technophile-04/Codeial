import moment from 'moment';
import React, { useState } from 'react';
import { Comment } from './';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { createComment } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';

const Post = ({ post }) => {
  const posts = usePosts();
  const [newComment, setNewComment] = useState('');
  const { addToast } = useToasts();

  const handleEnter = async (e, postId) => {
    if (e.key === 'Enter') {
      // console.log({ postId, newComment });
      const res = await createComment(postId, newComment);
      // console.log('Res', res);

      if (res.success) {
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

  return (
    <div className={styles.postWrapper}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
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
            <img
              src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
              alt="likes-icon"
            />
            <span>{post.likes.length}</span>
          </div>
          <div className={styles.postCommentsIcon}>
            <img
              src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
              alt="comments-icon"
            />
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