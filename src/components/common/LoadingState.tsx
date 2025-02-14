import React from 'react';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';
import Logo from './Logo';

const LoadingState = () => {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      _dark={{ bg: 'gray.900' }}
    >
      <VStack spacing={8}>
        <Logo size="lg" />
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.300' }}>
          Loading...
        </Text>
      </VStack>
    </Box>
  );
};

export default LoadingState; 