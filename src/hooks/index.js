import jwt from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { login as userLogin, register } from '../api';
import { AuthContext } from '../providers/AuthProvider';
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
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

    if (userToken) {
      const user = jwt(userToken);

      setUser(user);
    }

    setLoading(false);
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

  return {
    user,
    loading,
    login,
    logout,
    signUp,
  };
};
