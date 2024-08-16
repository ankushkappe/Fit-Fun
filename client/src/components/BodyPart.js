import React from 'react';
import { Stack, Typography } from '@mui/material';
import Icon from '../assets/icons/gym.png';

const BodyPart = ({ item, setBodyPart, bodyPart }) => (
  <Stack
    type="button"
    alignItems="center"
    justifyContent="center"
    className="bodyPart-card"
    sx={{
      ...(bodyPart === item
        ? {
            borderTop: '2px solid #FF2625',
            background: '#fff',
            borderBottomLeftRadius: '20px',
            width: '200px',
            height: '202px',
            cursor: 'pointer',
            gap: '20px',
          }
        : {
            background: '#fff',
            borderBottomLeftRadius: '20px',
            width: '200px',
            height: '282px',
            cursor: 'pointer',
            gap: '47px',
          }),
      marginRight: '10px', // Add some margin to space out the items
      flexShrink: 0, // Prevent the item from shrinking
    }}
    onClick={() => {
      setBodyPart(item);
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
    }}
  >
    <img src={Icon} alt="dumbbell" style={{ width: '40px', height: '40px' }} />
    <Typography fontSize="24px" fontWeight="bold" fontFamily="Alegreya" color="#3A1212" textTransform="capitalize">
      {item}
    </Typography>
  </Stack>
);

export default BodyPart;
