import React, { ReactChild } from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import styles from './dialog.module.css';
import { Divider } from '@material-ui/core';

interface DialogProps {
  open: boolean;
  children?: ReactChild;
  footer?: ReactChild;
  title?: string;
  onClose?: () => void;
  fullWidth?: boolean;
}

const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
  const { open, title = "", onClose, children, footer, fullWidth = true } = props;

  return (
    <MuiDialog disableBackdropClick open={open} onClose={onClose} fullWidth={fullWidth}>
      <DialogTitle disableTypography className={styles.dialogTitle}>
        <Typography variant="h3">
          {title}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {children}
      </DialogContent>
      {footer}
    </MuiDialog>
  )
}

export default Dialog;
