import React from 'react';
import {
  Box,
  VStack,
  Text,
  Heading,
  HStack,
  Divider,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';

interface TemplatePreviewProps {
  type: 'entry-level' | 'classic' | 'clean-modern';
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ type }) => {
  const styles = {
    'entry-level': {
      headerBg: '#1F2937',
      fontFamily: 'Georgia, serif',
      headerColor: 'white',
      spacing: { base: 4, md: 6 },
      sectionSpacing: { base: 6, md: 8 },
    },
    'classic': {
      headerBg: '#374151',
      fontFamily: 'Times New Roman, serif',
      headerColor: 'white',
      spacing: { base: 3, md: 4 },
      sectionSpacing: { base: 4, md: 6 },
    },
    'clean-modern': {
      headerBg: '#1A365D',
      fontFamily: 'Inter, sans-serif',
      headerColor: 'white',
      spacing: { base: 6, md: 8 },
      sectionSpacing: { base: 8, md: 10 },
    },
  };

  const currentStyle = styles[type];
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      w="full"
      bg="white"
      _dark={{ bg: 'gray.800' }}
      style={{ fontFamily: currentStyle.fontFamily }}
    >
      {/* Header */}
      <Box bg={currentStyle.headerBg} color={currentStyle.headerColor} p={{ base: 4, md: 8 }}>
        <VStack align="center" spacing={{ base: 1, md: 2 }}>
          <Heading size={{ base: "md", md: "lg" }}>John Smith</Heading>
          <Text fontSize={{ base: "sm", md: "md" }}>Software Engineer</Text>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={{ base: 1, md: 4 }}
            fontSize={{ base: "xs", md: "sm" }}
            mt={{ base: 1, md: 2 }}
            textAlign="center"
          >
            <Text>john@email.com</Text>
            <Text display={{ base: 'none', sm: 'block' }}>•</Text>
            <Text>(555) 123-4567</Text>
            <Text display={{ base: 'none', sm: 'block' }}>•</Text>
            <Text>San Francisco, CA</Text>
          </Stack>
        </VStack>
      </Box>

      {/* Content */}
      <VStack 
        align="stretch" 
        p={{ base: 4, md: 8 }} 
        spacing={currentStyle.sectionSpacing}
      >
        {/* Experience */}
        <Box>
          <Heading 
            size={{ base: "sm", md: "md" }} 
            mb={{ base: 2, md: 4 }} 
            color={currentStyle.headerBg}
          >
            Experience
          </Heading>
          <VStack align="stretch" spacing={currentStyle.spacing}>
            <Box>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                justify="space-between"
                mb={{ base: 1, md: 2 }}
              >
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                  Senior Software Engineer
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }}>2020 - Present</Text>
              </Stack>
              <Text 
                color="gray.600" 
                _dark={{ color: 'gray.300' }} 
                mb={{ base: 1, md: 2 }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Tech Company, Inc.
              </Text>
              <Text fontSize={{ base: "xs", md: "sm" }}>
                • Led development of key features resulting in 40% user growth
              </Text>
            </Box>
            <Divider borderColor={borderColor} />
            <Box>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                justify="space-between"
                mb={{ base: 1, md: 2 }}
              >
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                  Software Engineer
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }}>2018 - 2020</Text>
              </Stack>
              <Text 
                color="gray.600" 
                _dark={{ color: 'gray.300' }} 
                mb={{ base: 1, md: 2 }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Startup Co.
              </Text>
              <Text fontSize={{ base: "xs", md: "sm" }}>
                • Developed and maintained core application features
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Education */}
        <Box>
          <Heading 
            size={{ base: "sm", md: "md" }} 
            mb={{ base: 2, md: 4 }} 
            color={currentStyle.headerBg}
          >
            Education
          </Heading>
          <VStack align="stretch" spacing={currentStyle.spacing}>
            <Box>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                justify="space-between"
                mb={{ base: 1, md: 2 }}
              >
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                  Bachelor of Science in Computer Science
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }}>2018</Text>
              </Stack>
              <Text 
                color="gray.600" 
                _dark={{ color: 'gray.300' }}
                fontSize={{ base: "sm", md: "md" }}
              >
                University Name
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Skills */}
        <Box>
          <Heading 
            size={{ base: "sm", md: "md" }} 
            mb={{ base: 2, md: 4 }} 
            color={currentStyle.headerBg}
          >
            Skills
          </Heading>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            JavaScript • React • Node.js • Python • SQL • AWS
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default TemplatePreview; 