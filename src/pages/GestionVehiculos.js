import React, { useState, useEffect, useMemo } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  Avatar,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { DirectionsCar, GitHub, Menu, Schedule, DarkMode, LightMode, Language, Login } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { MovingBackground} from './Inicio';
import { getMarcas, getModelos, guardarVehiculo } from '../api/vehiculosApi';

const LogoImage = ({ logos, alt }) => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (currentLogoIndex < logos.length - 1) {
      setCurrentLogoIndex(currentLogoIndex + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return <DirectionsCar sx={{ width: 24, height: 24, marginRight: 1 }} />;
  }

  return (
    <Avatar
      src={logos[currentLogoIndex]}
      alt={alt}
      onError={handleError}
      sx={{ width: 24, height: 24, marginRight: 1 }}
    />
  );
};

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
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    año: '', // Añadimos el campo de año
    kilometros: '',
    ultimoMantenimiento: '',
    proximoMantenimiento: '',
    notas: '',
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    const fetchMarcas = async () => {
      setLoading(true);
      try {
        const marcasData = await getMarcas();
        setMarcas(marcasData);
      } catch (error) {
        console.error('Error al cargar las marcas:', error);
        setSnackbar({ open: true, message: t('Error al cargar las marcas'), severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchMarcas();
  }, [t]);

  useEffect(() => {
    const fetchModelos = async () => {
      if (formData.marca) {
        setLoading(true);
        try {
          const modelosData = await getModelos(formData.marca);
          setModelos(modelosData);
        } catch (error) {
          console.error('Error al cargar los modelos:', error);
          setSnackbar({ open: true, message: t('Error al cargar los modelos'), severity: 'error' });
        } finally {
          setLoading(false);
        }
      } else {
        setModelos([]);
      }
    };
    fetchModelos();
  }, [formData.marca, t]);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      ...(name === 'marca' ? { modelo: '' } : {})
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await guardarVehiculo(formData);
      setSnackbar({ open: true, message: t(result.message), severity: 'success' });
    } catch (error) {
      console.error('Error al guardar el vehículo:', error);
      setSnackbar({ open: true, message: t('Error al guardar el vehículo'), severity: 'error' });
    } finally {
      setLoading(false);
    }
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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
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
                <Box sx={{ overflow: 'hidden' }}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                  >
                    <Typography 
                      variant="h4" 
                      component="h1" 
                      gutterBottom 
                      align="center"
                      sx={{ 
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #4caf50 30%, #2196f3 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {t('Gestión de Vehículos')}
                    </Typography>
                  </motion.div>
                </Box>
              </motion.div>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="marca-label">{t('Marca')}</InputLabel>
                      <Select
                        labelId="marca-label"
                        name="marca"
                        value={formData.marca}
                        onChange={handleInputChange}
                        label={t('Marca')}
                        disabled={loading}
                      >
                        {marcas.map((marca) => (
                          <MenuItem key={marca.make_id} value={marca.make_id}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LogoImage logos={marca.make_logos} alt={marca.make_display} />
                              <Typography>{marca.make_display}</Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!formData.marca || loading}>
                      <InputLabel id="modelo-label">{t('Modelo')}</InputLabel>
                      <Select
                        labelId="modelo-label"
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleInputChange}
                        label={t('Modelo')}
                      >
                        {modelos.map((modelo) => (
                          <MenuItem key={modelo.model_name} value={modelo.model_name}>
                            {modelo.model_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('Año')}
                      name="año"
                      value={formData.año}
                      onChange={handleInputChange}
                      type="number"
                      InputProps={{ inputProps: { min: 1900, max: new Date().getFullYear() } }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('Kilometros')}
                      name="kilometros"
                      value={formData.kilometros}
                      onChange={handleInputChange}
                      type="number"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('Último Mantenimiento')}
                      name="ultimoMantenimiento"
                      value={formData.ultimoMantenimiento}
                      onChange={handleInputChange}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('Próximo Mantenimiento')}
                      name="proximoMantenimiento"
                      value={formData.proximoMantenimiento}
                      onChange={handleInputChange}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('Notas')}
                      name="notas"
                      value={formData.notas}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading}
                    >
                      {loading ? t('Guardando...') : t('Guardar')}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </motion.div>
        </Container>

        <Footer />
      </Box>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}