import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Button from '../common/Button';
import backgroundImage from '../../assets/Homepage_bg.jpg';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppSelector } from '../../redux/hooks';

const HeroContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isdarkmode'
})<{ isdarkmode: boolean }>(({ isdarkmode }) => ({
  backgroundImage: isdarkmode 
    ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`
    : `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ContentContainer = styled(Box)({
  display: 'flex',
  padding: '2rem 0',
  flex: 1,
});

const LeftSection = styled(Box)({
  flex: '0 0 70%',
  paddingLeft: '5rem',
  paddingRight: '2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

interface StyledTypographyProps {
  isdarkmode: boolean;
}

const MainHeading = styled(Typography)<StyledTypographyProps>(({ isdarkmode }) => ({
  fontSize: '3.5rem',
  margin: 0,
  fontWeight: 700,
  fontFamily: '"Righteous", cursive',
  color: isdarkmode ? '#ffffff' : '#1C1615',
  marginBottom: '1rem',
}));

const Tagline = styled(Typography)<StyledTypographyProps>(({ isdarkmode }) => ({
  fontSize: '2rem',
  margin: 0,
  fontWeight: 500,
  fontFamily: '"Righteous", cursive',
  color: isdarkmode ? '#ffffff' : '#1C1615',
  marginBottom: '2rem',
}));

const Subtitle = styled(Typography)<StyledTypographyProps>(({ isdarkmode }) => ({
  fontSize: '1.4rem',
  margin: 0,
  fontWeight: 600,
  marginBottom: '1rem',
  color: isdarkmode ? '#ffffff' : '#1C1615',
}));

const Description = styled(Typography)<StyledTypographyProps>(({ isdarkmode }) => ({
  fontSize: '1.1rem',
  lineHeight: 1.6,
  margin: 0,
  marginBottom: '3rem',
  maxWidth: '800px',
  color: isdarkmode ? '#e0e0e0' : '#1C1615',
}));

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const user = useAppSelector(state => state.auth.user);

  const handleViewRecipes = () => {
    if (user) {
      navigate('/recipes');
    } else {
      navigate('/login', { state: { from: '/recipes' } });
    }
  };

  return (
    <HeroContainer isdarkmode={isDarkMode}>
      <Navbar />
      <ContentContainer>
        <LeftSection>
          <MainHeading isdarkmode={isDarkMode}>Welcome to FlavorVerse</MainHeading>
          <Tagline isdarkmode={isDarkMode}>Cook. Share. Inspire.</Tagline>
          <Subtitle isdarkmode={isDarkMode}>Where Every Recipe Tells a Story</Subtitle>
          <Description isdarkmode={isDarkMode}>
            Discover and share mouthwatering recipes from around the world! Whether you're a 
            kitchen newbie or a culinary expert, FlavorVerse is your space to explore flavors, post
            your own creations, and connect with fellow food lovers.
          </Description>
          <Button 
            buttonColor={isDarkMode ? "#F3A712" : "#C58B1A"}
            onClick={handleViewRecipes}
            sx={{
              padding: '0.85rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              width: 'fit-content',
              maxWidth: '480px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              '&:hover': {
                backgroundColor: isDarkMode ? '#D99610' : '#B47D15',
              }
            }}
          >
            {user ? "View recipes" : "Login to view recipes"}
            <span style={{ marginLeft: '0.5rem' }}>→</span>
          </Button>
        </LeftSection>
      </ContentContainer>
    </HeroContainer>
  );
};

export default HeroSection;