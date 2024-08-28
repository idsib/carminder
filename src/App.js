import React from 'react';
import Inicio from './pages/Inicio';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
