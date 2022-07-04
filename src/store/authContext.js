import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: '',
  token: '',
});

AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token-React'));

  const isUserLoggedIn = !!token;

  function login(userToken) {
    setToken(userToken);
    localStorage.setItem('token-React', userToken);
  }
  function logout() {
    setToken(null);
    localStorage.removeItem('token-React');
  }

  const ctx = {
    login,
    logout,
    isUserLoggedIn,
    token,
  };
  return <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;

// custom hook for context
export function useAuthCtx() {
  return useContext(AuthContext);
}
