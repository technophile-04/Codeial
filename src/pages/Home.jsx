import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { CreatePost, Loader } from '../components';
import { useAuth, usePosts } from '../hooks';
import FriendList from '../components/FriendList';
import Post from '../components/Post';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post, index) => (
          <Post post={post} key={`post-${post._id}`} />
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
