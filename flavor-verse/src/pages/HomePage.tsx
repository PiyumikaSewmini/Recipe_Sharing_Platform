import React from 'react';
import Footer from '../components/layout/Footer';
import RecipeCollection from '../components/recipe/RecipeCollection/RecipeCollection';
import AboutFlavorVerse from '../components/home/AboutFlavorVerse';
import HeroSection from '../components/home/HeroSection';
import { Box, styled } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';
import { useAppSelector } from '../redux/hooks';

interface PageContainerProps {
  isdarkmode: boolean;
}

const PageContainer = styled(Box)<PageContainerProps>(({ isdarkmode }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  fontFamily: '"Poppins", sans-serif',
  backgroundColor: isdarkmode ? '#242424' : '#D9D9D9',
  color: isdarkmode ? '#ffffff' : '#2a472a',
}));

const HomePage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const user = useAppSelector(state => state.auth.user);
  
  return (
    <PageContainer isdarkmode={isDarkMode}>
      <HeroSection />
      
      {/*only vissible for  authenticate users */}
      {user && (
        <>
          <RecipeCollection />
          <AboutFlavorVerse />
          <Footer />
        </>
      )}
    </PageContainer>
  );
};

export default HomePage;