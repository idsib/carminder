import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Search, DirectionsCar, Schedule, Build, GitHub } from '@mui/icons-material';

export default function CarTaskManager() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carminder-bZFEVGRBpyi8WS2AfdnDvVepJGPvuv.png" 
            alt="CarMinder Logo" 
            style={{ height: 40, marginRight: theme.spacing(2) }} 
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CarMinder
          </Typography>
          {!isMobile && (
            <>
              <Button color="inherit">Features</Button>
              <Button color="inherit">Pricing</Button>
              <Button color="inherit">Docs</Button>
            </>
          )}
          <Button 
            color="inherit" 
            startIcon={<GitHub />}
            href="https://github.com/carminder"
            target="_blank"
            rel="noopener noreferrer"
          >
            {isMobile ? '' : 'GitHub'}
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom fontWeight="bold">
          Simplify Your Car Maintenance
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Manage tasks, track maintenance, and keep your fleet running smoothly with CarMinder.
        </Typography>

        <Box sx={{ mt: 4, mb: 6, display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Search tasks, vehicles, or maintenance logs"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: '100%', maxWidth: 600 }}
          />
        </Box>

        <Grid container spacing={4}>
          {[
            { icon: <DirectionsCar />, title: 'Fleet Management', description: 'Easily manage all vehicles in your fleet from one central location.' },
            { icon: <Schedule />, title: 'Task Scheduling', description: 'Plan and schedule maintenance tasks for each vehicle with ease.' },
            { icon: <Build />, title: 'Maintenance Tracking', description: 'Keep a detailed record of all maintenance tasks performed on your vehicles.' },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <CardContent>
                  <Box 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'primary.contrastText', 
                      borderRadius: '50%', 
                      p: 2, 
                      mb: 2,
                      display: 'inline-flex'
                    }}
                  >
                    {React.cloneElement(feature.icon, { fontSize: 'large' })}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
            Get Started
          </Button>
          <Button variant="outlined" color="primary" size="large">
            View Documentation
          </Button>
        </Box>
      </Container>
    </Box>
  );
}