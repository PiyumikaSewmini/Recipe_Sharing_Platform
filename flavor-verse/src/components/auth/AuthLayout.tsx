import React, { useEffect } from 'react';
import { Box, Paper, styled, Snackbar, Alert } from '@mui/material';
import backgroundImage from '../../assets/Signup_login_bg.jpg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearError } from '../../redux/slices/authSlice';

const StyledPaper = styled(Paper)({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  borderRadius: 0,
});

const ContentBox = styled(Box)({
  display: 'flex',
  width: '85%',
  maxWidth: '1300px',
  height: 'auto',
  gap: '40px',
});

interface AuthLayoutProps {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ leftColumn, rightColumn }) => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.auth);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  useEffect(() => {
   
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    dispatch(clearError());
  };

 
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .MuiOutlinedInput-input {
        background-color: white !important;
        color: black !important;
      }
      .MuiOutlinedInput-root {
        background-color: white !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <StyledPaper>
      <ContentBox>
        {/* Left column */}
        <Box sx={{ 
          flex: '1 1 60%',
          pl: 6,
          pr: 4, 
          display: { xs: 'none', md: 'block' }
        }}>
          {leftColumn}
        </Box>

        {/* Right column */}
        <Box sx={{ 
          flex: { xs: '1 1 100%', md: '1 1 40%' },
          display: 'flex',
          justifyContent: 'center',
        }}>
          {rightColumn}
        </Box>
      </ContentBox>
      
     
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </StyledPaper>
  );
};

export default AuthLayout;