import React, { createContext, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { client } from 'utils/api-client';

const AuthContext = createContext(null);

const fetchUserData = async () => {
  const user = await client.get('/auth/me').then(res => res.data.user);
  return user;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const authQuery = useQuery('userAuthQuery', fetchUserData, {
    onSuccess: data => {
      setUser(data);
    },
    onError: error => {},
    onSettled: (data, error) => {},
  });

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth should be inside auth provider wrapper');
  } else {
    return context;
  }
}
