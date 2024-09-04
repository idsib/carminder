import React from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';

const LoadingPage = ({ mode }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mode === 'dark' ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
      }}
    >
      <img
        src="/carminder.png"
        alt="CarMinder Logo"
        style={{
          width: '100px',
          marginBottom: '20px',
          animation: 'pulse 1.5s infinite',
          filter: mode === 'dark' ? 'brightness(0.8)' : 'none',
        }}
      />
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: theme.palette.primary.main,
        }}
      />
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingPage;