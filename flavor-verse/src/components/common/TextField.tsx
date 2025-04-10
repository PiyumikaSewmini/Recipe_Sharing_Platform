
import React from 'react';
import { TextField as MuiTextField, styled } from '@mui/material';


export const inputGlobalStyles = `
  .MuiOutlinedInput-input {
    background-color: white !important;
    color: black !important;
  }
  .MuiOutlinedInput-root {
    background-color: white !important;
  }
`;


const StyledTextField = styled(MuiTextField)(() => ({
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    '& fieldset': {
      borderColor: '#CCCCCC',
    },
    '&:hover fieldset': {
      borderColor: '#21381E',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#21381E',
    },
  },
  '& .MuiInputBase-input': {
    backgroundColor: 'white',
    color: 'black',
  },
  '& .MuiInputBase-input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px white inset',
    WebkitTextFillColor: 'black',
  },
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
  },
  '& .MuiFormLabel-root': {
    color: '#666666',
    '&.Mui-focused': {
      color: '#21381E',
    },
  },
}));

export interface CustomTextFieldProps {
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  label?: React.ReactNode;
  error?: boolean;
  helperText?: React.ReactNode;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  sx?: any;
  className?: string;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  [key: string]: any; 
}

const TextField: React.FC<CustomTextFieldProps> = (props) => {
 
  return (
    <StyledTextField
      fullWidth
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
        },
        '& .MuiOutlinedInput-input': {
          backgroundColor: 'white',
          color: 'black',
        },
        ...(props.sx || {})
      }}
      {...props}
    />
  );
};

export default TextField;