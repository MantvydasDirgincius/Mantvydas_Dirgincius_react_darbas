import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../components/Login/LoginForm';

function Login() {
  const history = useHistory();
  function handleSuccessLogin() {
    history.replace('/');
  }
  return (
    <div>
      <LoginForm onSuccessLogin={handleSuccessLogin} />
    </div>
  );
}

export default Login;
