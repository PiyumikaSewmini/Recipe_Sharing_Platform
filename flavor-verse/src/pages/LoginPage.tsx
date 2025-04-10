import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import AuthForm, { AuthFormData } from '../components/auth/AuthForm';
import AuthFeatures from '../components/auth/AuthFeatures';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { login } from '../redux/slices/authSlice';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);
  
  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (formData: AuthFormData) => {
    dispatch(login(formData));
  };
  
  const loginFeatures = [
    'Share your favorite recipes',
    'Save dishes you love',
    'Discover new flavors every day',
    'Connect with fellow foodies'
  ];

  return (
    <AuthLayout
      leftColumn={
        <AuthFeatures
          title="Welcome Back to"
          subtitle="FlavorVerse!"
          description="Log in to access your saved recipes, share new creations, and connect with our foodie community."
          featuresHeading="Here's what's waiting for you inside"
          features={loginFeatures}
          featureFontSize="1.1rem"
        />
      }
      rightColumn={
        <AuthForm
          type="login"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      }
    />
  );
};

export default LoginPage;