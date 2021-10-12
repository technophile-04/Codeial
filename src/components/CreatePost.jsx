import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { addPost } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';

const CreatePost = () => {
  const [post, setPost] = useState('Type the post here');
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);

    const res = await addPost(post);

    if (res.success) {
      setPost('');
      posts.addPostToState(res.data.post);
      addToast('Post successfully added', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      addPost(res.message, { appearance: 'error', autoDismiss: true });
    }

    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        onChange={(e) => setPost(e.target.value)}
        value={post}
      />
      <div>
        <button
          className={styles.addPostBtn}
          disabled={addingPost}
          onClick={handleAddPostClick}
        >
          {addingPost ? 'Adding Post' : 'Add Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
