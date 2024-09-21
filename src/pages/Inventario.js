import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from '@mui/material';
import { DirectionsCar, GitHub, Menu, DarkMode, LightMode, Language, Logout, Schedule } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { MovingBackground } from './Inicio';
import { getVehiculos } from '../api/vehiculosApi'; // Asegúrate de crear esta función en tu API

export default function Inventario() {
  const [mode, setMode] = useState(() => localStorage.getItem('colorMode') || 'light');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#4caf50',
          },
          ...(mode === 'dark' ? {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#b0b0b0',
            },
          } : {}),
        },
      }),
    [mode],
  );
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const vehiculosData = await getVehiculos();
        setVehiculos(vehiculosData);
      } catch (error) {
        console.error('Error al cargar los vehículos:', error);
      }
    };
    fetchVehiculos();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('colorMode', newMode);
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorElLang(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    handleLanguageMenuClose();
  };

  const handleLogout = () => {
    // Implementa aquí la lógica de cierre de sesión
    navigate('/');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        flexGrow: 1, 
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <MovingBackground />
        <AppBar 
          position="fixed" 
          sx={{ 
            backdropFilter: 'blur(10px)',
            background: 'transparent',
            boxShadow: 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: theme.palette.mode === 'dark' 
                ? 'rgba(18, 18, 18, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)',
              zIndex: -1,
            },
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              onClick={() => navigate('/')}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carminder-bZFEVGRBpyi8WS2AfdnDvVepJGPvuv.png"
                alt="CarMinder Logo"
                style={{ height: 40, marginRight: theme.spacing(2) }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isMobile ? (
                <>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <Menu />
                  </IconButton>
                  <MuiMenu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => { handleClose(); navigate('/'); }}>{t('Inicio')}</MenuItem>
                    <MenuItem onClick={() => { handleClose(); navigate('/gestion-vehiculos'); }}>{t('Gestión de Vehículos')}</MenuItem>
                    <MenuItem onClick={() => { handleClose(); navigate('/inventario'); }}>{t('Inventario')}</MenuItem>
                  </MuiMenu>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate('/')}>{t('Inicio')}</Button>
                  <Button color="inherit" onClick={() => navigate('/gestion-vehiculos')}>{t('Gestión de Vehículos')}</Button>
                  <Button color="inherit" onClick={() => navigate('/inventario')}>{t('Inventario')}</Button>
                </>
              )}
              <IconButton onClick={handleLanguageMenuOpen} color="inherit">
                <Language />
              </IconButton>
              <MuiMenu
                anchorEl={anchorElLang}
                open={Boolean(anchorElLang)}
                onClose={handleLanguageMenuClose}
              >
                <MenuItem onClick={() => changeLanguage('es')}>{t('ES')}</MenuItem>
                <MenuItem onClick={() => changeLanguage('en')}>{t('EN')}</MenuItem>
              </MuiMenu>
              <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ 
          flexGrow: 1,
          mt: 0,
          pt: '64px', // Altura del AppBar
          pb: 4,
        }}>
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              align="center"
              sx={{ 
                fontWeight: 'bold',
                my: 4,
                background: 'linear-gradient(45deg, #4caf50 30%, #2196f3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('Inventario de Vehículos')}
            </Typography>

            <Grid container spacing={3}>
              {vehiculos.map((vehiculo, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://source.unsplash.com/featured/?${vehiculo.marca},${vehiculo.modelo}`}
                      alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {vehiculo.marca} {vehiculo.modelo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {t('Año')}: {vehiculo.año}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {t('Kilometraje')}: {vehiculo.kilometros} km
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Chip 
                          icon={<DirectionsCar />} 
                          label={t('Último Mantenimiento')} 
                          size="small" 
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {new Date(vehiculo.ultimoMantenimiento).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box>
                        <Chip 
                          icon={<Schedule />} 
                          label={t('Próximo Mantenimiento')} 
                          size="small" 
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(vehiculo.proximoMantenimiento).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}