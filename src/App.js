import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import './i18n';
import HistorialTareas from './pages/HistorialTareas';
import Inicio from './pages/Inicio';
import TareasActivas from './pages/TareasActivas';
import SignUp from './pages/SignUp';
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} /> {/* Set Inicio as the default route */}
          <Route path="/historial-tareas" element={<HistorialTareas />} />
          <Route path="/tareas-activas" element={<TareasActivas />} />
          <Route path="/sign-up" element={<SignUp />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
