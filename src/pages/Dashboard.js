import React from 'react';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import { DirectionsCar, Build, Add } from '@mui/icons-material';

const Dashboard = () => {
  const cars = [
    { id: 1, name: 'Toyota Corolla', tasks: 3 },
    { id: 2, name: 'Honda Civic', tasks: 2 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Mis Coches
            </Typography>
            <List>
              {cars.map((car) => (
                <ListItem key={car.id} button>
                  <ListItemIcon>
                    <DirectionsCar />
                  </ListItemIcon>
                  <ListItemText primary={car.name} secondary={`${car.tasks} tareas pendientes`} />
                </ListItem>
              ))}
            </List>
            <Button startIcon={<Add />} variant="contained" color="primary" sx={{ mt: 2 }}>
              Añadir Coche
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Tareas Próximas
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Build />
                </ListItemIcon>
                <ListItemText primary="Cambio de aceite" secondary="Toyota Corolla - En 3 días" />
              </ListItem>
              {/* Añade más tareas aquí */}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;