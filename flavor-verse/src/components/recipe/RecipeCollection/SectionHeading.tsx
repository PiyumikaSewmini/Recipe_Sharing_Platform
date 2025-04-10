import React from 'react';
import { Typography, styled } from '@mui/material';

interface ThemedTypographyProps {
  isdarkmode: boolean;
}

const SectionTitle = styled(Typography)<ThemedTypographyProps>(({ isdarkmode }) => ({
  fontSize: '2.2rem',
  fontWeight: 700,
  marginBottom: '1rem',
  fontFamily: '"Righteous", cursive',
  color: isdarkmode ? '#ffffff' : '#21381E', 
  textAlign: 'center',
  transition: 'color 0.3s ease',
}));

const SectionSubtitle = styled(Typography)<ThemedTypographyProps>(({ isdarkmode }) => ({
  fontSize: '1rem',
  marginBottom: '3rem',
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto 3rem auto',
  color: isdarkmode ? '#e0e0e0' : '#666', 
  transition: 'color 0.3s ease',
}));

export interface SectionHeadingProps {
  title: string;
  subtitle: string;
  isDarkMode: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, isDarkMode }) => {
  return (
    <>
      <SectionTitle isdarkmode={isDarkMode}>{title}</SectionTitle>
      <SectionSubtitle isdarkmode={isDarkMode}>{subtitle}</SectionSubtitle>
    </>
  );
};

export default SectionHeading;