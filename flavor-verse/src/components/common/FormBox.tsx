import React from 'react';
import { Box, styled } from '@mui/material';

const StyledFormBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(5),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
  width: '100%',
  minHeight: '550px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '2px solid #21381E',
}));

interface FormBoxProps {
  children: React.ReactNode;
}

const FormBox: React.FC<FormBoxProps> = ({ children }) => {
  return <StyledFormBox>{children}</StyledFormBox>;
};

export default FormBox;