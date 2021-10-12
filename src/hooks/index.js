import jwt from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import {
  editUser,
  fetchFriends,
  getPosts,
  login as userLogin,
  register,
} from '../api';
import { AuthContext, PostContext } from '../providers';
import {
  getItemFromLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../utils';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwt(userToken);
        const res = await fetchFriends();

        let friends = [];
        if (res.success) {
          friends = res.data.friends;
        } else {
          friends = [];
        }

        setUser({
          ...user,
          friends,
        });
      }
      setLoading(false);
    })();
  }, []);

  const login = async (email, password) => {
    const res = await userLogin(email, password);

    if (res.success) {
      setUser(res.data.user);

      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        res.data.token ? res.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };

  const logout = () => {
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    setUser(null);
  };

  const updateUser = async (userId, name, password, confirmPassword) => {
    const res = await editUser(userId, name, password, confirmPassword);

    console.log('Response', res);

    if (res.success) {
      setUser(res.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        res.data.token ? res.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };

  const signUp = async (name, email, password, confirmPassword) => {
    const res = await register(name, email, password, confirmPassword);

    if (res.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
    } else {
      const newFriends = user.friends.filter(
        (f) => f.to_user._id !== friend.to_user._id
      );
      setUser({
        ...user,
        friends: newFriends,
      });
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    signUp,
    updateUser,
    updateUserFriends,
  };
};

export const usePosts = () => {
  return useContext(PostContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPosts();
      setLoading(false);

      if (response.success) {
        setPosts(response.data.posts);
      }
    };

    fetchPost();
  }, []);

  const addPostToState = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  const addCommentToState = (postId, comment) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        const newPost = {
          ...post,
          comments: [comment, ...post.comments],
        };

        return newPost;
      }

      return post;
    });

    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    addPostToState,
    addCommentToState,
  };
};
