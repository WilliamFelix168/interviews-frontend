import React from 'react';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3041D9',
    },
    secondary: {
      main: '#E3B641',
      contrastText: '#ffffff'
    }
  },
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        border: 'none',
      },
      root: {
        backgroundColor: '#F2F2F2',
      },
    },
    MuiButton: {
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        }
      },
      label: {
        textTransform: 'none',
      }
    }, 
    MuiTypography: {
      root: {
        fontFamily: "'Open Sans', sans-serif!important",
        fontSize: 14,
      },
      body1: {
        fontSize: 14,
      },
      h1: {
        fontSize: 28,
      },
      h2: {
        fontSize: 24,
      },
      h3: {
        fontSize: 20,
      },
      h4: {
        fontSize: 16,
      },
      h5: {
        fontSize: 14,
      },
      h6: {
        fontSize: 12,
      },
    }
  }
})

const ThemeProvider: React.FC = (props) => {
  const { children } = props;
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider;
