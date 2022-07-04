import { createContext, useState } from 'react';

export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  token: '',
});
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [token, setToken] = useState(null);
  const isUserLoggedIn = token === null ? false : true;

  function login(usertoken) {
    setToken(usertoken);
  }
  function logout() {
    setToken(null);
  }
  const ctx = {
    login,
    logout,
    isUserLoggedIn,
  };
  return <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;
