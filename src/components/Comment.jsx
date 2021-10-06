import React from 'react';
import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import moment from 'moment';

const Comment = ({ comment }) => {
  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>
          {moment(comment.createdAt).fromNow()}
        </span>
        <span className={styles.postCommentLikes}>{comment.likes.length}</span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

Comment.propType = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
