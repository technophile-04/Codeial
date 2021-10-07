import { useContext, useState } from 'react';
import { login as userLogin } from '../api';
import { AuthContext } from '../providers/AuthProvider';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await userLogin(email, password);

    if (res.success) {
      setUser(res.data.user);
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
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
  };
};
