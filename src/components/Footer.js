import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Grid, Link, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
// Importamos la fuente Inter
import '@fontsource/inter';

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(2, 0),
  fontFamily: '"Inter", Arial, sans-serif',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: 'blur(10px)',
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(18, 18, 18, 0.7)' 
      : 'rgba(255, 255, 255, 0.7)',
    zIndex: -1,
  },
}));

const HoverEffectImg = styled('img')({
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  height: '40px',
  width: 'auto',
});

const ModernButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: '20px',
  padding: '6px 12px',
  marginLeft: '8px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: '20px',
  padding: '6px 12px',
  marginLeft: '8px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  color: theme.palette.text.primary,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, #00ff00, #00aa00)',
    opacity: 0,
    zIndex: -1,
  },
  '&:hover::before': {
    animation: 'pulse 1.5s ease-out infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.95)',
      opacity: 0,
    },
    '50%': {
      opacity: 0.5,
    },
    '100%': {
      transform: 'scale(1.05)',
      opacity: 0,
    },
  },
}));

const Footer = () => {
  const { t } = useTranslation();

  return (
    <StyledFooter>
      <Container>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 2, md: 0 } }}>
            <Link href="/" className="footer-logo">
              <HoverEffectImg
                src="/carminder_text.png"
                alt="Carminder Logo"
                className="img-fluid"
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              justifyContent: { xs: 'center', md: 'flex-end' }, 
              alignItems: 'center', 
              gap: 1 
            }}>
              <AnimatedButton
                size="small"
                component={Link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mb: { xs: 1, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
              >
                {t('footer.createdBy')}{' '}
                <Link href="https://github.com/idsib" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ mx: 0.5 }}>@idsib</Link>
                & {' '}
                <Link href="https://github.com/bethayo" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ mx: 0.5 }}>@bethayo</Link>
              </AnimatedButton>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'center', 
                width: { xs: '100%', sm: 'auto' } 
              }}>
                <ModernButton variant="contained" size="small" component={Link} href="https://github.com/idsib/carminder" target="_blank" rel="noopener noreferrer">
                  {t('footer.openSource')}
                </ModernButton>
                <ModernButton variant="contained" size="small" component={Link} href="/features">
                  {t('footer.features')}
                </ModernButton>
                <ModernButton variant="contained" size="small" component={Link} href="/documentation">
                  {t('footer.docs')}
                </ModernButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  );
};

export default Footer;