import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Card, CardContent, Typography, useMediaQuery, useTheme } from '@mui/material';
import { toggleFavorite, updateRating } from '../../../redux/slices/recipeSlice';
import { Recipe } from '../../../redux/slices/recipeSlice';
import RecipeImage from './RecipeImage';
import RecipeRating from './RecipeRating';
import RecipeActions from './RecipeActions';

interface RecipeCardProps {
  recipe: Recipe;
  onViewRecipe: () => void;
  onEdit: () => void;
  onDelete: () => void;
  currentUserId?: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onViewRecipe, 
  onEdit, 
  onDelete,
  currentUserId = 1 
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRatingClick = (newRating: number) => {
    dispatch(updateRating({ id: recipe.id, rating: newRating }));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe.id));
  };

  return (
    <Card
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 24px rgba(42, 71, 42, 0.12)',
        border: '2px solid #4CAF50',
        outline: '1px solid rgba(76, 175, 80, 0.3)',
        outlineOffset: '-5px',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 16px 32px rgba(42, 71, 42, 0.16)',
          border: '2px solid #2E7D32',
        }
      }}
    >
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '8px', 
        background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
      }} />

      <RecipeImage 
        image={recipe.image} 
        title={recipe.title} 
      />

      <CardContent sx={{ 
        flexGrow: 1, 
        p: isMobile ? 2 : 2.5, 
        backgroundColor: 'white', 
        position: 'relative',
        '&:last-child': { pb: isMobile ? 2 : 2.5 },
        borderTop: '1px solid rgba(0,0,0,0.03)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          mb: 1.5,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 0
        }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: '600', 
              fontSize: isMobile ? '0.85rem' : '0.9rem', 
              lineHeight: 1.3,
              color: '#1E381E',
              flexGrow: 1,
              mr: 1,
              fontFamily: '"Poppins", "Roboto", "Helvetica", sans-serif',
              letterSpacing: '0.02em'
            }}
          >
            {recipe.title}
          </Typography>

          <RecipeRating 
            rating={recipe.rating} 
            onRatingChange={handleRatingClick} 
          />
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 3, 
            fontSize: '0.75rem', 
            height: '2.4rem', 
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
            color: '#5F7161',
            lineHeight: 1.5,
            fontFamily: '"Roboto", "Helvetica", sans-serif',
          }}
        >
          {recipe.description}
        </Typography>

        <RecipeActions
          isFavorite={recipe.isFavorite}
          isOwner={recipe.userId === currentUserId}
          onToggleFavorite={handleToggleFavorite}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewRecipe={onViewRecipe}
          alwaysShowColors={true}
        />
      </CardContent>
    </Card>
  );
};

export default RecipeCard;