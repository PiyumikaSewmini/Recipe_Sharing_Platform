import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import { checkAuth } from './redux/slices/authSlice';
import ProtectedRoute from './components/AuthProtectedRouting';


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