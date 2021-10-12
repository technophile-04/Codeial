import { createContext } from 'react';
import { useProvidePosts } from '../hooks';

const initialState = {
  data: [],
  loading: true,
  addPostToState: () => {},
  addCommentToState: () => {},
};

export const PostContext = createContext(initialState);

export const PostProvider = ({ children }) => {
  const posts = useProvidePosts();

  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};
