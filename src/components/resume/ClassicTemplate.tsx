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

const ClassicTemplate: React.FC = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      w="full"
      bg="white"
      _dark={{ bg: 'gray.800' }}
      fontFamily="Times New Roman, serif"
      p={8}
    >
      {/* Header */}
      <VStack align="center" spacing={3} mb={8}>
        <Heading 
          size="2xl" 
          color={textColor}
          textTransform="uppercase"
          letterSpacing="wider"
        >
          John Smith
        </Heading>
        <Divider borderColor={borderColor} borderWidth="2px" w="40%" />
        <Text fontSize="md" color={subTextColor} textAlign="center">
          San Francisco, CA • (555) 123-4567 • john@email.com
        </Text>
      </VStack>

      {/* Content */}
      <VStack align="stretch" spacing={6}>
        {/* Experience */}
        <Box>
          <Heading 
            size="lg" 
            color={textColor} 
            mb={4}
            textTransform="uppercase"
            borderBottom="2px"
            borderColor={borderColor}
            pb={2}
          >
            Professional Experience
          </Heading>
          <VStack align="stretch" spacing={6}>
            <Box>
              <HStack justify="space-between" mb={1}>
                <Heading size="md" color={textColor}>Tech Company, Inc.</Heading>
                <Text fontSize="md" color={subTextColor}>2020 - Present</Text>
              </HStack>
              <Text fontSize="md" fontStyle="italic" color={subTextColor} mb={2}>
                Senior Software Engineer
              </Text>
              <Text fontSize="md" color={textColor}>
                • Led development of key features resulting in 40% user growth
                • Managed team of 5 developers for critical projects
                • Implemented CI/CD pipeline reducing deployment time by 50%
              </Text>
            </Box>
            <Box>
              <HStack justify="space-between" mb={1}>
                <Heading size="md" color={textColor}>Startup Co.</Heading>
                <Text fontSize="md" color={subTextColor}>2018 - 2020</Text>
              </HStack>
              <Text fontSize="md" fontStyle="italic" color={subTextColor} mb={2}>
                Software Engineer
              </Text>
              <Text fontSize="md" color={textColor}>
                • Developed and maintained core application features
                • Collaborated with cross-functional teams
                • Improved application performance by 30%
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Education */}
        <Box>
          <Heading 
            size="lg" 
            color={textColor} 
            mb={4}
            textTransform="uppercase"
            borderBottom="2px"
            borderColor={borderColor}
            pb={2}
          >
            Education
          </Heading>
          <Box>
            <HStack justify="space-between" mb={1}>
              <Heading size="md" color={textColor}>University of Technology</Heading>
              <Text fontSize="md" color={subTextColor}>2018</Text>
            </HStack>
            <Text fontSize="md" fontStyle="italic" color={subTextColor}>
              Bachelor of Science in Computer Science
            </Text>
            <Text fontSize="md" color={textColor} mt={2}>
              GPA: 3.8/4.0 • Dean's List • Computer Science Honor Society
            </Text>
          </Box>
        </Box>

        {/* Skills */}
        <Box>
          <Heading 
            size="lg" 
            color={textColor} 
            mb={4}
            textTransform="uppercase"
            borderBottom="2px"
            borderColor={borderColor}
            pb={2}
          >
            Technical Skills
          </Heading>
          <VStack align="stretch" spacing={2}>
            <HStack>
              <Text fontWeight="bold" color={textColor} minW="200px">
                Programming Languages:
              </Text>
              <Text color={textColor}>
                JavaScript, Python, Java, C++
              </Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color={textColor} minW="200px">
                Web Technologies:
              </Text>
              <Text color={textColor}>
                React, Node.js, HTML5, CSS3
              </Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color={textColor} minW="200px">
                Tools & Platforms:
              </Text>
              <Text color={textColor}>
                Git, AWS, Docker, Kubernetes
              </Text>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ClassicTemplate; 