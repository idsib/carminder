import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './i18n';
import HistorialTareas from './pages/HistorialTareas';
import Inicio from './pages/Inicio';
import TareasActivas from './pages/TareasActivas';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Docs from './pages/Docs';
import theme from './theme/theme';
import ForgotPassword from './pages/ForgotPassword';

// Importa la fuente Inter
import '@fontsource/inter';
// Importa createTheme para modificar el tema
import { createTheme } from '@mui/material/styles';

// Modifica el tema para usar Inter como fuente principal
const interTheme = createTheme({
  ...theme,
  typography: {
    ...theme.typography,
    fontFamily: 'Inter, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={interTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} /> {/* Set Inicio as the default route */}
          <Route path="/historial-tareas" element={<HistorialTareas />} />
          <Route path="/tareas-activas" element={<TareasActivas />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/documentation" element={<Docs />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
