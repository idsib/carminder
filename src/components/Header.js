import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Gestión de Tareas para Coches
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;