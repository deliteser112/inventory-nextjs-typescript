"use client"

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#39DB7D',  // Green
    },
    secondary: {
      main: '#2E414D',  // Dark 05
    },
    background: {
      default: '#0F171A',  // Black
      paper: '#141E22',    // Dark 04 (variant)
    },
    text: {
      primary: '#ffffff',
      secondary: '#B0BEC5',  // Light grey text
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
      color: '#39DB7D',  // Green
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#39DB7D',  // Green
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#ffffff',  // White text
    },
  },
  shape: {
    borderRadius: 8,  // Rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',  // Rounded pill shape
          padding: '8px 24px',
          backgroundColor: '#39DB7D',  // Green button background
          '&:hover': {
            backgroundColor: '#2E414D',  // Dark 05 on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A262D',  // Dark 03
          color: '#ffffff',  // White text
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#141E22',  // Dark 04 (variant)
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#283943',  // Dark 04
          color: '#ffffff',
        },
      },
    },
  },
});

export default theme;
