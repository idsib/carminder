import React, { useState, useMemo, useEffect } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  createTheme,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import {
  Menu as MenuIcon,
  DarkMode,
  LightMode,
  Language,
  Dashboard as DashboardIcon,
  DirectionsCar,
  Schedule,
  Settings,
  Logout,
  Notifications,
  Inventory,
  Person,
  MoreVert,
  BarChart,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Footer from '../components/Footer';
import { MovingBackground } from './Inicio';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

const MotionCard = motion(Card);

const cardVariants = {
  initial: { scale: 0.9, opacity: 0, y: 50 },
  animate: { scale: 1, opacity: 1, y: 0 },
  hover: { scale: 1.05, boxShadow: '0px 5px 15px rgba(0,0,0,0.1)' },
  tap: { scale: 0.95 },
};

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [mode, setMode] = useState(() => localStorage.getItem('colorMode') || 'light');
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElMore, setAnchorElMore] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [anchorElMobileMenu, setAnchorElMobileMenu] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        navigate('/sign-in');
      }
    };

    checkUser();
  }, [navigate]);

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('colorMode', newMode);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenMoreMenu = (event) => {
    setAnchorElMore(event.currentTarget);
  };

  const handleCloseMoreMenu = () => {
    setAnchorElMore(null);
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorElLang(null);
  };

  const handleMobileMenuOpen = (event) => {
    setAnchorElMobileMenu(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorElMobileMenu(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    handleLanguageMenuClose();
    handleCloseMoreMenu();
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  };

  const menuItems = [
    { icon: <DashboardIcon />, text: t('Dashboard'), onClick: () => navigate('/dashboard') },
    { icon: <DirectionsCar />, text: t('Gestión de Vehículos'), onClick: () => navigate('/gestion-vehiculos') },
    { icon: <Inventory />, text: t('Inventario'), onClick: () => navigate('/inventario') },
    { icon: <Schedule />, text: t('Tareas'), onClick: () => navigate('/tasks') },
  ];

  const customTheme = useMemo(
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

  const cardItems = [
    { icon: <DirectionsCar fontSize="large" />, title: t('Vehículos'), description: t('Gestiona tus vehículos y su mantenimiento'), link: '/gestion-vehiculos' },
    { icon: <Schedule fontSize="large" />, title: t('Tareas Pendientes'), description: t('Revisa y completa tus tareas de mantenimiento'), link: '/tasks' },
    { icon: <BarChart fontSize="large" />, title: t('Estadísticas'), description: t('Visualiza el rendimiento de tus vehículos'), link: '/statistics' },
  ];

  const lineChartData = [
    { name: 'Ene', km: 1000 },
    { name: 'Feb', km: 1500 },
    { name: 'Mar', km: 2000 },
    { name: 'Abr', km: 1800 },
    { name: 'May', km: 2200 },
    { name: 'Jun', km: 2500 },
  ];

  const pieChartData = [
    { name: 'Combustible', value: 400 },
    { name: 'Mantenimiento', value: 300 },
    { name: 'Seguros', value: 200 },
    { name: 'Otros', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/sign-in');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
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
              bgcolor: customTheme.palette.mode === 'dark' 
                ? 'rgba(18, 18, 18, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)',
              zIndex: -1,
            },
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                onClick={() => navigate('/dashboard')}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carminder-bZFEVGRBpyi8WS2AfdnDvVepJGPvuv.png"
                  alt="CarMinder Logo"
                  style={{ height: 40, marginRight: customTheme.spacing(2) }}
                />
              </Box>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open menu"
                  edge="start"
                  onClick={handleMobileMenuOpen}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                {menuItems.map((item) => (
                  <Tooltip key={item.text} title={item.text} arrow>
                    <IconButton
                      color="inherit"
                      onClick={item.onClick}
                      sx={{ 
                        mx: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {!isMobile && (
                <>
                  <IconButton color="inherit" sx={{ mx: 0.5 }}>
                    <Notifications />
                  </IconButton>
                  <Tooltip title={t('Cambiar idioma')}>
                    <IconButton onClick={handleLanguageMenuOpen} color="inherit" sx={{ mx: 0.5 }}>
                      <Language />
                    </IconButton>
                  </Tooltip>
                  <IconButton onClick={toggleColorMode} color="inherit" sx={{ mx: 0.5 }}>
                    {customTheme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
                  </IconButton>
                </>
              )}
              {isMobile && (
                <IconButton color="inherit" onClick={handleOpenMoreMenu} sx={{ mx: 0.5 }}>
                  <MoreVert />
                </IconButton>
              )}
              <Tooltip title={t('Ajustes de usuario')}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                  <Avatar alt="User Avatar" src="/path-to-avatar.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Menú móvil */}
        <Menu
          anchorEl={anchorElMobileMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElMobileMenu)}
          onClose={handleMobileMenuClose}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.text} onClick={() => { item.onClick(); handleMobileMenuClose(); }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </MenuItem>
          ))}
        </Menu>

        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t('Perfil')} />
          </MenuItem>
          <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/settings'); }}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t('Ajustes')} />
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => { handleCloseUserMenu(); handleLogout(); }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t('Cerrar Sesión')} />
          </MenuItem>
        </Menu>

        {/* Menú de más opciones (móvil) */}
        <Menu
          anchorEl={anchorElMore}
          open={Boolean(anchorElMore)}
          onClose={handleCloseMoreMenu}
        >
          <MenuItem onClick={() => { handleCloseMoreMenu(); }}>
            <ListItemIcon>
              <Notifications fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t('Notificaciones')} />
          </MenuItem>
          <MenuItem onClick={() => { 
            toggleLanguage();
            handleCloseMoreMenu();
          }}>
            <ListItemIcon>
              <Language fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={i18n.language.toUpperCase()} />
          </MenuItem>
          <MenuItem onClick={() => { handleCloseMoreMenu(); toggleColorMode(); }}>
            <ListItemIcon>
              {customTheme.palette.mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
            </ListItemIcon>
            <ListItemText primary={t('Cambiar tema')} />
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={anchorElLang}
          open={Boolean(anchorElLang)}
          onClose={handleLanguageMenuClose}
        >
          <MenuItem onClick={() => changeLanguage('es')}>{t('ES')}</MenuItem>
          <MenuItem onClick={() => changeLanguage('en')}>{t('EN')}</MenuItem>
        </Menu>

        {/* Contenido principal del Dashboard */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('Bienvenido de nuevo')}, {user?.email}
          </Typography>
          <Grid container spacing={3}>
            {cardItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <MotionCard
                  component={Link}
                  to={item.link}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ type: 'spring', stiffness: 300 }}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h5" component="div" gutterBottom align="center">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {item.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>

          {/* Gráficos */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            {t('Estadísticas')}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {t('Kilómetros recorridos')}
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="km" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {t('Distribución de gastos')}
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>

          {/* Widgets de tareas pendientes */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            {t('Pending Tasks')}
          </Typography>
          <Grid container spacing={3}>
            {[
              { title: t('Oil Change'), vehicle: 'Toyota Corolla', dueDate: '2023-06-15' },
              { title: t('Tire Rotation'), vehicle: 'Honda Civic', dueDate: '2023-06-20' },
              { title: t('Brake Inspection'), vehicle: 'Ford Mustang', dueDate: '2023-06-25' },
            ].map((task, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }
                }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('Vehicle')}: {task.vehicle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('Due Date')}: {task.dueDate}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button variant="contained" color="primary" fullWidth>
                      {t('Complete Task')}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}