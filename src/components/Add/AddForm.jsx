import { useFormik } from 'formik';
import { useContext } from 'react';

import * as Yup from 'yup';
import { AuthContext } from '../../store/authContext';

import { doPostRequest } from '../../utils';
import css from './AddForm.module.css';

const initValues = {
  title: '',
  description: '',
};
export default function AddForm() {
  const { token } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string().min(5).required('Required'),
      description: Yup.string().min(4).required('Required'),
    }),
    onSubmit: async (values) => {
      const result = await doPostRequest(
        'https://autumn-delicate-wilderness.glitch.me/v1/content/skills',
        values,
        token
      );

      if (result.msg === 'Added new skill to account') {
        console.log('sukurta');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.title}
        className={formik.touched.title && formik.errors.title ? css.errorInput : ''}
        name='title'
        type='text'
        placeholder='Your Title'
      />
      {formik.touched.title && formik.errors.title && (
        <p className={css.errorMsg}>{formik.errors.title}</p>
      )}
      <input
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.description}
        className={formik.touched.description && formik.errors.description ? css.errorInput : ''}
        name='description'
        type='description'
        placeholder='Your description'
      />
      {formik.touched.description && formik.errors.description && (
        <p className={css.errorMsg}>{formik.errors.description}</p>
      )}
      <button type='submit'>Submit</button>
    </form>
  );
}
