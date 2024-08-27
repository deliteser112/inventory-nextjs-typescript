"use client"

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#39DB7D',
    },
    secondary: {
      main: '#2E414D',
    },
    background: {
      default: '#0F171A',
      paper: '#141E22',
    },
    text: {
      primary: '#ffffff',
      secondary: '#B0BEC5',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#39DB7D',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#39DB7D',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#ffffff',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          padding: '8px 24px',
          backgroundColor: '#39DB7D',
          '&:hover': {
            backgroundColor: '#2E414D',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A262D',
          color: '#ffffff',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#141E22',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#283943',
          color: '#ffffff',
        },
      },
    },
  },
});

export default theme;
