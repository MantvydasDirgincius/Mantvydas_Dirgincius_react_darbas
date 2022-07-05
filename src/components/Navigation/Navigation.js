import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';

import css from './Navigation.module.css';

function Navigation() {
  const { isUserLoggedIn, logout } = useAuthCtx();

  return (
    <header className={css.header}>
      <div className={`container ${css.flexingNav}`}>
        <Link to={'/'}>
          <img
            className={css.img}
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'
            alt='google logo'
          />
        </Link>
        <nav>
          {isUserLoggedIn && (
            <NavLink to='/' className='navLink'>
              Home
            </NavLink>
          )}
          {!isUserLoggedIn && (
            <NavLink to='/login' className='navLink'>
              Login
            </NavLink>
          )}
          {isUserLoggedIn && (
            <NavLink to='/Add' className='navLink'>
              Add
            </NavLink>
          )}
          {isUserLoggedIn && (
            <NavLink to='/login' onClick={logout} className='navLink'>
              log out
            </NavLink>
          )}
          {!isUserLoggedIn && (
            <NavLink to='/register' className='navLink'>
              Register
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
