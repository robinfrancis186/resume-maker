import React from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import { FaFeatherAlt } from 'react-icons/fa';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizes = {
    sm: {
      fontSize: '1.5rem',
      iconSize: 16,
    },
    md: {
      fontSize: '2rem',
      iconSize: 20,
    },
    lg: {
      fontSize: '2.5rem',
      iconSize: 24,
    },
  };

  return (
    <HStack spacing={2}>
      <Box
        position="relative"
        fontSize={sizes[size].fontSize}
        fontWeight="bold"
        color="primary.500"
        _dark={{ color: 'primary.300' }}
      >
        <Text as="span">RF</Text>
        <Box
          position="absolute"
          top="-10%"
          right="-20%"
          transform="rotate(45deg)"
          color="accent.400"
          _dark={{ color: 'accent.300' }}
        >
          <FaFeatherAlt size={sizes[size].iconSize} />
        </Box>
      </Box>
    </HStack>
  );
};

export default Logo; 