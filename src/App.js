import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import '@fontsource/inter';

import Inicio from './pages/Inicio';
import HistorialTareas from './pages/HistorialTareas';
import GestionVehiculos from './pages/GestionVehiculos';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Docs from './pages/Docs';
import Inventario from './pages/Inventario';
import Dashboard from './pages/Dashboard'; // Importa el componente Dashboard
import theme from './theme/theme';

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
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} /> {/* Set Inicio as the default route */}
          <Route path="/historial-tareas" element={<HistorialTareas />} />
          <Route path="/gestion-vehiculos" element={<GestionVehiculos />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/documentation" element={<Docs />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
