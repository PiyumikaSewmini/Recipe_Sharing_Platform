import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  styled, 
  Avatar, 
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar/Sidebar';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#2a472a',
  boxShadow: 'none',
  borderRadius: '30px',
  margin: '15px 20px 0',
  width: 'auto',
});

interface NavLinkProps {
  active: boolean;
}

const NavLinkBase = styled(Typography)<NavLinkProps>(({ active }) => ({
  color: 'white',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  position: 'relative',
  ...(active && {
    '&::after': {
      content: '""',
      position: 'absolute',
      height: '4px',
      width: '4px',
      backgroundColor: 'white',
      borderRadius: '50%',
      bottom: '-6px',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  })
}));

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps & { to: string; children: React.ReactNode; onClick?: () => void }>(
  ({ active, to, children, onClick, ...props }, ref) => (
    <NavLinkBase active={active} onClick={onClick} {...props}>
      <RouterLink to={to} style={{ color: 'inherit', textDecoration: 'none' }} ref={ref}>
        {children}
      </RouterLink>
    </NavLinkBase>
  )
);

interface NavbarProps {
  activeTab?: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab = 'home' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getAvatarLetters = () => {
    if (!user?.username) return '';
    return user.username.slice(0, 2).toUpperCase();
  };

  const handleLogoClick = () => {
    navigate('/home');
    window.location.reload();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleNavLinkClick = (path: string) => {
    // Check if user is logged in before navigating to recipes
    if (path === '/recipes' && !user) {
      navigate('/login', { state: { from: path } });
    } else {
      navigate(path);
    }
    handleMobileMenuClose();
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar sx={{ 
          padding: isMobile ? '0.5rem 1rem' : '0.5rem 2rem', 
          justifyContent: 'space-between'
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              textDecoration: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
            onClick={handleLogoClick}
          >
            FlavorVerse
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '2rem' }}>
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: '1.5rem' }}>
                <NavLink 
                  active={activeTab === 'home'} 
                  to="/home"
                >
                  Home
                </NavLink>
                <NavLink 
                  active={activeTab === 'recipes'} 
                  to="/recipes"
                  onClick={() => {
                    if (!user) {
                      navigate('/login', { state: { from: '/recipes' } });
                    }
                  }}
                >
                  Recipes
                </NavLink>
              </Box>
            )}
            
            {user ? (
              <Avatar
                sx={{
                  bgcolor: '#F3A712',
                  cursor: 'pointer',
                  width: isMobile ? 36 : 40,
                  height: isMobile ? 36 : 40,
                  '&:hover': {
                    bgcolor: '#D99610',
                  }
                }}
                onClick={() => setSidebarOpen(true)}
              >
                {getAvatarLetters()}
              </Avatar>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: '#F3A712',
                  color: 'white',
                  borderRadius: '20px',
                  padding: isMobile ? '0.4rem 1.2rem' : '0.5rem 1.5rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  '&:hover': {
                    backgroundColor: '#D99610',
                  }
                }}
              >
                Login
              </Button>
            )}
            
            {isMobile && (
              <IconButton 
                edge="end" 
                color="inherit" 
                aria-label="menu"
                onClick={handleMobileMenuOpen}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>
      
      {/* Mobile Menu Dropdown */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <MenuItem 
          onClick={() => handleNavLinkClick('/home')}
          sx={{
            color: activeTab === 'home' ? '#2a472a' : 'inherit',
            fontWeight: activeTab === 'home' ? 600 : 400,
            backgroundColor: activeTab === 'home' ? 'rgba(42, 71, 42, 0.1)' : 'transparent'
          }}
        >
          Home
        </MenuItem>
        <MenuItem 
          onClick={() => handleNavLinkClick('/recipes')}
          sx={{
            color: activeTab === 'recipes' ? '#2a472a' : 'inherit',
            fontWeight: activeTab === 'recipes' ? 600 : 400,
            backgroundColor: activeTab === 'recipes' ? 'rgba(42, 71, 42, 0.1)' : 'transparent'
          }}
        >
          Recipes
        </MenuItem>
      </Menu>
      
      {/* Sidebar */}
      {user && (
        <Sidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      )}
    </>
  );
};

export default Navbar;