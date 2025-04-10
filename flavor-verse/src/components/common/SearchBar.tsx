import React from 'react';
import { TextField, InputAdornment, SxProps, Theme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../../contexts/ThemeContext';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: number | string;
  sx?: SxProps<Theme>;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Search', 
  width = 500,
  sx = {}
}) => {
  const muiTheme = useMuiTheme();
  const { isDarkMode, themeColors } = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  
  return (
    <TextField
      placeholder={placeholder}
      variant="outlined"
      value={value}
      onChange={onChange}
      fullWidth={isMobile}
      sx={{
        width: isMobile ? '100%' : width,
        height: 45,
        backgroundColor: isDarkMode ? '#333333' : 'white',
        border: `2px solid ${isDarkMode ? themeColors.primary : '#2A472A'}`,
        borderRadius: '10px',
        '& .MuiOutlinedInput-root': { 
          height: '100%', 
          borderRadius: '10px', 
          padding: '0 10px',
          color: isDarkMode ? '#ffffff' : 'inherit',
        },
        '& .MuiInputBase-input': { 
          padding: '6px 0',
          '&::placeholder': {
            color: isDarkMode ? '#aaaaaa' : 'rgba(0, 0, 0, 0.6)',
            opacity: 1,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
        },
        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
          color: isDarkMode ? themeColors.primary : '#2A472A',
        },
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        ...sx,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ 
              fontSize: '1.2rem',
              transition: 'color 0.3s ease',
            }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;