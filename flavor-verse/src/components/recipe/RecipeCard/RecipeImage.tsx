import React from 'react';
import { Box, CardMedia } from '@mui/material';
import { getImagePath } from '../../../utils/imageHelper';

interface RecipeImageProps {
  image: string;
  title: string;
}

const RecipeImage: React.FC<RecipeImageProps> = ({ image, title }) => {
  return (
    <Box sx={{ position: 'relative', paddingTop: '65%' }}>
      <CardMedia
        component="img"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        image={getImagePath(image)}
        alt={title}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Food+Image';
        }}
      />
    </Box>
  );
};

export default RecipeImage;