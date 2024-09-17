import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import { SpeedInsights } from "@vercel/speed-insights/react";
import i18n from './i18n';
import App from './App';
import theme from './theme/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nextProvider i18n={i18n}>
        <App />
        <SpeedInsights />
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>
);