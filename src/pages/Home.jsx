import moment from 'moment';
import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { Comment, CreatePost, Loader } from '../components';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';
import FriendList from '../components/FriendList';
import { useState } from 'react';
import { createComment } from '../api';
import { useToasts } from 'react-toast-notifications';

const Home = () => {
  const auth = useAuth();
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

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post, index) => (
          <div className={styles.postWrapper} key={`post-${index}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-pic"
                />
                <div>
                  <Link
                    to={`/user/${post.user._id}`}
                    className={styles.postAuthor}
                  >
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
        ))}
      </div>

      {auth.user && <FriendList />}
    </div>
  );
};

Home.propType = {
  posts: PropTypes.array.isRequired,
};

export default Home;
