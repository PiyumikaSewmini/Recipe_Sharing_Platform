import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const FeatureIcon = styled(Box)({
  backgroundColor: '#FFA726',
  width: 16,
  height: 16,
  marginRight: '12px',
  display: 'inline-block',
});

interface FeatureItemProps {
  text: string;
  fontSize?: string;
}

export const FeatureListItem: React.FC<FeatureItemProps> = ({ text, fontSize = '1.2rem' }) => {
  return (
    <FeatureItem>
      <FeatureIcon />
      <Typography variant="body1" sx={{ color: '#5D4037', fontSize, fontWeight: 'bold' }}>
        {text}
      </Typography>
    </FeatureItem>
  );
};

interface FeatureListProps {
  features: string[];
  fontSize?: string;
}

const FeatureList: React.FC<FeatureListProps> = ({ features, fontSize }) => {
  return (
    <>
      {features.map((feature, index) => (
        <FeatureListItem key={index} text={feature} fontSize={fontSize} />
      ))}
    </>
  );
};

export default FeatureList;