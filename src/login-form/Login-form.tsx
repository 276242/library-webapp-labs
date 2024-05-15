import { Button, TextField } from '@mui/material';
import './Login-form.css';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

type LoginFormProps = {
  username: string;
  password: string;
};

function LoginForm() {
  const initialValues = { username: '', password: '' };

  const navigate = useNavigate();
  const submit = useCallback(
    (values: LoginFormProps, formik: any) => {
      navigate('/home');
    },
    [navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object({
        username: yup.string().required("Username can't be empty"),
        password: yup.string().required("Password can't be empty").min(5),
      }),
    [],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submit}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnChange
    >
      {(formik: any) => (
        <form
          id="loginForm"
          className="Login-form"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            id="username"
            label="Username"
            variant="standard"
            // name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type="password"
            // name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            type="submit"
            disabled={!formik.isValid && formik.dirty}
          >
            Sign in
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
