import React from 'react';
import {
  Box,
  VStack,
  Text,
  Heading,
  HStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

const MinimalTemplate: React.FC = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      w="full"
      bg="white"
      _dark={{ bg: 'gray.800' }}
      fontFamily="system-ui, sans-serif"
      p={8}
    >
      {/* Header */}
      <VStack align="center" spacing={3} mb={8}>
        <Heading size="xl" color={textColor}>
          John Smith
        </Heading>
        <Text fontSize="lg" color={subTextColor}>
          Senior Software Engineer
        </Text>
        <Text fontSize="sm" color={subTextColor} textAlign="center">
          San Francisco, CA • (555) 123-4567 • john@email.com
        </Text>
      </VStack>

      {/* Content */}
      <VStack align="stretch" spacing={8}>
        {/* Experience */}
        <Box>
          <Heading size="md" color={textColor} mb={4}>
            Experience
          </Heading>
          <VStack align="stretch" spacing={4}>
            <Box>
              <HStack justify="space-between" mb={1}>
                <Text fontWeight="bold" color={textColor}>Senior Software Engineer</Text>
                <Text fontSize="sm" color={subTextColor}>2020 - Present</Text>
              </HStack>
              <Text fontSize="sm" color={subTextColor} mb={2}>Tech Company, Inc.</Text>
              <Text fontSize="sm" color={textColor}>
                • Led development of key features resulting in 40% user growth
              </Text>
            </Box>
            <Divider borderColor={borderColor} />
            <Box>
              <HStack justify="space-between" mb={1}>
                <Text fontWeight="bold" color={textColor}>Software Engineer</Text>
                <Text fontSize="sm" color={subTextColor}>2018 - 2020</Text>
              </HStack>
              <Text fontSize="sm" color={subTextColor} mb={2}>Startup Co.</Text>
              <Text fontSize="sm" color={textColor}>
                • Developed and maintained core application features
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Education */}
        <Box>
          <Heading size="md" color={textColor} mb={4}>
            Education
          </Heading>
          <Box>
            <HStack justify="space-between" mb={1}>
              <Text fontWeight="bold" color={textColor}>
                Bachelor of Science in Computer Science
              </Text>
              <Text fontSize="sm" color={subTextColor}>2018</Text>
            </HStack>
            <Text fontSize="sm" color={subTextColor}>
              University of Technology
            </Text>
          </Box>
        </Box>

        {/* Skills */}
        <Box>
          <Heading size="md" color={textColor} mb={4}>
            Skills
          </Heading>
          <Text fontSize="sm" color={textColor}>
            JavaScript • React • Node.js • Python • SQL • AWS
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default MinimalTemplate; 