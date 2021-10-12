import { LOCALSTORAGE_TOKEN_KEY, API_URLS, getFormBody } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body); //adding body to body to config if present
  }

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    console.log(data);
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    } else {
      return {
        message: data.message,
        success: false,
      };
    }
  } catch (error) {
    return {
      error: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 15) => {
  return customFetch(API_URLS.posts(page, limit), { method: 'GET' });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const register = (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirm_password: confirmPassword },
  });
};
export const editUser = (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: { id: userId, name, password, confirm_password: confirmPassword },
  });
};

export const fetchUserProfile = (userId) => {
  return customFetch(API_URLS.userInfo(userId), { method: 'GET' });
};

export const fetchFriends = () => {
  return customFetch(API_URLS.friends(), { method: 'GET' });
};

export const addFriends = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), { method: 'POST' });
};
export const removeFriends = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), { method: 'POST' });
};

export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: 'POST',
    body: {
      content,
    },
  });
};

export const createComment = (post_id, content) => {
  return customFetch(API_URLS.comment(), {
    method: 'POST',
    body: {
      post_id,
      content,
    },
  });
};
