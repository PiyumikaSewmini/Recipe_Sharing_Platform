import React from 'react';
import { Box } from '@mui/material';
import SearchBar from '../common/SearchBar';
import FavoriteToggleButton from '../common/FavoriteToggleButton';

interface RecipeListControlsProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
}

const RecipeListControls: React.FC<RecipeListControlsProps> = ({
  searchTerm,
  onSearchChange,
  showFavorites,
  onToggleFavorites,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SearchBar 
          value={searchTerm} 
          onChange={onSearchChange} 
          sx={{ mr: 2 }}
        />
        <FavoriteToggleButton 
          isFavorite={showFavorites} 
          onClick={onToggleFavorites} 
        />
      </Box>
    </Box>
  );
};

export default RecipeListControls;