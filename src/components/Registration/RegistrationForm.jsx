import { useFormik } from 'formik';
import React, { useState } from 'react';
import style from './RegisterForm.module.css';
import * as Yup from 'yup';
import { baseUrl, doPostRequest } from '../../utils';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

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

      const result = await doPostRequest(`${baseUrl}v1/auth/register`, newUser);

      if (result.changes !== 1) {
        toast.error('Registracion false');
        return;
      }
      setRegistration(true);
    },
  });
  return (
    <div>
      <Toaster />
      {registration ? (
        <div className={style.success}>
          <h2 className={style.title}>
            Registration success please <Link to='/'>Login</Link>
          </h2>
        </div>
      ) : (
        <div>
          <h1 className={style.title}>Registration</h1>
          <form onSubmit={formik.handleSubmit} className={style.form}>
            <input
              className={`${style.input} ${
                formik.touched.username && formik.errors.username && `${style.errorInput}`
              }`}
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
              className={`${style.input} ${
                formik.touched.email && formik.errors.email && `${style.errorInput}`
              }`}
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
              className={`${style.input} ${
                formik.touched.password && formik.errors.password && `${style.errorInput}`
              }`}
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
              className={`${style.input} ${
                formik.touched.repPassword && formik.errors.repPassword && `${style.errorInput}`
              }`}
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
            <button className={style.button} type='submit'>
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
