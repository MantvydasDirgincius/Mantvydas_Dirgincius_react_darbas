import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import css from './Navigation.module.css';

function Navigation() {
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
          <NavLink to='/' className={css.navLink}>
            Home
          </NavLink>

          <NavLink to='/login' className={css.navLink}>
            Login
          </NavLink>

          <NavLink to='/login' className={css.navLink}>
            log out
          </NavLink>

          <NavLink to='/register' className={css.navLink}>
            Register
          </NavLink>
          <NavLink to='/Add' className={css.navLink}>
            Add
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
