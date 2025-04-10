import React from 'react';
import { Box, Typography, Switch, styled } from '@mui/material';

interface StyledSettingsSectionProps {
  isdarkmode: boolean;
}

const StyledSettingsSection = styled(Box)<StyledSettingsSectionProps>(({ isdarkmode }) => ({
  padding: '16px',
  backgroundColor: isdarkmode ? '#333333' : 'white',
  borderRadius: '8px',
  marginBottom: '24px',
  border: `1px solid ${isdarkmode ? '#ffffff' : '#2a472a'}`,
}));

interface SettingItemProps {
  isdarkmode: boolean;
}

const SettingItem = styled(Box)<SettingItemProps>(({ isdarkmode }) => ({
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between',
  backgroundColor: isdarkmode ? '#444444' : '#f5f5f5',
  padding: '12px',
  borderRadius: '6px',
  border: `1px solid ${isdarkmode ? '#ffffff' : '#2a472a'}`
}));

interface SettingsSectionProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <StyledSettingsSection isdarkmode={isDarkMode}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          fontWeight: 'bold', 
          fontSize: '1.25rem' 
        }}
      >
        Settings
      </Typography>
      <SettingItem isdarkmode={isDarkMode}>
        <Typography sx={{ fontSize: '1rem' }}>
          Dark Mode
        </Typography>
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: isDarkMode ? '#ffffff' : '#2a472a',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: isDarkMode ? '#ffffff' : '#2a472a',
            },
          }}
        />
      </SettingItem>
    </StyledSettingsSection>
  );
};

export default SettingsSection;