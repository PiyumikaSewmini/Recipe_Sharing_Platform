import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import AuthForm, { AuthFormData } from '../components/auth/AuthForm';
import AuthFeatures from '../components/auth/AuthFeatures';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { register } from '../redux/slices/authSlice';

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);
  
  useEffect(() => {
    // If already authenticated, redirect to home page
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (formData: AuthFormData) => {
    dispatch(register(formData));
  };
  
  const signupFeatures = [
    'Share your favorite recipes',
    'Save dishes you love',
    'Discover new flavors every day',
    'Connect with fellow foodies'
  ];

  return (
    <AuthLayout
      leftColumn={
        <AuthFeatures
          title="Join the FlavorVerse"
          subtitle="Family!"
          description="Let's bring your kitchen to life — one recipe at a time."
          featuresHeading="Create your free account to:"
          features={signupFeatures}
          featureFontSize="1.2rem"
        />
      }
      rightColumn={
        <AuthForm
          type="signup"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      }
    />
  );
};

export default SignupPage;