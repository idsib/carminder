import { DirectionsCar, GitHub, Menu, Schedule, DarkMode, LightMode, Language } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
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
} from '@mui/material';
import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';

const MovingBackground = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        right: '-50%',
        bottom: '-50%',
        backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carminder-bZFEVGRBpyi8WS2AfdnDvVepJGPvuv.png)',
        backgroundSize: '80px 80px',
        opacity: (theme) => theme.palette.mode === 'dark' ? 0.02 : 0.05,
        animation: 'move 10s linear infinite',
        filter: (theme) => theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
      },
      '@keyframes move': {
        '0%': { transform: 'translate(0, 0)' },
        '100%': { transform: 'translate(80px, 80px)' },
      },
    }}
  />
);

const ShiningText = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <Typography
      {...props}
      sx={{
        ...props.sx,
        position: 'relative',
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(45deg, ${theme.palette.primary.main} 0%, #ffffff 50%, ${theme.palette.primary.main} 100%)`
          : `linear-gradient(45deg, ${theme.palette.primary.main} 0%, #ffffff 50%, ${theme.palette.primary.main} 100%)`,
        backgroundSize: '200% auto',
        color: 'transparent',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        animation: 'shine 5s linear infinite',
        '@keyframes shine': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      }}
    >
      {children}
    </Typography>
  );
};

export default function CarTaskManager() {
  const [mode, setMode] = useState(() => localStorage.getItem('colorMode') || 'light');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#4caf50', // Mantenemos el color verde
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
    return <Navigate to="/sign-up" replace />;
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

  const handleCardClick = (route) => {
    navigate(route);
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                sx={{ 
                  ml: 2,
                  borderRadius: '20px',
                  textTransform: 'none',
                }}
              >
                {t('SIGN UP')}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: 0,
          pt: '64px', // Altura del AppBar
          pb: 4,
        }}>
          <Box sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: { xs: '20px', sm: '40px' },
            boxShadow: `0 8px 32px 0 ${theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.37)' : 'rgba(76, 175, 80, 0.37)'}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Box
              component="img"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carminder-bZFEVGRBpyi8WS2AfdnDvVepJGPvuv.png"
              alt="CarMinder Logo"
              sx={{
                width: { xs: '100px', sm: '150px' },
                height: 'auto',
                marginBottom: { xs: 2, sm: 4 },
              }}
            />
            <ShiningText variant="h2" component="h1" align="center" gutterBottom fontWeight="bold" sx={{ 
              fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
              textShadow: theme.palette.mode === 'dark' ? '0 0 10px rgba(76, 175, 80, 0.3)' : '0 0 10px rgba(0,0,0,0.1)'
            }}>
              {t('simplifyMaintenance')}
            </ShiningText>
            <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}>
              {t('manageTasks')}
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {[
                { icon: <DirectionsCar />, title: t('fleetManagement'), description: t('fleetManagementDescription'), route: '/tareas-activas' },
                { icon: <Schedule />, title: t('taskScheduling'), description: t('taskSchedulingDescription'), route: '/historial-tareas' },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': { 
                        transform: 'translateY(-10px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                      },
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      position: 'relative',
                      color: 'text.primary',
                    }}
                    onClick={() => handleCardClick(feature.route)}
                  >
                    <CardContent sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      textAlign: 'center',
                      p: { xs: 2, sm: 4 },
                    }}>
                      <Box
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          p: 2,
                          mb: 3,
                          borderRadius: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: { xs: 60, sm: 80 },
                          height: { xs: 60, sm: 80 },
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'rotate(360deg)',
                          },
                        }}
                      >
                        {React.cloneElement(feature.icon, { fontSize: 'large' })}
                      </Box>
                      <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                    <Box 
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        backgroundColor: 'primary.main',
                        transform: 'scaleX(0)',
                        transformOrigin: '50% 100%',
                        transition: 'transform 0.3s ease-in-out',
                        '.MuiCard-root:hover &': {
                          transform: 'scaleX(1)',
                        },
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ 
              mt: 6, 
              textAlign: 'center',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, sm: 2 }
            }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                sx={{ 
                  borderRadius: '50px', 
                  padding: '10px 30px',
                  boxShadow: '0 4px 14px 0 rgba(76, 175, 80, 0.39)',
                  '&:hover': {
                    boxShadow: '0 6px 20px 0 rgba(76, 175, 80, 0.5)',
                  },
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                {t('getStarted')}
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                size="large"
                onClick={handleViewDocumentation}
                sx={{ 
                  borderRadius: '50px', 
                  padding: '10px 30px',
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                {t('viewDocumentation')}
              </Button>
            </Box>
          </Box>
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
