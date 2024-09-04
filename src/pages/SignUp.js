import React, { useState, useMemo, useEffect } from 'react';
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
} from '@mui/material';
import { GitHub, Google, DarkMode, LightMode, Language } from '@mui/icons-material';
import MicrosoftIcon from '@mui/icons-material/Window';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

const InteractiveBackground = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      overflow: 'hidden',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(76,175,80,0.2) 0%, rgba(76,175,80,0) 70%)',
        animation: 'rotate 20s linear infinite',
      },
      '&::after': {
        animationDelay: '-10s',
      },
      '@keyframes rotate': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    }}
  />
);

const AnimatedLogo = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      opacity: 0.05,
      backgroundImage: 'url("/carminder.png")',
      backgroundSize: '200px',
      backgroundRepeat: 'repeat',
      animation: 'float 20s linear infinite',
      '@keyframes float': {
        '0%': { backgroundPosition: '0 0' },
        '100%': { backgroundPosition: '200px 200px' },
      },
    }}
  />
);

const SignUp = () => {
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
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Registro con:', email, password);
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

  const socialButtons = [
    { icon: 'D', name: 'Discord', color: '#7289DA' },
    { icon: <GitHub />, name: 'GitHub', color: theme.palette.mode === 'dark' ? '#ffffff' : '#333' },
    { icon: <MicrosoftIcon />, name: 'Microsoft', color: '#00A4EF' },
    { icon: <Google />, name: 'Google', color: '#DB4437' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          color: 'text.primary',
          position: 'relative',
        }}
      >
        <InteractiveBackground />
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
              <img src="/carminder.png" alt="CarMinder Logo" style={{ height: '40px', marginRight: '10px' }} />
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
            
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
              {socialButtons.map((button) => (
                <Grid item xs={6} key={button.name}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={typeof button.icon === 'string' ? null : button.icon}
                    sx={{
                      borderColor: button.color,
                      color: button.color,
                      '&:hover': {
                        bgcolor: `${button.color}10`,
                      },
                    }}
                  >
                    {typeof button.icon === 'string' && (
                      <span style={{ marginRight: '8px', fontWeight: 'bold' }}>{button.icon}</span>
                    )}
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
                  <Link href="#" variant="body2">
                    {t('forgotPassword')}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {t('createAccount')}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;