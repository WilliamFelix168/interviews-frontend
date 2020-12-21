import { Box, Button, Divider, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '../../common/form/text';
import Dialog from '../../dialog';
import styles from './register.module.css';

interface DialogFooterProps {
  onLogin: () => void;
}

const DialogFooter: React.FC<DialogFooterProps> = (props: DialogFooterProps) => {
  const { onLogin } = props;
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
          Already have Account?
        </Typography>
        <Button color="primary" size="small" onClick={onLogin}>
          Log In
        </Button>
      </Box>
    </Box>
  )
}

interface RegisterProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const Register: React.FC<RegisterProps> = (props: RegisterProps) => {
  const { open, onClose, onLogin } = props;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      'retype-password': '',
    }
  });

  function handleOnSubmit(values: Record<string, any>) {
    const users: any = JSON.parse(window.localStorage.getItem("users") || "[]");
    let index = users.findIndex((user: any) => user.email === values.email);

    if (index !== -1) {
      alert("Email already been taken");
    } else if (values.password !== values['retype-password']) {
      alert('Password mismatch!');
    }
    else {
      const id = (users.length + 1).toString();
      users.push({
        id,
        name: values.name,
        email: values.email,
        password: values.password,
      })

      window.localStorage.setItem("users", JSON.stringify(users));
      alert('Register Successfully!');
      onLogin();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={'Register'}
      footer={<DialogFooter onLogin={onLogin} />}
    >
      <React.Fragment>
        <form className={styles.form} onSubmit={handleSubmit(handleOnSubmit)}>
          <TextField
            name="name"
            type="text"
            label="Name"
            placeholder="your name"
            required
            control={control}
          />
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
          />
          <TextField
            name="retype-password"
            type="password"
            label="Retype Password"
            required
            control={control}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Register
          </Button>
        </form>
        <Typography align="center" color="textSecondary" variant="caption">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </Typography>
      </React.Fragment>
    </Dialog >
  )
}

export default Register;
