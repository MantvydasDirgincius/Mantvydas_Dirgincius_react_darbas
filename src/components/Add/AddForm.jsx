import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { AuthContext } from '../../store/authContext';
import { doPostRequest } from '../../utils';
import css from './AddForm.module.css';
import toast, { Toaster } from 'react-hot-toast';

const initValues = {
  title: '',
  description: '',
};
export default function AddForm() {
  const { token } = useContext(AuthContext);
  const notify = () =>
    toast('Here is your toast.', {
      duration: 2000,
      position: 'top-center',
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string().min(4).required('Required'),
      description: Yup.string().min(5).max(15).required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const result = await doPostRequest(
        'https://autumn-delicate-wilderness.glitch.me/v1/content/skills',
        values,
        token
      );
      resetForm({ values: '' });

      if (result.msg === 'Added new skill to account') {
        notify();
        console.log('sukurta');
      }
    },
  });

  return (
    <div>
      <Toaster />
      <h1 className={css.title}>Add</h1>
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.title}
          className={`${css.input} ${
            formik.touched.title && formik.errors.title ? css.errorInput : ''
          }`}
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
          className={`${css.input} ${
            formik.touched.description && formik.errors.description ? css.errorInput : ''
          }`}
          name='description'
          type='description'
          placeholder='Your description'
        />

        {formik.touched.description && formik.errors.description && (
          <p className={css.errorMsg}>{formik.errors.description}</p>
        )}
        <button className={css.button} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}
