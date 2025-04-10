import React from 'react';
import { Box, Typography, styled } from '@mui/material';

interface StyledProfileSectionProps {
  isdarkmode: boolean;
}

const StyledProfileSection = styled(Box)<StyledProfileSectionProps>(({ isdarkmode }) => ({
  padding: '16px',
  backgroundColor: isdarkmode ? '#333333' : 'white',
  borderRadius: '8px',
  marginBottom: '24px',
  border: `1px solid ${isdarkmode ? '#ffffff' : '#2a472a'}`,
  wordBreak: 'break-word',
}));

interface ProfileSectionProps {
  user: {
    username: string;
    email: string;
  };
  isDarkMode: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user, isDarkMode }) => {
  return (
    <StyledProfileSection isdarkmode={isDarkMode}>
      <Typography 
        variant="body1" 
        sx={{ mb: 1.5, fontSize: '1rem' }}
      >
        <strong>Username:</strong> {user.username}
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: '1rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          maxWidth: '100%'
        }}
      >
        <strong>Email:</strong> {user.email}
      </Typography>
    </StyledProfileSection>
  );
};

export default ProfileSection;