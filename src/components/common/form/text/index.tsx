import React, { ReactElement, useState } from 'react';
import MuiTextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Control, Controller } from 'react-hook-form';
import { IconButton, InputAdornment, InputProps } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

interface TextFieldProps {
  label?: string;
  type: string;
  labelOptions?: ReactElement;
  control: Control;
  name: string;
  placeholder?: string;
  required?: boolean;
  InputProps?: InputProps;
  fullWidth?: boolean;
  multiline?: boolean;
  noMarginBottom?: boolean;
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    label, type,
    placeholder, name,
    labelOptions, control,
    required, InputProps,
    fullWidth, noMarginBottom,
    multiline,
  } = props;
  const [show, setShow] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      mb={(noMarginBottom) ? 0 : "1rem"}
    >
      {label
        && <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography>{label} {required && "*"}</Typography>
          </Box>
          <Box>
            {labelOptions}
          </Box>
        </Box>}
      <Controller
        fullWidth={fullWidth}
        required={required}
        multiline={multiline}
        rows={4}
        rowsMax={5}
        control={control}
        as={MuiTextField}
        placeholder={placeholder}
        margin="dense"
        variant="outlined"
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setShow(!show)}
              >
                {
                  (show)
                    ? <VisibilityOffIcon fontSize="small" />
                    : <VisibilityIcon fontSize="small" />
                }
              </IconButton>
            </InputAdornment>
          ),
          ...InputProps,
        }}
        type={(type === 'password' && show) ? 'text' : type}
        name={name}
      />
    </Box>
  )
}

export default TextField;
