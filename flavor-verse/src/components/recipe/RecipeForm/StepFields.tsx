import React from 'react';
import { Box, IconButton, Typography, Tooltip, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '../../common/TextField';
import Button from '../../common/Button';
import { Step } from '../../../redux/slices/recipeSlice';

interface StepFieldsProps {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
}

const StepFields: React.FC<StepFieldsProps> = ({ steps, setSteps }) => {
  const handleAddStep = () => setSteps([...steps, { title: '', instructions: [''] }]);
  
  const handleRemoveStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };
  
  const handleStepChange = (index: number, field: keyof Step, value: string) => {
    const newSteps = [...steps];
    newSteps[index][field as 'title'] = value as any;
    setSteps(newSteps);
  };
  
  const handleAddInstruction = (stepIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex].instructions.push('');
    setSteps(newSteps);
  };
  
  const handleRemoveInstruction = (stepIndex: number, instIndex: number) => {
    const newSteps = [...steps];
    if (newSteps[stepIndex].instructions.length > 1) {
      newSteps[stepIndex].instructions = newSteps[stepIndex].instructions.filter(
        (_, i) => i !== instIndex
      );
      setSteps(newSteps);
    }
  };
  
  const handleInstructionChange = (stepIndex: number, instIndex: number, value: string) => {
    const newSteps = [...steps];
    newSteps[stepIndex].instructions[instIndex] = value;
    setSteps(newSteps);
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2, color: '#2A472A', fontWeight: 600 }}>Preparation Steps</Typography>
      
      {steps.map((step: Step, stepIndex: number) => (
        <Paper key={stepIndex} elevation={1} sx={{ mb: 3, p: 2, borderRadius: '4px', backgroundColor: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2A472A' }}>
              Step {stepIndex + 1}
            </Typography>
            
            <Tooltip title="Remove step">
              <IconButton 
                onClick={() => handleRemoveStep(stepIndex)} 
                disabled={steps.length === 1}
                size="small"
                sx={{ 
                  color: '#d32f2f', 
                  '&.Mui-disabled': { 
                    color: 'rgba(0, 0, 0, 0.26)' 
                  }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          
          <TextField
            label="Step Title (optional)"
            fullWidth
            value={step.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              handleStepChange(stepIndex, 'title', e.target.value)
            }
            sx={{ mb: 2 }}
          />
          
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#555' }}>Instructions:</Typography>
          
          {step.instructions.map((instruction: string, instIndex: number) => (
            <Box key={instIndex} sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
              <TextField
                placeholder={`Instruction ${instIndex + 1}`}
                fullWidth
                value={instruction}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInstructionChange(stepIndex, instIndex, e.target.value)
                }
                sx={{ mb: 0.5 }}
              />
              <Tooltip title="Remove instruction">
                <IconButton
                  onClick={() => handleRemoveInstruction(stepIndex, instIndex)}
                  disabled={step.instructions.length === 1}
                  size="small"
                  sx={{ 
                    ml: 1, 
                    color: '#d32f2f', 
                    '&.Mui-disabled': { 
                      color: 'rgba(0, 0, 0, 0.26)' 
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ))}
          
          <Button 
            startIcon={<AddCircleOutlineIcon />} 
            onClick={() => handleAddInstruction(stepIndex)}
            size="small"
            sx={{ 
              mt: 1, 
              backgroundColor: 'rgba(42, 71, 42, 0.05)',
              color: '#2A472A', 
              borderColor: '#2A472A',
              '&:hover': { 
               borderColor: '#21381E' 
              },
              fontSize: '0.875rem'
            }}
            variant="outlined"
          >
            Add Instruction
          </Button>
        </Paper>
      ))}
      
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
          startIcon={<AddIcon />} 
          onClick={handleAddStep} 
          sx={{ 
            backgroundColor: '#2A472A', 
            color: 'white',
            '&:hover': { 
              backgroundColor: '#21381E' 
            },
            minWidth: '150px'
          }}
          variant="contained"
        >
          Add New Step
        </Button>
      </Box>
    </>
  );
};

export default StepFields;