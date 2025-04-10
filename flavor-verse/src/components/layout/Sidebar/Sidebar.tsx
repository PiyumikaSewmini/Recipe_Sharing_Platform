import React from 'react';
import { Box, Drawer, Typography, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logout } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Button from '../../common/Button';
import ProfileSection from './ProfileSection';
import SettingsSection from './SettingsSection';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 300,
    backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#D9D9D9',
    borderRight: `2px solid ${theme.palette.mode === 'dark' ? '#ffffff' : '#2a472a'}`,
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#2a472a',
    padding: '24px',
    boxSizing: 'border-box',
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
  },
}));

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.auth.user);
  const { mode, toggleTheme } = useTheme();
  const isDarkMode = mode === 'dark';

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate('/login');
  };

  return (
    <StyledDrawer anchor="left" open={open} onClose={onClose}>
      {user && (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold', 
              color: isDarkMode ? '#ffffff' : '#2a472a',
              fontSize: '1.5rem',
              textAlign: 'center'
            }}
          >
            User Profile
          </Typography>

          <ProfileSection user={user} isDarkMode={isDarkMode} />
          <SettingsSection isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} />

          <Button
            onClick={handleLogout}
            buttonColor="#F3A712"
            sx={{ 
              mt: 'auto',
              width: '100%',
              minWidth: '100%',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: '#D99610',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </StyledDrawer>
  );
};

export default Sidebar;