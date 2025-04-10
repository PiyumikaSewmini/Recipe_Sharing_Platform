
import React from 'react';
import { Card as MuiCard, CardContent, CardMedia, Box, styled } from '@mui/material';


const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => !['hoverable', 'borderColor'].includes(prop as string),
})<{ hoverable?: boolean; borderColor?: string }>(({ hoverable, borderColor }) => ({
  borderRadius: '10px',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
  border: borderColor ? `2px solid ${borderColor}` : 'none',
  transition: hoverable ? 'transform 0.3s ease' : 'none',
  '&:hover': {
    transform: hoverable ? 'translateY(-5px)' : 'none',
    boxShadow: hoverable ? '0 4px 15px rgba(0, 0, 0, 0.15)' : '0px 2px 8px rgba(0,0,0,0.1)',
  }
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  padding: '16px',
  backgroundColor: 'white',
  position: 'relative',
});

interface CardProps {
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
  imageHeight?: number | string;
  hoverable?: boolean;
  borderColor?: string;
  className?: string;
  sx?: any;
}

const Card: React.FC<CardProps> = ({
  children,
  image,
  imageAlt = 'Card image',
  imageHeight = 180,
  hoverable = true,
  borderColor,
  className,
  sx = {},
  ...otherProps
}) => {
  return (
    <StyledCard 
      hoverable={hoverable} 
      borderColor={borderColor}
      className={className}
      sx={sx}
      {...otherProps}
    >
      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={imageAlt}
        />
      )}
      <StyledCardContent>
        {children}
      </StyledCardContent>
    </StyledCard>
  );
};


export const CardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '8px',
});

export const CardBody = styled(Box)({
  marginBottom: '16px',
});

export const CardFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: 'auto',
});

export default Card;