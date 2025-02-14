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

const ModernTemplate: React.FC = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headerBg = '#1A365D';

  return (
    <Box
      w="full"
      bg="white"
      _dark={{ bg: 'gray.800' }}
      fontFamily="Inter, sans-serif"
    >
      {/* Header */}
      <Box bg={headerBg} color="white" p={6}>
        <VStack align="start" spacing={2}>
          <Heading size="lg">John Smith</Heading>
          <Text fontSize="md">Senior Software Engineer</Text>
          <HStack spacing={4} fontSize="sm" color="gray.100">
            <Text>john@email.com</Text>
            <Text>•</Text>
            <Text>(555) 123-4567</Text>
            <Text>•</Text>
            <Text>San Francisco, CA</Text>
          </HStack>
        </VStack>
      </Box>

      {/* Content */}
      <VStack align="stretch" p={6} spacing={6}>
        {/* Experience */}
        <Box>
          <Heading size="md" color={headerBg} mb={4}>
            Experience
          </Heading>
          <VStack align="stretch" spacing={4}>
            <Box>
              <HStack justify="space-between" mb={1}>
                <Text fontWeight="bold">Tech Company, Inc.</Text>
                <Text fontSize="sm">2020 - Present</Text>
              </HStack>
              <Text color="gray.600" mb={2}>Senior Software Engineer</Text>
              <Text fontSize="sm">
                • Led development of key features resulting in 40% user growth
              </Text>
            </Box>
            <Divider borderColor={borderColor} />
            <Box>
              <HStack justify="space-between" mb={1}>
                <Text fontWeight="bold">Startup Co.</Text>
                <Text fontSize="sm">2018 - 2020</Text>
              </HStack>
              <Text color="gray.600" mb={2}>Software Engineer</Text>
              <Text fontSize="sm">
                • Developed and maintained core application features
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Skills */}
        <Box>
          <Heading size="md" color={headerBg} mb={4}>
            Skills
          </Heading>
          <Text fontSize="sm">
            JavaScript • React • Node.js • Python • SQL • AWS
          </Text>
        </Box>

        {/* Education */}
        <Box>
          <Heading size="md" color={headerBg} mb={4}>
            Education
          </Heading>
          <Box>
            <HStack justify="space-between" mb={1}>
              <Text fontWeight="bold">University of Technology</Text>
              <Text fontSize="sm">2018</Text>
            </HStack>
            <Text color="gray.600">
              Bachelor of Science in Computer Science
            </Text>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default ModernTemplate; 