import { LOCALSTORAGE_TOKEN_KEY, API_URLS } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
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
    config.body = JSON.stringify(body); //adding body to body to config if present
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
    }

    throw new Error(data.message);
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
