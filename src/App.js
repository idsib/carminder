import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import './i18n';
import Inicio from './pages/Inicio';
import theme from './theme/theme'; // Asegúrate de que esta ruta sea correcta

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Inicio />
    </ThemeProvider>
  );
}

export default App;
