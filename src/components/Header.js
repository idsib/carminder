import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { GitHub, Menu, DarkMode, LightMode, Language } from '@mui/icons-material';
import '@fontsource/inter';

function Header({ mode, toggleColorMode }) {
  const baseTheme = useTheme();
  
  const theme = useMemo(() => createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
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
      ...baseTheme.typography,
      fontFamily: 'Inter, sans-serif',
    },
  }), [baseTheme, mode]);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [anchorElLang, setAnchorElLang] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

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

  const handleLanguageMenuOpen = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorElLang(null);
  };

  const handleSignup = () => {
    navigate('/sign-up');
  };

  const handleCardClick = (route) => {
    navigate(route);
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
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
              style={{ height: 40, marginRight: theme.spacing(2), cursor: 'pointer' }}
              onClick={() => navigate('/')}
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
                  <MenuItem onClick={() => handleCardClick('/tareas-activas')}>{t('fleetManagement')}</MenuItem>
                  <MenuItem onClick={() => handleCardClick('/historial-tareas')}>{t('taskScheduling')}</MenuItem>
                  <MenuItem onClick={() => handleCardClick('/documentation')}>{t('documentation')}</MenuItem>
                  <MenuItem onClick={() => changeLanguage('en')}>EN</MenuItem>
                  <MenuItem onClick={() => changeLanguage('es')}>ES</MenuItem>
                </MuiMenu>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/tareas-activas">{t('fleetManagement')}</Button>
                <Button color="inherit" component={RouterLink} to="/historial-tareas">{t('taskScheduling')}</Button>
                <Button color="inherit" component={RouterLink} to="/docs">{t('documentation')}</Button>
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
    </ThemeProvider>
  );
}

export default Header;