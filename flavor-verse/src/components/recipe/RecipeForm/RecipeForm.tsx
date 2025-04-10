import React, { useState } from 'react';
import { Box, Typography, Input, InputLabel, Paper } from '@mui/material';
import TextField from '../../common/TextField';
import Button from '../../common/Button';
import { Recipe, Step } from '../../../redux/slices/recipeSlice';
import IngredientFields from './IngredientFields';
import StepFields from './StepFields';

interface RecipeFormProps {
  onSubmit: (recipe: Omit<Recipe, 'id' | 'rating' | 'isFavorite' | 'userId'>) => void;
  initialData?: Recipe | null;
  onCancel: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, initialData = null, onCancel }) => {
  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [description, setDescription] = useState<string>(initialData?.description || '');
  const [image, setImage] = useState<string>(initialData?.image || '');
  const [, setImageFile] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<string[]>(initialData?.ingredients || ['']);
  const [steps, setSteps] = useState<Step[]>(initialData?.steps || [{ title: '', instructions: [''] }]);

  // Handle image file upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const recipe: Omit<Recipe, 'id' | 'rating' | 'isFavorite' | 'userId'> = {
      title,
      description,
      image: image || 'https://via.placeholder.com/300x200?text=Food+Image',
      ingredients: ingredients.filter((i: string) => i.trim()),
      steps: steps.map((step: Step) => ({
        title: step.title,
        instructions: step.instructions.filter((i: string) => i.trim()),
      })),
    };
    onSubmit(recipe);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: '900px', mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 3, color: '#2A472A', fontWeight: 'bold', borderBottom: '2px solid #2A472A', pb: 1 }}>
        {initialData ? 'Edit Recipe' : 'Add New Recipe'}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
        {/* Basic Info Section */}
        <Box sx={{ flex: 1 }}>
          <TextField
            label="Recipe Title"
            fullWidth
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 3 }}>
            <InputLabel htmlFor="image-upload" sx={{ mb: 1, color: '#2A472A' }}>Upload Recipe Image</InputLabel>
            <Input
              id="image-upload"
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={handleImageChange}
              sx={{ mb: 1, cursor: 'pointer' }}
            />
           
          </Box>
        </Box>

        {/* Ingredients Section */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f8f8f8', height: '100%' }}>
            <IngredientFields 
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </Paper>
        </Box>
      </Box>

      {/* Steps Section - Full Width */}
      <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8f8f8', borderRadius: '4px' }}>
        <StepFields 
          steps={steps}
          setSteps={setSteps}
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          sx={{ 
            backgroundColor: '#2A472A', 
            '&:hover': { backgroundColor: '#21381E' },
            minWidth: '150px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {initialData ? 'Update Recipe' : 'Add Recipe'}
        </Button>
        <Button 
          variant="outlined" 
          onClick={onCancel}
          sx={{ 
            borderColor: '#2A472A', 
            color: '#fff',
            '&:hover': { 
              borderColor: '#21381E', 
             
            },
            minWidth: '150px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default RecipeForm;