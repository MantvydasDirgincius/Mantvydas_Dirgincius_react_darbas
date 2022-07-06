import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/authContext';
import css from './PageNotFound.module.css';

function PageNotFound() {
  const { isUserLoggedIn } = useContext(AuthContext);
  return (
    <div>
      {isUserLoggedIn ? (
        <h2 className={css.title}> Page not found</h2>
      ) : (
        <h2 className={css.title}>
          You're not logged in! Please login in <Link to='/'>Login</Link>
        </h2>
      )}
    </div>
  );
}

export default PageNotFound;
