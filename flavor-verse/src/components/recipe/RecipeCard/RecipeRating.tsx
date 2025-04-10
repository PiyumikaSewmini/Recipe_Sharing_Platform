import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface RecipeRatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

const RecipeRating: React.FC<RecipeRatingProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconButton
          key={star}
          size="small"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(null)}
          sx={{ p: 0, mr: 0.5 }}
        >
          <StarIcon
            sx={{
              color: star <= (hoverRating || rating) ? '#FFB400' : '#ccc',
              fontSize: '1.2rem',
            }}
          />
        </IconButton>
      ))}
      <Typography variant="body2" sx={{ ml: 0.5, color: '#666' }}>
        ({rating})
      </Typography>
    </Box>
  );
};

export default RecipeRating;