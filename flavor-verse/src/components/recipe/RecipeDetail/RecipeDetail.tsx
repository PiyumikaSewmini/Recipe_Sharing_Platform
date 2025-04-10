import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import ChefHatIcon from '@mui/icons-material/EmojiPeople';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Recipe } from '../../../redux/slices/recipeSlice';
import RecipeIngredients from './RecipeIngredients';
import RecipeStep from './RecipeStep';

interface RecipeDetailProps {
  recipe: Recipe;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  activeTimer: { step: number; remaining: number } | null;
  startTimer: (minutes: number, step: number) => void;
  stopTimer: () => void;
  onBack: () => void;
  formatTime?: (seconds: number) => string;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  currentStep,
  setCurrentStep,
  activeTimer,
  startTimer,
  stopTimer,
  onBack,
  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  },
}) => {
  const [showTimers, setShowTimers] = useState(false);

  const handleStartCooking = () => {
    setShowTimers(true);
    const firstStep = recipe.steps[0];
    setCurrentStep(1);
    
    const timerInstruction = firstStep.instructions.find(inst => {
      const minutesMatch = inst.match(/(\d+)(?:-\d+)?\s*minutes?/i) || 
                        inst.match(/(\d+)(?:-\d+)?\s*mins?/i) ||
                        inst.match(/for\s*(\d+)(?:-\d+)?\s*(?:minutes?|mins?)/i);
      return minutesMatch !== null;
    });
    
    let minutes = 5;
    if (timerInstruction) {
      const minutesMatch = timerInstruction.match(/(\d+)(?:-\d+)?\s*minutes?/i) || 
                        timerInstruction.match(/(\d+)(?:-\d+)?\s*mins?/i) ||
                        timerInstruction.match(/for\s*(\d+)(?:-\d+)?\s*(?:minutes?|mins?)/i);
      if (minutesMatch && minutesMatch[1]) {
        minutes = parseInt(minutesMatch[1], 10);
      }
    }
    
    startTimer(minutes, 1);
  };

  const handleStopAll = () => {
    setShowTimers(false);
    stopTimer();
    setCurrentStep(1);
  };

  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', maxWidth: '100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      
      <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            color: '#2a472a',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: 'rgba(42, 71, 42, 0.08)' },
          }}
        >
          Back to Recipes
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <RecipeIngredients 
          image={recipe.image}
          title={recipe.title}
          ingredients={recipe.ingredients}
        />

        <Box sx={{ width: { xs: '100%', md: '60%' }, p: 4, backgroundColor: '#fff', position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: 0, right: 16, zIndex: 1 }}>
            {!showTimers ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#f3a712',
                  color: 'white',
                  borderRadius: '15px',
                  padding: '8px 20px',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#d8960a', transform: 'scale(1.02)' },
                  transition: 'all 0.2s',
                }}
                onClick={handleStartCooking}
              >
                Would you like to cook with us? Start the timer!
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  borderRadius: '50px',
                  padding: '8px 20px',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#d32f2f', transform: 'scale(1.02)' },
                  transition: 'all 0.2s',
                }}
                onClick={handleStopAll}
                startIcon={<StopIcon />}
              >
                Stop All Timers
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, pt: 4 }}>
            <ChefHatIcon sx={{ color: '#f3a712', fontSize: '2rem', mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2a472a' }}>
              How to Make It - Step by Step
            </Typography>
          </Box>

          <Box>
            {recipe.steps.map((step, index: number) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;

              return (
                <RecipeStep
                  key={index}
                  step={step}
                  stepNumber={stepNumber}
                  isActive={isActive}
                  showTimers={showTimers}
                  activeTimer={activeTimer}
                  startTimer={startTimer}
                  stopTimer={stopTimer}
                  formatTime={formatTime}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecipeDetail;