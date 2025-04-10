import React from 'react';
import { Button as MuiButton, styled, ButtonProps } from '@mui/material';

interface StyledButtonProps extends ButtonProps {
  buttonColor?: string;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'buttonColor',
})<StyledButtonProps>(({ buttonColor }) => ({
  backgroundColor: buttonColor || '#21381E',
  color: '#fff',
  padding: '10px 30px',
  textTransform: 'none',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: buttonColor ? buttonColor + 'DD' : '#1B3B1F',
  },
  width: 'auto',
  minWidth: '200px',
}));

interface CustomButtonProps extends ButtonProps {
  buttonColor?: string;
  loading?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({ 
  children, 
  buttonColor, 
  loading = false, 
  ...props 
}) => {
  return (
    <StyledButton
      variant="contained"
      buttonColor={buttonColor}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </StyledButton>
  );
};

export default Button;