import React from 'react';
import { Box, styled } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const StarContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  onRatingChange,
  size = 16 
}) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

 
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <StarIcon 
        key={`full-${i}`} 
        sx={{ 
          color: '#FFAE10', 
          fontSize: `${size}px`,
          cursor: onRatingChange ? 'pointer' : 'default'
        }} 
        onClick={onRatingChange ? () => onRatingChange(i + 1) : undefined}
      />
    );
  }

  // Half start section
  if (hasHalfStar) {
    stars.push(
      <StarHalfIcon 
        key="half" 
        sx={{ 
          color: '#FFAE10', 
          fontSize: `${size}px`,
          cursor: onRatingChange ? 'pointer' : 'default'
        }} 
        onClick={onRatingChange ? () => onRatingChange(fullStars + 0.5) : undefined}
      />
    );
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <StarOutlineIcon 
        key={`empty-${i}`} 
        sx={{ 
          color: '#FFAE10', 
          fontSize: `${size}px`,
          cursor: onRatingChange ? 'pointer' : 'default'
        }} 
        onClick={onRatingChange ? () => onRatingChange(fullStars + (hasHalfStar ? 1 : 0) + i + 1) : undefined}
      />
    );
  }

  return <StarContainer>{stars}</StarContainer>;
};

export default StarRating;
