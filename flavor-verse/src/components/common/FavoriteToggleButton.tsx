import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface FavoriteToggleButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
}

const FavoriteToggleButton: React.FC<FavoriteToggleButtonProps> = ({ 
  isFavorite, 
  onClick, 
  size = 'medium' 
}) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: 45,
        height: 45,
        borderRadius: '15px',
        border: '2px solid #2A472A',
        backgroundColor: isFavorite ? '#2A472A' : 'white',
        '&:hover': { 
          backgroundColor: isFavorite ? '#1E351E' : 'rgba(0, 0, 0, 0.05)' 
        },
      }}
    >
      {isFavorite ? (
        <FavoriteIcon sx={{ 
          fontSize: size === 'small' ? '1rem' : size === 'large' ? '1.5rem' : '1.2rem', 
          color: 'white' 
        }} />
      ) : (
        <FavoriteBorderIcon sx={{ 
          fontSize: size === 'small' ? '1rem' : size === 'large' ? '1.5rem' : '1.2rem', 
          color: '#2A472A' 
        }} />
      )}
    </IconButton>
  );
};

export default FavoriteToggleButton;