import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  isDarkMode: boolean;
  themeColors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    cardBg: string;
    border: string;
  };
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
  isDarkMode: false,
  themeColors: {
    primary: '#2E5D32',
    secondary: '#FFA726',
    background: '#D9D9D9',
    text: '#2a472a',
    cardBg: '#ffffff',
    border: '#2a472a'
  }
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const getInitialMode = (): ThemeMode => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'dark' || savedMode === 'light') {
      return savedMode;
    }
   
    return 'light';
  };

  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  const themeColors = useMemo(() => {
    return mode === 'dark' 
      ? {
          primary: '#4CAF50',
          secondary: '#FFB74D',
          background: '#121212',
          text: '#ffffff',
          cardBg: '#1E1E1E',
          border: '#555555'
        }
      : {
          primary: '#2E5D32',
          secondary: '#FFA726',
          background: '#F5F5F5',
          text: '#2a472a',
          cardBg: '#ffffff',
          border: '#2a472a'
        };
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  useEffect(() => {
   
    document.documentElement.style.setProperty('--primary-bg', themeColors.background);
    document.documentElement.style.setProperty('--primary-text', themeColors.text);
    document.documentElement.style.setProperty('--card-bg', themeColors.cardBg);
    document.documentElement.style.setProperty('--border-color', themeColors.border);
    
    
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    
    document.body.style.backgroundColor = themeColors.background;
    document.body.style.color = themeColors.text;
  }, [themeColors, mode]);

  const value = useMemo(() => ({
    mode,
    toggleTheme,
    isDarkMode: mode === 'dark',
    themeColors
  }), [mode, themeColors]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};