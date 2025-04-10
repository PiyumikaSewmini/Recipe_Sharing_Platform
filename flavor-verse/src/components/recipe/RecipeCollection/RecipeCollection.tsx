import React from 'react';
import { Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import CollectionRecipeCard from './CollectionRecipeCard';
import SectionHeading from './SectionHeading';
import { recipeData } from './recipeData';
import { useTheme } from '../../../contexts/ThemeContext';

interface ThemedContainerProps {
  isdarkmode: boolean;
}


const SectionContainer = styled(Box)<ThemedContainerProps>(({ isdarkmode }) => ({
  padding: '4rem 3rem',
  backgroundColor: isdarkmode ? '#333333' : '#fff',
  width: '100%',
  transition: 'background-color 0.3s ease',
}));

const RecipeCardContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '24px',
  justifyContent: 'center',
});

interface ExploreButtonProps {
  isdarkmode: boolean;
  theme?: any; 
}

const ExploreMoreButton = styled(Button)<ExploreButtonProps>(({ isdarkmode }) => ({
  minWidth: 'unset',
  backgroundColor: 'transparent',
  color: isdarkmode ? '#4CAF50' : '#21381E',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'transparent',
    color: isdarkmode ? '#63CF67' : '#21381E',
  },
  transition: 'color 0.3s ease',
}));

const RecipeCollection: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleNavigateToRecipes = () => {
    navigate('/recipes');
  };

  return (
    <SectionContainer isdarkmode={isDarkMode}>
      <SectionHeading 
        title="Our Best Recipe Collection"
        subtitle="Discover our top-rated, crowd-favorite recipes — made with love and perfect for any occasion."
        isDarkMode={isDarkMode}
      />
      
      <RecipeCardContainer>
        {recipeData.map((recipe) => (
          <CollectionRecipeCard 
            key={recipe.id} 
            recipe={recipe}
            isDarkMode={isDarkMode}
          />
        ))}
      </RecipeCardContainer>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <ExploreMoreButton 
          endIcon={<span>→</span>} 
          onClick={handleNavigateToRecipes}
          isdarkmode={isDarkMode}
        >
          Explore more recipes
        </ExploreMoreButton>
      </Box>
    </SectionContainer>
  );
};

export default RecipeCollection;