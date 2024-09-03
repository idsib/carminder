import { DirectionsCar, GitHub, Menu, Schedule, Search } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Menu as MuiMenu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CarTaskManager() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      backgroundImage: 'url(https://source.unsplash.com/random/1920x1080?car)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)' }}>
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
                  <MenuItem onClick={handleClose}>Features</MenuItem>
                  <MenuItem onClick={handleClose}>Docs</MenuItem>
                  <MenuItem onClick={() => changeLanguage('en')}>EN</MenuItem>
                  <MenuItem onClick={() => changeLanguage('es')}>ES</MenuItem>
                </MuiMenu>
              </>
            ) : (
              <>
                <Button color="inherit">Features</Button>
                <Button color="inherit">Docs</Button>
                <Button
                  color="inherit"
                  startIcon={<GitHub />}
                  href="https://github.com/carminder"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Button>
                <Button onClick={() => changeLanguage('en')} color="inherit">
                  EN
                </Button>
                <Button onClick={() => changeLanguage('es')} color="inherit">
                  ES
                </Button>
              </>
            )}
            <Button 
              variant="contained" 
              color="primary"
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

      <Container maxWidth="lg" sx={{ mt: { xs: 8, sm: 12 }, mb: 4 }}>
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: { xs: '20px', sm: '40px' },
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}>
          <Typography variant="h2" component="h1" align="center" gutterBottom fontWeight="bold" sx={{ color: 'primary.main', fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' } }}>
            {t('simplifyMaintenance')}
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}>
            {t('manageTasks')}
          </Typography>

          <Box sx={{ mt: 4, mb: 6, display: 'flex', justifyContent: 'center' }}>
            <TextField
              variant="outlined"
              placeholder={t('')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                width: '100%', 
                maxWidth: 600,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            />
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {[
              { icon: <DirectionsCar />, title: t('fleetManagement'), description: t('fleetManagementDescription') },
              { icon: <Schedule />, title: t('taskScheduling'), description: t('taskSchedulingDescription') },
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
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
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
                    <Button 
                      variant="outlined" 
                      color="primary"
                      sx={{ 
                        mt: 3,
                        borderRadius: '50px',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                        },
                      }}
                    >
                      {t('learnMore')}
                    </Button>
                  </CardContent>
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '5px',
                      backgroundColor: 'primary.main',
                      transform: 'scaleX(0)',
                      transformOrigin: '0 0',
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

          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              sx={{ 
                mr: 2, 
                borderRadius: '50px', 
                padding: '10px 30px',
                boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
              }}
            >
              {t('getStarted')}
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              sx={{ 
                borderRadius: '50px', 
                padding: '10px 30px',
              }}
            >
              {t('viewDocumentation')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
