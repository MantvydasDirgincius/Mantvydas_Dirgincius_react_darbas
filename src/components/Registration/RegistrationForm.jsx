import { useFormik } from 'formik';
import React, { useState } from 'react';
import style from './RegisterForm.module.css';
import * as Yup from 'yup';
import { doPostRequest } from '../../utils';
import { Link } from 'react-router-dom';

const initValues = {
  username: '',
  email: '',
  password: '',
  repPassword: '',
};
function RegisterForm() {
  const [registration, setRegistration] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      username: Yup.string().min(4, 'minimum required 4 characters').required('Required'),
      email: Yup.string().email().required('Required'),
      password: Yup.string().min(4).required('Required'),
      repPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      const newUser = {
        email: values.email,
        password: values.password,
      };

      const result = await doPostRequest(
        'https://autumn-delicate-wilderness.glitch.me/v1/auth/register',
        newUser
      );
      console.log('result ===', result);
      if (result.changes !== 1) {
        console.log('Registracion false');
        return;
      }
      setRegistration(true);
    },
  });
  return (
    <div>
      {registration ? (
        <h2>
          registration success please <Link to='/login'>Login</Link>
        </h2>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <input
            className={formik.touched.username && formik.errors.username && `${style.errorInput}`}
            type='text'
            name='username'
            placeholder='Username'
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <p className={style.errorMsg}>{formik.errors.username}</p>
          ) : (
            ''
          )}
          <input
            className={formik.touched.email && formik.errors.email && `${style.errorInput}`}
            type='text'
            name='email'
            placeholder='Email'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className={style.errorMsg}>{formik.errors.email}</p>
          ) : (
            ''
          )}
          <input
            className={formik.touched.password && formik.errors.password && `${style.errorInput}`}
            type='password'
            name='password'
            placeholder='Password'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className={style.errorMsg}>{formik.errors.password}</p>
          ) : (
            ''
          )}
          <input
            className={
              formik.touched.repPassword && formik.errors.repPassword && `${style.errorInput}`
            }
            type='password'
            name='repPassword'
            placeholder='Repeat password'
            onChange={formik.handleChange}
            value={formik.values.repPassword}
            onBlur={formik.handleBlur}
          />
          {formik.touched.repPassword && formik.errors.repPassword ? (
            <p className={style.errorMsg}>{formik.errors.repPassword}</p>
          ) : (
            ''
          )}
          <button type='submit'>Register</button>
        </form>
      )}
    </div>
  );
}

export default RegisterForm;
