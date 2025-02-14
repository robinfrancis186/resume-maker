import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Text,
  Heading,
  VStack,
  HStack,
  Circle,
  useColorModeValue,
} from '@chakra-ui/react';

const ModernTemplate: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const sidebarBg = useColorModeValue('blue.600', 'blue.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const sidebarText = useColorModeValue('white', 'gray.100');

  return (
    <Box w="full" bg={bgColor} fontFamily="Inter, sans-serif">
      <Grid templateColumns="300px 1fr">
        {/* Sidebar */}
        <GridItem bg={sidebarBg} p={8} color={sidebarText}>
          <VStack align="start" spacing={8}>
            {/* Profile */}
            <VStack align="start" spacing={4}>
              <Circle size="150px" bg="white" color={sidebarBg}>
                <Text fontSize="4xl">JS</Text>
              </Circle>
              <Heading size="xl">John Smith</Heading>
              <Text fontSize="lg" fontWeight="medium">
                Senior Software Engineer
              </Text>
            </VStack>

            {/* Contact */}
            <VStack align="start" spacing={3}>
              <Heading size="md">CONTACT</Heading>
              <Text fontSize="sm">San Francisco, CA</Text>
              <Text fontSize="sm">(555) 123-4567</Text>
              <Text fontSize="sm">john@email.com</Text>
            </VStack>

            {/* Skills */}
            <VStack align="start" spacing={3}>
              <Heading size="md">SKILLS</Heading>
              <VStack align="start" spacing={2}>
                <Text fontSize="sm">JavaScript • TypeScript</Text>
                <Text fontSize="sm">React • Node.js • Express</Text>
                <Text fontSize="sm">AWS • Docker • Kubernetes</Text>
                <Text fontSize="sm">MongoDB • PostgreSQL</Text>
                <Text fontSize="sm">Git • CI/CD • Agile</Text>
              </VStack>
            </VStack>

            {/* Languages */}
            <VStack align="start" spacing={3}>
              <Heading size="md">LANGUAGES</Heading>
              <VStack align="start" spacing={2}>
                <Text fontSize="sm">English (Native)</Text>
                <Text fontSize="sm">Spanish (Fluent)</Text>
              </VStack>
            </VStack>
          </VStack>
        </GridItem>

        {/* Main Content */}
        <GridItem p={8}>
          <VStack align="stretch" spacing={8}>
            {/* Summary */}
            <Box>
              <Heading size="lg" color={textColor} mb={4}>
                PROFESSIONAL SUMMARY
              </Heading>
              <Text color={textColor}>
                Senior Software Engineer with 5+ years of experience in full-stack development.
                Specialized in building scalable web applications and leading development teams.
                Strong focus on code quality and performance optimization.
              </Text>
            </Box>

            {/* Experience */}
            <Box>
              <Heading size="lg" color={textColor} mb={4}>
                EXPERIENCE
              </Heading>
              <VStack align="stretch" spacing={6}>
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" color={textColor}>
                        Tech Company, Inc.
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        Senior Software Engineer
                      </Text>
                    </VStack>
                    <Text fontSize="sm" color={textColor}>
                      2020 - Present
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color={textColor}>
                    • Led development of key features resulting in 40% user growth
                    • Managed team of 5 developers for critical projects
                    • Implemented CI/CD pipeline reducing deployment time by 50%
                  </Text>
                </Box>
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" color={textColor}>
                        Startup Co.
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        Software Engineer
                      </Text>
                    </VStack>
                    <Text fontSize="sm" color={textColor}>
                      2018 - 2020
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color={textColor}>
                    • Developed and maintained core application features
                    • Collaborated with cross-functional teams
                    • Improved application performance by 30%
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* Education */}
            <Box>
              <Heading size="lg" color={textColor} mb={4}>
                EDUCATION
              </Heading>
              <Box>
                <HStack justify="space-between" mb={2}>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" color={textColor}>
                      University of Technology
                    </Text>
                    <Text fontSize="sm" color={textColor}>
                      Bachelor of Science in Computer Science
                    </Text>
                  </VStack>
                  <Text fontSize="sm" color={textColor}>
                    2018
                  </Text>
                </HStack>
                <Text fontSize="sm" color={textColor}>
                  GPA: 3.8/4.0 • Dean's List • Computer Science Honor Society
                </Text>
              </Box>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ModernTemplate; 