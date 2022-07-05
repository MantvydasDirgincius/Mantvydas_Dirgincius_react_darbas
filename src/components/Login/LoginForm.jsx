import { useFormik } from 'formik';
import { useContext } from 'react';

import * as Yup from 'yup';
import { AuthContext } from '../../store/authContext';
import { doPostRequest } from '../../utils';
import css from './LoginForm.module.css';

const initValues = {
  email: '',
  password: '',
};
function LoginForm({ onSuccessLogin }) {
  const { login } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email().required('Required'),
      password: Yup.string().min(4).required('Required'),
    }),
    onSubmit: async (values) => {
      const result = await doPostRequest(
        'https://autumn-delicate-wilderness.glitch.me/v1/auth/login',
        values
      );
      console.log('result ===', result);
      console.log('result.token ===', result.token);
      if (!result.token) {
        console.log('False token');
        return;
      }

      onSuccessLogin();

      login(result.token);
    },
  });

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          className={formik.touched.email && formik.errors.email ? css.errorInput : ''}
          name='email'
          type='text'
          placeholder='Your Email'
        />
        {formik.touched.email && formik.errors.email && (
          <p className={css.errorMsg}>{formik.errors.email}</p>
        )}
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          className={formik.touched.password && formik.errors.password ? css.errorInput : ''}
          name='password'
          type='password'
          placeholder='Your password'
        />
        {formik.touched.password && formik.errors.password && (
          <p className={css.errorMsg}>{formik.errors.password}</p>
        )}
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
