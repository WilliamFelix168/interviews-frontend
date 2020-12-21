import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import styles from './actions.module.css';
import UploadIcon from '@material-ui/icons/CloudUpload';
import Login from '../../auth/login';
import Register from '../../auth/register';
import { useStateContext } from '../../../context';
import Upload from '../../upload';

const UserButton: React.FC = () => {
  const [{ user }] = useStateContext();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const [, dispatch] = useStateContext();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleLogout() {
    window.localStorage.removeItem('user');
    dispatch({
      type: "SET_USER",
      payload: {
        value: null
      }
    })
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <Grow in={user?.email} mountOnEnter unmountOnExit>
        <IconButton size="small" onClick={handleClick}>
          <Avatar color="primary" style={{ width: 30, height: 30 }}>
            {user?.name[0]}
          </Avatar>
        </IconButton>
      </Grow>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
      >
        <Box
          display="flex"
          width="150px"
          padding=".5rem"
          flexDirection="column"
        >
          <Box
            display="flex"
            flexDirection="column"
            marginBottom=".5rem"
          >
            <Typography>
              {user?.name}
            </Typography>
            <Typography variant="caption">
              {user?.email}
            </Typography>
          </Box>
          <Divider />
          <Button onClick={handleLogout} style={{ marginTop: '.5rem' }}>
            Log Out
            <LogoutIcon fontSize="small" />
          </Button>
        </Box>
      </Popover>
    </React.Fragment>
  )
}

const Actions: React.FC = () => {
  const [action, setAction] = useState('none');

  const [{ user }] = useStateContext();

  function handleResetAction() {
    setAction('none');
  }

  return (
    <div className={styles.container}>
      <Grow in={!user?.email} appear mountOnEnter unmountOnExit>
        <>
          <Button
            size="small"
            variant="text"
            color="primary"
            onClick={() => setAction('login')}
          >
            LOGIN
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setAction('register')}
          >
            SIGN UP
          </Button>
        </>
      </Grow>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={() => setAction((user?.email) ? 'upload' : 'login')}
      >
        <Box
          mr={1}
          display="flex"
          alignItems="center"
        >
          <UploadIcon fontSize="small" />
        </Box>
        UPLOAD
      </Button>
      <UserButton />
      <Login
        open={action === 'login'}
        onRegister={() => setAction('register')}
        onClose={handleResetAction}
      />
      <Register
        open={action === 'register'}
        onLogin={() => setAction('login')}
        onClose={handleResetAction}
      />
      <Upload
        open={action === 'upload'}
        onClose={handleResetAction}
      />
    </div>
  )
}

export default Actions;
