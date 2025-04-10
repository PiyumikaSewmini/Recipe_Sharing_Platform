import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardBody, CardFooter } from '../../common/Card';
import Button from '../../common/Button';
import FavoriteToggleButton from '../../common/FavoriteToggleButton';
import StarRating from './StarRating';


const RecipeCardWrapper = styled(Box)({
  flex: '1 1 280px',
  maxWidth: 'calc(25% - 18px)',
  minWidth: '280px',
  '@media (max-width: 1200px)': {
    maxWidth: 'calc(33.33% - 16px)',
  },
  '@media (max-width: 900px)': {
    maxWidth: 'calc(50% - 12px)',
  },
  '@media (max-width: 600px)': {
    maxWidth: '100%',
  },
});

const RecipeTitle = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 600,
  color: '#21381E',
});

const RecipeDescription = styled(Typography)({
  fontSize: '0.85rem',
  color: '#666',
  marginBottom: '1rem',
  height: '2.5rem',
  overflow: 'hidden',
});

const Rating = styled(Typography)({
  fontSize: '0.8rem',
  fontWeight: 600,
  color: '#21381E',
  marginRight: '4px',
});


export interface CollectionRecipe {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
}

export interface CollectionRecipeCardProps {
  recipe: CollectionRecipe;
  isDarkMode: boolean; 
}


const CollectionRecipeCard: React.FC<CollectionRecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleNavigateToRecipe = () => {
    navigate(`/recipes`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <RecipeCardWrapper>
      <Card
        image={recipe.image}
        imageAlt={recipe.title}
        hoverable={true}
        borderColor="#21381E"
      >
        <CardHeader>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating>{recipe.rating.toFixed(1)}</Rating>
            <StarRating rating={recipe.rating} />
          </Box>
          <FavoriteToggleButton 
            isFavorite={isFavorite} 
            onClick={toggleFavorite} 
            size="small" 
          />
        </CardHeader>
        
        <CardBody>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <RecipeDescription>{recipe.description}</RecipeDescription>
        </CardBody>
        
        <CardFooter>
          <Button 
            onClick={handleNavigateToRecipe} 
            buttonColor="#FFAE10"
            sx={{ minWidth: 'unset', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
          >
            View Full Recipe
          </Button>
        </CardFooter>
      </Card>
    </RecipeCardWrapper>
  );
};

export default CollectionRecipeCard;