import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { GitHub, Menu as MenuIcon, DarkMode, LightMode, Language, Description, Home } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';

import '@fontsource/inter';

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

const Docs = () => {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState(() => localStorage.getItem('colorMode') || 'light');
  const theme = React.useMemo(
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
  const [anchorElLang, setAnchorElLang] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

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

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const SpotlightCard = ({ children }) => {
    return (
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.2), transparent 40%)',
            opacity: 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          },
          '&:hover::before': {
            opacity: 1,
          },
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }}
      >
        {children}
      </Box>
    );
  };

  if (isLoading) {
    return <LoadingPage mode={mode} />;
  }

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
        fontFamily: 'Inter, sans-serif',
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
                id="carminder-logo"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carminder-bZFEVGRBpyi8WS2AfdnDvVepJGPvuv.png"
                alt="CarMinder Logo"
                style={{ 
                  height: 40, 
                  marginRight: theme.spacing(2),
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                }}
                onClick={handleLogoClick}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
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
                    <MenuIcon />
                  </IconButton>
                  <Menu
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
                    <MenuItem onClick={handleClose}>{t('Features')}</MenuItem>
                    <MenuItem onClick={handleClose}>{t('Docs')}</MenuItem>
                  </Menu>
                  <IconButton onClick={handleLanguageMenuOpen} color="inherit">
                    <Language />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElLang}
                    open={Boolean(anchorElLang)}
                    onClose={handleLanguageMenuClose}
                  >
                    <MenuItem onClick={() => changeLanguage('es')}>{t('ES')}</MenuItem>
                    <MenuItem onClick={() => changeLanguage('en')}>{t('EN')}</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button color="inherit">{t('Features')}</Button>
                  <Button color="inherit">{t('Docs')}</Button>
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
                  <Menu
                    anchorEl={anchorElLang}
                    open={Boolean(anchorElLang)}
                    onClose={handleLanguageMenuClose}
                  >
                    <MenuItem onClick={() => changeLanguage('es')}>{t('ES')}</MenuItem>
                    <MenuItem onClick={() => changeLanguage('en')}>{t('EN')}</MenuItem>
                  </Menu>
                </>
              )}
              <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ 
          flexGrow: 1,
          mt: 0,
          pt: { xs: '56px', sm: '64px' },
          pb: 4,
          fontFamily: 'Inter, sans-serif',
        }}>
          <Box sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: { xs: '20px', sm: '40px' },
            boxShadow: `0 8px 32px 0 ${theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.37)' : 'rgba(76, 175, 80, 0.37)'}`,
            mt: 4,
          }}>
            <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' } }}>
              {t('Carminder Documentation')}
            </Typography>

            <Typography variant="h4" gutterBottom sx={{ mt: 4, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              {t('What is Carminder?')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('Carminder is an intuitive mobile application designed to help you keep your vehicle in optimal condition. It reminds you when to perform important maintenance tasks, such as oil changes, tire rotations, and scheduled inspections.')}
            </Typography>

            <Typography variant="h4" gutterBottom sx={{ mt: 4, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              {t('Main features')}
            </Typography>
            <Grid container spacing={2}>
              {[
                t('📅 Custom reminders'),
                t('📊 Maintenance history tracking'),
                t('💰 Service cost estimation'),
                t('📍 Nearby workshop locator'),
                t('📸 Vehicle document scanning')
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <SpotlightCard>
                    <Card 
                      sx={{ 
                        height: '100%',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                        },
                        background: 'transparent',
                      }}
                    >
                      <CardContent>
                        <Typography variant="body1">{feature}</Typography>
                      </CardContent>
                    </Card>
                  </SpotlightCard>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h4" gutterBottom sx={{ mt: 4, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              {t('Frequently Asked Questions')}
            </Typography>
            {[
              {
                q: t('How do I set up my vehicle in Carminder?'),
                a: t('Simply open the app, tap on "Add vehicle" and follow the instructions to enter your car\'s make, model, and year.')
              },
              {
                q: t('Can I use Carminder for multiple vehicles?'),
                a: t('Yes! You can add multiple vehicles and manage maintenance for all of them from a single account.')
              },
              {
                q: t('Does Carminder work offline?'),
                a: t('Most basic functions are available offline, but you\'ll need internet access for features like workshop locator and database updates.')
              },
              {
                q: t('How can I get technical support?'),
                a: t('Visit our Support section or send us an email at help@carminder.com.')
              }
            ].map((faq, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {faq.q}
                </Typography>
                <Typography variant="body1" paragraph>
                  {faq.a}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Docs;