import React, { useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '../../dialog';
import styles from './link.module.css';
import FBIcon from '../../../assets/images/fb.png';
import PinIcon from '../../../assets/images/pinterest.png';
import TwiIcon from '../../../assets/images/twitter.png';
import MailIcon from '../../../assets/images/mail.png';

interface LinkProps {
  open: boolean;
  onClose: () => void;
}

const socials = [
  { icon: FBIcon },
  { icon: MailIcon },
  { icon: TwiIcon },
  { icon: PinIcon },
]

const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const { open, onClose } = props;

  const link:any = useRef(null);

  function handleSocialClick() {
    alert("Features comming soon!")
  }

  function handleCopyClick() {
    if (link.current) {
      link.current.select();
      link.current.setSelectionRange(0, 99999);
      
      document.execCommand("copy");
      
      alert("Copied to clipboard!");
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Share"
      fullWidth={false}
    >
      <Box className={styles.container}>
        <Box>
          <Typography className={styles.title} >
            Direct Link
          </Typography>
          <Box
            display="flex"
            alignItems="center"
          >
            <TextField
              variant="outlined"
              value={window.location.href}
              type="url"
              margin="dense"
              size="small"
              inputRef={link}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={handleCopyClick}
            >
              Copy
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography className={styles.title}>
            Share to
          </Typography>
          <Box>
            {
              socials.map(row => (
                <IconButton
                  size="small"
                  onClick={handleSocialClick}
                >
                  <Avatar src={row.icon} />
                </IconButton>
              ))
            }
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default Link;
