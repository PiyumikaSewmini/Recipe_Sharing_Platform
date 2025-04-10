import React from 'react';
import { Box, IconButton, Button, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface RecipeActionsProps {
  isFavorite: boolean;
  isOwner: boolean;
  onToggleFavorite: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onViewRecipe: () => void;
  alwaysShowColors?: boolean;
}

const RecipeActions: React.FC<RecipeActionsProps> = ({
  isFavorite,
  isOwner,
  onToggleFavorite,
  onEdit,
  onDelete,
  onViewRecipe}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      position: 'relative',
      mt: 1,
      pt: 1.5,
      borderTop: '1px dashed rgba(76, 175, 80, 0.2)'
    }}>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <IconButton
            onClick={onToggleFavorite}
            size="small"
            sx={{ 
              p: 0.5,
              backgroundColor: 'rgba(255, 107, 149, 0.1)',
              border: '1px solid rgba(255, 107, 149, 0.3)',
              transition: 'transform 0.2s, background-color 0.2s',
              '&:hover': { 
                transform: 'scale(1.15)',
                backgroundColor: 'rgba(255, 107, 149, 0.2)',
              }
            }}
          >
            {isFavorite ? 
              <FavoriteIcon sx={{ color: '#FF6B95', fontSize: '1.2rem' }} /> : 
              <FavoriteBorderIcon sx={{ color: '#FF6B95', fontSize: '1.2rem' }} />
            }
          </IconButton>
        </Tooltip>
        
        {isOwner && (
          <>
            <Tooltip title="Edit recipe">
              <IconButton 
                onClick={onEdit} 
                size="small" 
                sx={{ 
                  p: 0.5, 
                  color: '#4CAF50',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  transition: 'transform 0.2s, background-color 0.2s',
                  '&:hover': { 
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    transform: 'scale(1.15)'
                  }
                }}
              >
                <EditIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Delete recipe">
              <IconButton 
                onClick={onDelete} 
                size="small" 
                sx={{ 
                  p: 0.5, 
                  color: '#F44336',
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.3)',
                  transition: 'transform 0.2s, background-color 0.2s',
                  '&:hover': { 
                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    transform: 'scale(1.15)'
                  }
                }}
              >
                <DeleteIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>

      <Button
        variant="contained"
        size="small"
        startIcon={<VisibilityIcon sx={{ fontSize: '0.9rem' }} />}
        onClick={onViewRecipe}
        sx={{
          backgroundColor: '#F3A712',
          borderRadius: '20px',
          textTransform: 'none',
          padding: '4px 14px',
          fontSize: '0.75rem',
          fontWeight: '600',
          letterSpacing: '0.02em',
          border: '1px solid #E09000',
          boxShadow: '0 2px 8px rgba(243, 167, 18, 0.3)',
          '&:hover': { 
            backgroundColor: '#E09000',
            boxShadow: '0 4px 12px rgba(243, 167, 18, 0.4)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        View recipe
      </Button>
    </Box>
  );
};

export default RecipeActions;