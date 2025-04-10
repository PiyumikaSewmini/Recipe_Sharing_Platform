import React from 'react';
import { Box } from '@mui/material';
import RecipeCard from '../recipe/RecipeCard/RecipeCard';
import { Recipe } from '../../redux/slices/recipeSlice';

interface RecipeListProps {
  recipes: Recipe[];
  onViewRecipe: (id: number) => void;
  onEditRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (id: number) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  onViewRecipe,
  onEditRecipe,
  onDeleteRecipe,
}) => {
  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: 3, 
      width: '100%'
    }}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onViewRecipe={() => onViewRecipe(recipe.id)}
          onEdit={() => onEditRecipe(recipe)}
          onDelete={() => onDeleteRecipe(recipe.id)}
        />
      ))}
    </Box>
  );
};

export default RecipeList;