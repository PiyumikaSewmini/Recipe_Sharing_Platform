import React from 'react';
import { Box, Typography } from '@mui/material';
import { getImagePath } from '../../../utils/imageHelper';

interface RecipeIngredientsProps {
  image: string;
  title: string;
  ingredients: string[];
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({ image, title, ingredients }) => {
  return (
    <Box sx={{ width: { xs: '100%', md: '40%' }, p: 4, backgroundColor: '#f9f9f9' }}>
      <Box
        component="img"
        sx={{ width: '100%', borderRadius: '12px', mb: 3, maxHeight: '350px', objectFit: 'cover', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
        src={getImagePath(image)}
        alt={title}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x350?text=Food+Image';
        }}
      />

      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#2a472a', borderBottom: '2px solid #f3a712', pb: 1 }}>
        Ingredients
      </Typography>

      <Box>
        {ingredients.map((ingredient: string, index: number) => (
          <Box key={index} sx={{ display: 'flex', mb: 1.5, alignItems: 'flex-start' }}>
            <Box sx={{ width: 10, height: 10, mt: 1, borderRadius: '50%', backgroundColor: '#f3a712', flexShrink: 0, mr: 2 }} />
            <Typography variant="body1" sx={{ color: '#333' }}>{ingredient}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecipeIngredients;