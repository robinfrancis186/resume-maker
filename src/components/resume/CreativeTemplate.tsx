import React from 'react';
import {
  Box,
  Container,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Grid,
  GridItem,
} from '@chakra-ui/react';

const CreativeTemplate: React.FC = () => {
  const accentColor = useColorModeValue('purple.500', 'purple.300');
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.400');
  const sectionBg = useColorModeValue('purple.50', 'purple.900');

  return (
    <Box 
      w="full" 
      bg={bgColor}
      fontFamily="Poppins, sans-serif"
      position="relative"
      overflow="hidden"
    >
      {/* Header with diagonal background */}
      <Box
        bg={accentColor}
        transform="skewY(-5deg)"
        position="absolute"
        top="-50px"
        left={0}
        right={0}
        height="300px"
      />

      <Container maxW="container.lg" position="relative" pt={16} pb={8}>
        {/* Name and Title */}
        <VStack align="start" spacing={2} mb={12}>
          <Heading 
            size="2xl" 
            color="white"
            fontWeight="black"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            John Smith
          </Heading>
          <Text 
            fontSize="xl" 
            color="white"
            fontWeight="medium"
          >
            Senior Software Engineer
          </Text>
          <HStack spacing={4} color="white" fontSize="sm" mt={2}>
            <Text>San Francisco, CA</Text>
            <Text>•</Text>
            <Text>(555) 123-4567</Text>
            <Text>•</Text>
            <Text>john@email.com</Text>
          </HStack>
        </VStack>

        {/* Main Content */}
        <Grid templateColumns="repeat(12, 1fr)" gap={8}>
          {/* Left Column */}
          <GridItem colSpan={[12, 12, 4]}>
            <VStack align="stretch" spacing={8}>
              {/* Skills */}
              <Box 
                bg={sectionBg} 
                p={6} 
                borderRadius="xl"
                boxShadow="lg"
              >
                <Heading 
                  size="md" 
                  color={accentColor} 
                  mb={4}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Skills
                </Heading>
                <VStack align="start" spacing={3}>
                  <HStack flexWrap="wrap" spacing={2}>
                    <Badge colorScheme="purple">JavaScript</Badge>
                    <Badge colorScheme="purple">TypeScript</Badge>
                    <Badge colorScheme="purple">React</Badge>
                    <Badge colorScheme="purple">Node.js</Badge>
                  </HStack>
                  <HStack flexWrap="wrap" spacing={2}>
                    <Badge colorScheme="purple">AWS</Badge>
                    <Badge colorScheme="purple">Docker</Badge>
                    <Badge colorScheme="purple">Kubernetes</Badge>
                  </HStack>
                  <HStack flexWrap="wrap" spacing={2}>
                    <Badge colorScheme="purple">MongoDB</Badge>
                    <Badge colorScheme="purple">PostgreSQL</Badge>
                  </HStack>
                </VStack>
              </Box>

              {/* Education */}
              <Box 
                bg={sectionBg} 
                p={6} 
                borderRadius="xl"
                boxShadow="lg"
              >
                <Heading 
                  size="md" 
                  color={accentColor} 
                  mb={4}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Education
                </Heading>
                <VStack align="start" spacing={2}>
                  <Text fontWeight="bold" color={textColor}>
                    University of Technology
                  </Text>
                  <Text fontSize="sm" color={subTextColor}>
                    B.S. Computer Science
                  </Text>
                  <Text fontSize="sm" color={subTextColor}>
                    2018
                  </Text>
                  <Text fontSize="sm" color={textColor} mt={2}>
                    GPA: 3.8/4.0
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </GridItem>

          {/* Right Column */}
          <GridItem colSpan={[12, 12, 8]}>
            <VStack align="stretch" spacing={8}>
              {/* Professional Summary */}
              <Box>
                <Heading 
                  size="md" 
                  color={accentColor} 
                  mb={4}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Professional Summary
                </Heading>
                <Text color={textColor} fontSize="md" lineHeight="tall">
                  Senior Software Engineer with 5+ years of experience in full-stack development.
                  Specialized in building scalable web applications and leading development teams.
                  Strong focus on code quality and performance optimization.
                </Text>
              </Box>

              {/* Experience */}
              <Box>
                <Heading 
                  size="md" 
                  color={accentColor} 
                  mb={6}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Experience
                </Heading>
                <VStack align="stretch" spacing={8}>
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Box>
                        <Text fontWeight="bold" color={textColor}>
                          Tech Company, Inc.
                        </Text>
                        <Text fontSize="md" color={accentColor}>
                          Senior Software Engineer
                        </Text>
                      </Box>
                      <Text fontSize="sm" color={subTextColor}>
                        2020 - Present
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color={textColor} mt={3}>
                      • Led development of key features resulting in 40% user growth
                      • Managed team of 5 developers for critical projects
                      • Implemented CI/CD pipeline reducing deployment time by 50%
                    </Text>
                  </Box>

                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Box>
                        <Text fontWeight="bold" color={textColor}>
                          Startup Co.
                        </Text>
                        <Text fontSize="md" color={accentColor}>
                          Software Engineer
                        </Text>
                      </Box>
                      <Text fontSize="sm" color={subTextColor}>
                        2018 - 2020
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color={textColor} mt={3}>
                      • Developed and maintained core application features
                      • Collaborated with cross-functional teams
                      • Improved application performance by 30%
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default CreativeTemplate; 