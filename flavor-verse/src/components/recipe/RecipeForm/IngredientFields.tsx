import React from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '../../common/TextField';
import Button from '../../common/Button';

interface IngredientFieldsProps {
  ingredients: string[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

const IngredientFields: React.FC<IngredientFieldsProps> = ({ ingredients, setIngredients }) => {
  const handleAddIngredient = () => setIngredients([...ingredients, '']);
  
  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };
  
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#f8f8f8', borderRadius: '4px' }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#2A472A', fontWeight: 600 }}>
        Ingredients
      </Typography>
      
      {ingredients.map((ingredient: string, index: number) => (
        <Box key={index} sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
          <TextField
            placeholder={`Ingredient ${index + 1}`}
            fullWidth
            value={ingredient}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIngredientChange(index, e.target.value)}
          />
          <Tooltip title="Remove ingredient">
            <span>
              <IconButton 
                onClick={() => handleRemoveIngredient(index)} 
                disabled={ingredients.length === 1}
                size="small"
                sx={{ 
                  ml: 1, 
                  color: '#d32f2f', 
                  cursor: 'pointer',
                  '&.Mui-disabled': { 
                    color: 'rgba(0, 0, 0, 0.26)' 
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.04)'
                  }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      ))}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button 
          startIcon={<AddIcon />} 
          onClick={handleAddIngredient} 
          size="small"
          variant="contained"
          sx={{ 
            backgroundColor: '#2A472A', 
            color: 'white',
            cursor: 'pointer',
            '&:hover': { 
              backgroundColor: '#21381E' 
            },
            minWidth: 'auto',
            fontSize: '0.75rem',
            padding: '4px 10px'
          }}
        >
          Add Ingredient
        </Button>
        
        <Button 
          variant="outlined" 
          size="small"
          sx={{ 
            borderColor: '#2A472A', 
            backgroundColor: 'rgba(42, 71, 42, 0.05)',
            color: '#2A472A', 
            cursor: 'pointer',
            '&:hover': { 
              borderColor: '#21381E', 
             
            },
            fontSize: '0.75rem',
            padding: '4px 10px'
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default IngredientFields;