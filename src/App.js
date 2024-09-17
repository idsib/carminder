import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import HistorialTareas from './pages/HistorialTareas';
import Inicio from './pages/Inicio';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Docs from './pages/Docs';
import theme from './theme/theme';
import ForgotPassword from './pages/ForgotPassword';
import GestionVehiculos from './pages/GestionVehiculos';
import Inventario from './pages/Inventario'


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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
