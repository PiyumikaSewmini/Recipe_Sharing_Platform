import React from 'react';
import { Box, Typography } from '@mui/material';
import FeatureList from '../common/FeatureList';

interface AuthFeaturesProps {
  title: string;
  subtitle: string;
  description: string;
  featuresHeading: string;
  features: string[];
  featureFontSize?: string;
}

const AuthFeatures: React.FC<AuthFeaturesProps> = ({
  title,
  subtitle,
  description,
  featuresHeading,
  features,
  featureFontSize
}) => {
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            color: '#5D4037', 
            fontWeight: 'bold',
            fontSize: '3.2rem',
            fontFamily: '"Righteous", cursive',
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h3" 
          component="span" 
          sx={{ 
            color: '#5D4037', 
            fontWeight: 'bold',
            fontSize: '3.2rem',
            fontFamily: '"Righteous", cursive',
            display: 'block',
            lineHeight: 1.2,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#5D4037',
          mb: 5,
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}
      >
        {description}
      </Typography>

      <Typography 
        variant="h6" 
        sx={{ 
          color: '#5D4037',
          mb: 4,
          borderBottom: '1px solid rgba(93, 64, 55, 0.2)',
          paddingBottom: '10px',
          fontSize: '1.2rem',
          fontWeight: 700,
        }}
      >
        {featuresHeading}
      </Typography>

      <FeatureList features={features} fontSize={featureFontSize} />
    </>
  );
};

export default AuthFeatures;