import { useFormik } from 'formik';
import { useContext, useState } from 'react';

import * as Yup from 'yup';
import { AuthContext } from '../../store/authContext';
import { baseUrl, doPostRequest } from '../../utils';
import css from './LoginForm.module.css';

const initValues = {
  email: '',
  password: '',
};
function LoginForm({ onSuccessLogin }) {
  const { login } = useContext(AuthContext);
  const [err, setErr] = useState([]);
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email().required('Required'),
      password: Yup.string().min(4).required('Required'),
    }),
    onSubmit: async (values) => {
      const result = await doPostRequest(`${baseUrl}v1/auth/login`, values);

      if (!result.token) {
        setErr(result.err);

        return;
      }

      onSuccessLogin();

      login(result.token);
    },
  });

  return (
    <div className={css.div}>
      <h1 className={css.title}>Sign up</h1>
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          className={`${css.input} ${
            formik.touched.email && formik.errors.email ? css.errorInput : ''
          }`}
          name='email'
          type='text'
          placeholder='Your Email'
        />
        {formik.touched.email && formik.errors.email && (
          <p className={css.errorMsg}>{formik.errors.email}</p>
        )}
        {err.length > 0 && <p className={css.errorMsg}>{err}</p>}

        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          className={`${css.input} ${
            formik.touched.password && formik.errors.password ? css.errorInput : ''
          }`}
          name='password'
          type='password'
          placeholder='Your password'
        />
        {formik.touched.password && formik.errors.password && (
          <p className={css.errorMsg}>{formik.errors.password}</p>
        )}
        {err.length > 0 && <p className={css.errorMsg}>{err}</p>}
        <button className={css.button} type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
