import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import Footer from './components/layout/Footer';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import { checkAuth } from './redux/slices/authSlice';
import ProtectedRoute from './components/AuthProtectedRouting';
import { Box } from '@mui/material';

// Layout component that conditionally renders Navbar and Footer
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
      {!isAuthPage && <Footer />}
    </Box>
  );
};

const ThemedApp: React.FC = () => {
  const { mode, themeColors } = useTheme();
  
  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'dark' ? '#4CAF50' : '#2E5D32',
      },
      secondary: {
        main: mode === 'dark' ? '#FFB74D' : '#FFA726',
      },
      background: {
        default: themeColors.background,
        paper: themeColors.cardBg,
      },
      text: {
        primary: themeColors.text,
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: themeColors.background,
            color: themeColors.text,
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/recipes" element={
            <ProtectedRoute>
              <RecipesPage />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Layout>
    </MuiThemeProvider>
  );
};

const AppContent: React.FC = () => {
  const dispatch = store.dispatch;

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <ThemedApp />
      </BrowserRouter>
    </CustomThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;