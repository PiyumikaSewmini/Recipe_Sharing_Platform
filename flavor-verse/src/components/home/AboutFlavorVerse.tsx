import React from 'react';
import { Box, Container, Typography, styled } from '@mui/material';
import aboutImage from '../../assets/About_home.jpg';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemedComponentProps {
  isdarkmode: boolean;
}

const AboutSection = styled(Box)<ThemedComponentProps>(({ isdarkmode }) => ({
  padding: '6rem 0',
  backgroundColor: isdarkmode ? '#242424' : '#f8f8f8',
  transition: 'background-color 0.3s ease',
}));

const AboutContainer = styled(Container)({
  maxWidth: '1400px !important',
  display: 'flex',
  flexDirection: 'column',
  padding: '0 1rem',
});

const AboutHeading = styled(Typography)<ThemedComponentProps>(({ isdarkmode }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  fontFamily: '"Righteous", cursive',
  color: isdarkmode ? '#4CAF50' : '#21381E',
  textAlign: 'left',
  marginBottom: 10,
  transition: 'color 0.3s ease',
}));

const AboutTagline = styled(Typography)<ThemedComponentProps>(({ isdarkmode }) => ({
  fontSize: '1.2rem',
  fontWeight: 500,
  color: isdarkmode ? '#e0e0e0' : '#000',
  textAlign: 'left',
  marginBottom: 0,
  transition: 'color 0.3s ease',
}));

const ContentWrapper = styled(Box)({
  display: 'flex',
  gap: '2rem',
  flexDirection: 'column',
  marginTop: '2rem',

  '@media (min-width: 960px)': {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

const TextSection = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const AboutText = styled(Typography)<ThemedComponentProps>(({ isdarkmode }) => ({
  fontSize: '1.1rem',
  lineHeight: 2,
  color: isdarkmode ? '#cccccc' : '#333',
  marginBottom: '2rem',
  transition: 'color 0.3s ease',
}));

const ImageSection = styled(Box)<ThemedComponentProps>(({ isdarkmode }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',

  '& img': {
    width: '110%',
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '590px',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: isdarkmode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)',
    transition: 'box-shadow 0.3s ease',
  },
}));

const AboutFlavorVerse: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <AboutSection isdarkmode={isDarkMode}>
      <AboutContainer>
        <AboutHeading variant="h2" isdarkmode={isDarkMode}>About FlavorVerse</AboutHeading>
        <AboutTagline variant="h6" isdarkmode={isDarkMode}>Where Passion Meets the Plate</AboutTagline>
        <ContentWrapper>
          <TextSection>
            <AboutText isdarkmode={isDarkMode}>
              Welcome to FlavorVerse — your ultimate destination for discovering, creating, and sharing recipes that bring people together. We're more than just a recipe website — we're a vibrant community of food lovers, home cooks, and kitchen explorers from around the globe.
            </AboutText>
            <AboutText isdarkmode={isDarkMode}>
              Our mission is simple: to celebrate the joy of cooking and make it accessible to everyone. Whether you're a seasoned chef or just starting your culinary journey, FlavorVerse is your space to find inspiration, share your favorite dishes, and connect with others who love food as much as you do.
            </AboutText>
            <AboutText isdarkmode={isDarkMode}>
              Every recipe here tells a story — of family traditions, late-night cravings, festive memories, and creative experiments. We believe that food is more than just fuel — it's love, culture, and connection on a plate.
            </AboutText>
            <AboutText isdarkmode={isDarkMode}>
              Join us, dive into the flavors of the world, and let's make cooking an experience to cherish — one recipe at a time. Because here at FlavorVerse, every bite begins with a story.
            </AboutText>
          </TextSection>
          <ImageSection isdarkmode={isDarkMode}>
            <img src={aboutImage} alt="About FlavorVerse" />
          </ImageSection>
        </ContentWrapper>
      </AboutContainer>
    </AboutSection>
  );
};

export default AboutFlavorVerse;