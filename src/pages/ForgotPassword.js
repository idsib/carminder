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
  Link,
  IconButton,
  useMediaQuery,
  Paper,
  Menu,
  MenuItem,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import { DarkMode, LightMode, Language, Email } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import { createClient } from '@supabase/supabase-js';

// Inicializar el cliente de Supabase
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

const ForgotPassword = () => {
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setMessage({ type: 'success', content: t('resetLinkSent') });
    } catch (error) {
      console.error('Error al enviar el enlace de restablecimiento:', error.message);
      setMessage({ type: 'error', content: t('resetLinkError') });
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
              {t('resetPassword')}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
              {t('enterEmailForReset')}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('email')}
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Email color="action" sx={{ mr: 1 }} />
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('sendResetLink')}
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link component={RouterLink} to="/sign-in" variant="body2">
                    {t('backToLogin')}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
        
        <Footer />
        
        {isLoading && <LoadingPage />}
        
        {message.content && (
          <Alert severity={message.type} sx={{ mt: 2, width: '100%' }}>
            {message.content}
          </Alert>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPassword;