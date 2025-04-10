import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import StopIcon from '@mui/icons-material/Stop';
import { Step } from '../../../redux/slices/recipeSlice';
import { extractTimerMinutes } from '../../../utils/recipeUtils';

interface RecipeStepProps {
  step: Step;
  stepNumber: number;
  isActive: boolean;
  showTimers: boolean;
  activeTimer: { step: number; remaining: number } | null;
  startTimer: (minutes: number, step: number) => void;
  stopTimer: () => void;
  formatTime: (seconds: number) => string;
}

const RecipeStep: React.FC<RecipeStepProps> = ({
  step,
  stepNumber,
  isActive,
  showTimers,
  activeTimer,
  startTimer,
  stopTimer,
  formatTime,
}) => {
  return (
    <Box
      sx={{
        mb: 4,
        p: 2,
        borderRadius: '8px',
        backgroundColor: isActive ? '#fff8e1' : 'transparent',
        border: '1px solid #eee',
        transition: 'all 0.2s',
        '&:hover': { boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2a472a' }}>
          Step {stepNumber}: {step.title}
        </Typography>

        {showTimers && (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: activeTimer?.step === stepNumber ? '#f44336' : '#f3a712',
              borderRadius: '20px',
              textTransform: 'none',
              '&:hover': { backgroundColor: activeTimer?.step === stepNumber ? '#d32f2f' : '#d8960a' },
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (activeTimer?.step === stepNumber) {
                stopTimer();
              } else {
                const timerText = step.instructions.find((inst: string) => extractTimerMinutes(inst));
                const minutes = timerText ? extractTimerMinutes(timerText) : 5;
                startTimer(minutes || 5, stepNumber);
              }
            }}
            startIcon={activeTimer?.step === stepNumber ? <StopIcon /> : <TimerIcon />}
          >
            {activeTimer?.step === stepNumber && activeTimer
              ? `Stop (${formatTime(activeTimer.remaining)})`
              : 'Start Timer'}
          </Button>
        )}
      </Box>

      <Box>
        {step.instructions.map((instruction: string, i: number) => (
          <Box key={i} sx={{ display: 'flex', mb: 1.5, alignItems: 'flex-start' }}>
            <Typography variant="body2" component="span" sx={{ color: '#333', fontWeight: 'bold', mr: 1.5, mt: 0.3 }}>
              {i + 1}.
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>{instruction}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecipeStep;