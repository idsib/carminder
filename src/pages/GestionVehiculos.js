import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AppBar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  createTheme,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import { DirectionsCar, GitHub, Menu, Schedule, DarkMode, LightMode, Language, Login } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { MovingBackground} from './Inicio';

export default function GestionVehiculos() {
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
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [anchorElLang, setAnchorElLang] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  if (redirectToSignUp) {
    return <Navigate to="/sign-in" replace />;
  }

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    handleLanguageMenuClose();
  };

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

  const handleSignup = () => {
    setRedirectToSignUp(true);
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorElLang(null);
  };

  const handleViewDocumentation = () => {
    navigate('/documentation');
  };

  const handleDocsClick = () => {
    navigate('/documentation');
    handleClose(); 
  };

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    kilometros: '',
    ultimoMantenimiento: '',
    proximoMantenimiento: '',
    notas: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí puedes agregar la lógica para enviar los datos a tu backend
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
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
                    <MenuItem onClick={() => { handleClose(); navigate('/'); }}>{t('Features')}</MenuItem>
                    <MenuItem onClick={handleDocsClick}>{t('Docs')}</MenuItem>
                  </MuiMenu>
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
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate('/')}>{t('Features')}</Button>
                  <Button color="inherit" onClick={handleDocsClick}>{t('Docs')}</Button>
                  <Button
                    color="inherit"
                    startIcon={<GitHub />}
                    href="https://github.com/idsib/carminder"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Button>
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
                </>
              )}
              <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSignup}
                startIcon={<Login />}
                sx={{ 
                  ml: 2,
                  borderRadius: '20px',
                  textTransform: 'none',
                }}
              >
                {t('SIGN IN')}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: 0,
          pt: '64px', // Altura del AppBar
          pb: 4,
        }}>
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <Box sx={{
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: { xs: '20px', sm: '40px' },
              boxShadow: `0 8px 32px 0 ${theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.37)' : 'rgba(76, 175, 80, 0.37)'}`,
            }}>
              <motion.div variants={fadeInUp}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                  {t('Gestión de Vehículos')}
                </Typography>
              </motion.div>
              <form onSubmit={handleSubmit}>
                {Object.entries(formData).map(([key, value]) => (
                  <motion.div key={key} variants={fadeInUp}>
                    <TextField
                      fullWidth
                      label={t(key.charAt(0).toUpperCase() + key.slice(1))}
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      margin="normal"
                      required={key !== 'notas'}
                      multiline={key === 'notas'}
                      rows={key === 'notas' ? 4 : 1}
                      type={key.includes('fecha') ? 'date' : key === 'kilometros' ? 'number' : 'text'}
                      InputLabelProps={key.includes('fecha') ? { shrink: true } : undefined}
                    />
                  </motion.div>
                ))}
                <motion.div variants={fadeInUp}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    {t('Guardar')}
                  </Button>
                </motion.div>
              </form>
            </Box>
          </motion.div>
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}