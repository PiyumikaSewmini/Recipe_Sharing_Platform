import React, { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FormBox from '../common/FormBox';
import TextField from '../common/TextField';
import Button from '../common/Button';

export interface AuthFormData {
  username: string; 
  email: string;
  password: string;
}

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (formData: AuthFormData) => void;
  isLoading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<AuthFormData>({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isLogin = type === 'login';
  const title = isLogin ? 'Sign in' : 'Sign up';
  const buttonText = isLogin ? 'Sign in' : 'Sign up';
  const loadingText = isLogin ? 'Signing in...' : 'Signing up...';
  const alternateText = isLogin ? "Don't have an account?" : "Already have an account?";
  const alternateLinkText = isLogin ? "Sign Up" : "Login";
  const alternatePath = isLogin ? "/signup" : "/login";

  return (
    <FormBox>
      <Typography 
        variant="h5" 
        component="h2" 
        align="center" 
        sx={{ 
          mb: 4,
          fontWeight: 700,
          color: '#21381E',
          fontSize: '1.8rem',
          fontFamily: '"Righteous", cursive',
        }}
      >
        {title}
      </Typography>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <TextField
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}

        <TextField
          name="email"
          placeholder="Enter Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          name="password"
          placeholder={isLogin ? "Enter Password" : "Create Password"}
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
          <Button 
            type="submit"
            size="large"
            loading={isLoading}
          >
            {isLoading ? loadingText : buttonText}
          </Button>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" component="span" sx={{ color: '#666', fontWeight: 'bold' }}>
            {alternateText}
          </Typography>
          <Link 
            component={RouterLink} 
            to={alternatePath}
            sx={{ 
              ml: 1,
              color: '#FFA726',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            {alternateLinkText}
          </Link>
        </Box>
      </form>
    </FormBox>
  );
};

export default AuthForm;