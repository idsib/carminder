import { DirectionsCar, GitHub, Schedule, Search } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function CarTaskManager() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Initialize useNavigate

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Function to handle navigation when a card is clicked
  const handleCardClick = (route) => {
    navigate(route); // Use navigate to change routes
  };

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
            {t('appName')}
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
          <Button onClick={() => changeLanguage('en')} color="inherit">
            EN
          </Button>
          <Button onClick={() => changeLanguage('es')} color="inherit">
            ES
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom fontWeight="bold">
          {t('simplifyMaintenance')}
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          {t('manageTasks')}
        </Typography>

        <Box sx={{ mt: 4, mb: 6, display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            placeholder={t('searchPlaceholder')}
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

        <Grid container spacing={4} justifyContent="center">
          {[
            {
              icon: <DirectionsCar />,
              title: t('fleetManagement'),
              description: t('fleetManagementDescription'),
              route: '/historial-tareas', // Route to HistorialTareas component
            },
            {
              icon: <Schedule />,
              title: t('taskScheduling'),
              description: t('taskSchedulingDescription'),
              route: '/tareas-activas', // Route to TareasActivas component
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={6} key={index} display="flex" justifyContent="center">
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)', cursor: 'pointer' },
                }}
                onClick={() => handleCardClick(feature.route)} // Add onClick handler
              >
                <CardContent>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      p: 2,
                      mb: 2,
                      display: 'inline-box',
                      justifyContent: 'left',
                      alignItems: 'left',
                      padding: '0px',
                      borderRadius: '100%',
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
            {t('getStarted')}
          </Button>
          <Button variant="outlined" color="primary" size="large">
            {t('viewDocumentation')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
