import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Divider,
  Link,
  IconButton,
  useMediaQuery,
  Paper,
  Menu,
  MenuItem,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Alert,
} from '@mui/material';
import { GitHub, Google, DarkMode, LightMode, Language } from '@mui/icons-material';
import MicrosoftIcon from '@mui/icons-material/Window';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import { SvgIcon } from '@mui/material';
import { createClient } from '@supabase/supabase-js';

// Importar la fuente Inter
import '@fontsource/inter';

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

const AnimatedLogo = () => (
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
        top: '-100%',
        left: '-100%',
        right: '-100%',
        bottom: '-100%',
        backgroundImage: 'url("/carminder.png")',
        backgroundSize: '200px 200px',
        opacity: (theme) => theme.palette.mode === 'dark' ? 0.02 : 0.05,
        animation: 'move 5s linear infinite',
        filter: (theme) => theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
      },
      '@keyframes move': {
        '0%': { transform: 'translate(0, 0)' },
        '100%': { transform: 'translate(200px, 200px)' },
      },
    }}
  />
);

// Componente personalizado para el icono de Discord
const DiscordIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.03.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"/>
  </SvgIcon>
);

// Si MicrosoftIcon ya está definido en otra parte, no lo redefinamos aquí
// En su lugar, usemos el MicrosoftIcon existente o creemos uno con un nombre diferente si es necesario
const MicrosoftIconCustom = (props) => (
  <SvgIcon {...props}>
    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
  </SvgIcon>
);

const SignIn = () => {
  const navigate = useNavigate();
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
        typography: {
          fontFamily: 'Inter, Arial, sans-serif',
        },
      }),
    [mode],
  );
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleSocialSignIn = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
      });

      if (error) throw error;

      // El usuario será redirigido a la página de autenticación del proveedor.
      // Después de una autenticación exitosa, Supabase redirigirá al usuario de vuelta a tu aplicación.
    } catch (error) {
      console.error('Error durante el inicio de sesión social:', error.message);
      setError(t('socialSignInError'));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      console.log('Usuario autenticado:', data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error.message);
      setError(t('signInError'));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('colorMode', newMode);
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    handleLanguageMenuClose();
  };

  const handleLogoClick = () => {
    setIsLoading(true);
    const logo = document.querySelector('#carminder-logo');
    logo.style.animation = 'rotate 0.3s linear';
    setTimeout(() => {
      navigate('/');
    }, 800); 
  };

  const socialButtons = [
    { icon: <GitHub />, name: 'GitHub', color: theme.palette.mode === 'dark' ? '#ffffff' : '#333', provider: 'github' },
    { icon: <MicrosoftIconCustom />, name: 'Microsoft', color: '#00A4EF', provider: 'azure' },
    { icon: <Google />, name: 'Google', color: '#DB4437', provider: 'google' },
    { icon: <DiscordIcon />, name: 'Discord', color: '#7289DA', provider: 'discord' },
  ];

  if (isLoading) {
    return <LoadingPage mode={mode} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          bgcolor: 'transparent',
        }}
      >
        <AnimatedLogo />
        <AppBar 
          position="static" 
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
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <img 
                id="carminder-logo"
                src="/carminder.png" 
                alt="CarMinder Logo" 
                style={{ 
                  height: '40px', 
                  marginRight: '10px', 
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                }} 
                onClick={handleLogoClick}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              <Typography variant="h6" component="div">
                
              </Typography>
            </Box>
            <IconButton onClick={toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton onClick={handleLanguageMenuOpen} color="inherit">
              <Language />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleLanguageMenuClose}
            >
              <MenuItem onClick={() => changeLanguage('es')}>{t('ES')}</MenuItem>
              <MenuItem onClick={() => changeLanguage('en')}>{t('EN')}</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 2, flexGrow: 1 }}>
          <Paper elevation={3} sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            bgcolor: 'background.paper',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          }}>
            <img src="/carminder.png" alt="Carminder Logo" style={{ width: '100px', marginBottom: '20px' }} />
            
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              {t('signInWith')}
            </Typography>
            
            {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
              {socialButtons.map((button) => (
                <Grid item xs={6} key={button.name}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={button.icon}
                    sx={{
                      borderColor: button.color,
                      color: button.color,
                      '&:hover': {
                        bgcolor: `${button.color}10`,
                      },
                    }}
                    onClick={() => handleSocialSignIn(button.provider)}
                  >
                    {button.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ width: '100%', mb: 2 }}>{t('or')}</Divider>
            <Typography component="h2" variant="h6">
              {t('usingPassword')}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('emailOrUsername')}
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('password')}
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('signIn')}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={RouterLink} to="/forgot-password" variant="body2">
                    {t('forgotPassword')}
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/register" variant="body2">
                    {t('createAccount')}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
        
        <Footer />
        
        {isLoading && <LoadingPage />}
      </Box>
    </ThemeProvider>
  );
};

export default SignIn;