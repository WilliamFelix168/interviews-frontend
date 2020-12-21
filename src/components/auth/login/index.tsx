import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import TextField from '../../common/form/text';
import Dialog from '../../dialog';
import styles from './login.module.css';
import googleIcon from '../../../assets/icons/google.svg';
import facebookIcon from '../../../assets/icons/facebook.svg';
import { useStateContext } from '../../../context';

const ForgotPassword: React.FC = () => {
  return (
    <Button
      color="default"
      size="small"
    >
      Forgot Password?
    </Button>
  )
}

interface DialogFooterProps {
  onRegister: () => void;
}

const DialogFooter: React.FC<DialogFooterProps> = (props: DialogFooterProps) => {
  const { onRegister } = props;
  return (
    <Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="1rem"
      >
        <Typography align="center">
          Don't have any account?&nbsp;
        </Typography>
        <Button color="primary" size="small" onClick={onRegister}>
          Sign Up for Free
        </Button>
      </Box>
    </Box>
  )
}

interface LoginProps {
  open: boolean;
  onClose: () => void;
  onRegister: () => void;
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const { open, onClose, onRegister } = props;

  const [, dispatch] = useStateContext();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  useEffect(() => {
    const users = JSON.parse(window.localStorage.getItem('users') || "[]");
    const user = JSON.parse(window.localStorage.getItem('user') || "{}");

    const userExist = users.some((curUser: any) => curUser.id === user?.id);

    if (userExist) {
      dispatch({
        type: "SET_USER",
        payload: {
          value: user,
        }
      })
    } else {
      if (user) {
        window.localStorage.removeItem('user');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOnSubmit(values: Record<string, any>) {
    const users = JSON.parse(window.localStorage.getItem("users") || "[]");
    const findedUser = users.find((user: any) => user.email === values.email);

    if (!findedUser) {
      alert('Sorry, user not found!');
    } else {
      if (values.password === findedUser.password) {
        alert('Login successfully');

        window.localStorage.setItem('user', JSON.stringify(findedUser));

        dispatch({
          type: "SET_USER",
          payload: {
            value: findedUser,
          },
        })
        onClose();
      } else {
        alert('Email or password is invalid');
        setValue('password', '');
      }
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={'Login'}
      footer={<DialogFooter onRegister={onRegister} />}
    >
      <React.Fragment>
        <form className={styles.form} onSubmit={handleSubmit(handleOnSubmit)}>
          <TextField
            name="email"
            type="email"
            label="Email"
            placeholder="username@domain.com"
            required
            control={control}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            required
            control={control}
            labelOptions={<ForgotPassword />}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Login with Email
          </Button>
        </form>
        <Typography align="center">
          or
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          className={styles.socialLoginBtn}
        >
          <Button
            className={styles.googleBtn}
            onClick={() => alert('Features comming soon')}
          >
            <img src={googleIcon} width="18px" height="18px" alt="" style={{ marginRight: '.5rem' }} />
            Continue with Google
          </Button>
          <Button
            className={styles.facebookBtn}
            onClick={() => alert('Features comming soon')}
          >
            <img src={facebookIcon} width="18px" height="18px" alt="" style={{ marginRight: '.5rem' }} />
            Continue with Facebook
          </Button>
        </Box>
        <Typography align="center" color="textSecondary" variant="caption">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </Typography>
      </React.Fragment>
    </Dialog >
  )
}

export default Login;
