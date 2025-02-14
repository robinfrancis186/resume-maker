import React from 'react';
import {
  Box,
  VStack,
  Text,
  Heading,
  HStack,
  Grid,
  GridItem,
  Circle,
  useColorModeValue,
} from '@chakra-ui/react';

const CreativeTemplate: React.FC = () => {
  const accentColor = '#805AD5';
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.400');
  const bgAccent = useColorModeValue('purple.50', 'purple.900');

  return (
    <Box
      w="full"
      bg="white"
      _dark={{ bg: 'gray.800' }}
      fontFamily="Poppins, sans-serif"
    >
      {/* Header */}
      <Grid templateColumns="1fr 2fr" gap={0}>
        <GridItem bg={accentColor} p={6}>
          <VStack align="start" spacing={3}>
            <Circle size="100px" bg="white" color={accentColor}>
              <Heading size="xl">JS</Heading>
            </Circle>
          </VStack>
        </GridItem>
        <GridItem bg={bgAccent} p={6}>
          <VStack align="start" spacing={2}>
            <Heading size="xl" color={textColor}>
              John Smith
            </Heading>
            <Text fontSize="lg" color={accentColor} fontWeight="bold">
              Senior Software Engineer
            </Text>
            <HStack spacing={4} fontSize="sm" color={subTextColor} pt={2}>
              <Text>john@email.com</Text>
              <Text>•</Text>
              <Text>(555) 123-4567</Text>
              <Text>•</Text>
              <Text>San Francisco, CA</Text>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>

      {/* Content */}
      <Grid templateColumns="1fr 2fr" gap={0}>
        <GridItem bg={bgAccent} p={6}>
          {/* Skills */}
          <VStack align="start" spacing={4}>
            <Heading size="md" color={accentColor}>
              Skills
            </Heading>
            <VStack align="start" spacing={2}>
              <Text fontSize="sm" color={textColor}>JavaScript</Text>
              <Text fontSize="sm" color={textColor}>React</Text>
              <Text fontSize="sm" color={textColor}>Node.js</Text>
              <Text fontSize="sm" color={textColor}>Python</Text>
              <Text fontSize="sm" color={textColor}>SQL</Text>
              <Text fontSize="sm" color={textColor}>AWS</Text>
            </VStack>
          </VStack>

          {/* Education */}
          <VStack align="start" spacing={4} mt={8}>
            <Heading size="md" color={accentColor}>
              Education
            </Heading>
            <Box>
              <Text fontWeight="bold" color={textColor}>
                University of Technology
              </Text>
              <Text fontSize="sm" color={subTextColor}>
                BS in Computer Science
              </Text>
              <Text fontSize="sm" color={subTextColor}>
                2018
              </Text>
            </Box>
          </VStack>
        </GridItem>

        <GridItem p={6}>
          {/* Experience */}
          <VStack align="start" spacing={6}>
            <Heading size="md" color={accentColor}>
              Experience
            </Heading>
            <VStack align="start" spacing={4} width="full">
              <Box>
                <HStack justify="space-between" mb={1} width="full">
                  <Text fontWeight="bold" color={textColor}>
                    Tech Company, Inc.
                  </Text>
                  <Text fontSize="sm" color={subTextColor}>
                    2020 - Present
                  </Text>
                </HStack>
                <Text color={accentColor} mb={2}>
                  Senior Software Engineer
                </Text>
                <Text fontSize="sm" color={textColor}>
                  • Led development of key features resulting in 40% user growth
                </Text>
              </Box>

              <Box>
                <HStack justify="space-between" mb={1} width="full">
                  <Text fontWeight="bold" color={textColor}>
                    Startup Co.
                  </Text>
                  <Text fontSize="sm" color={subTextColor}>
                    2018 - 2020
                  </Text>
                </HStack>
                <Text color={accentColor} mb={2}>
                  Software Engineer
                </Text>
                <Text fontSize="sm" color={textColor}>
                  • Developed and maintained core application features
                </Text>
              </Box>
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CreativeTemplate; 