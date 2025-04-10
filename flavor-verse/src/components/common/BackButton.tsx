import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BackButtonProps {
  onClick: () => void;
  title?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, title }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <IconButton onClick={onClick} sx={{ mr: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      {title && (
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default BackButton;