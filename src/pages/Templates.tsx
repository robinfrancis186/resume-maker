import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import TemplatePreview from '../components/resume/TemplatePreview';

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const templates = [
    {
      id: 'entry-level',
      name: 'Entry Level',
      description: 'Perfect for students and recent graduates. Clean and professional layout that highlights education and skills.',
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional format with a timeless design. Ideal for experienced professionals across industries.',
    },
    {
      id: 'clean-modern',
      name: 'Clean Modern',
      description: 'Contemporary design with a focus on clarity and visual hierarchy. Great for tech and creative professionals.',
    },
  ];

  return (
    <Container maxW="container.xl" py={{ base: 4, md: 8 }} px={{ base: 4, md: 8 }}>
      <VStack spacing={{ base: 6, md: 8 }} align="stretch">
        <Box textAlign="center" px={{ base: 4, md: 0 }}>
          <Heading
            size={{ base: "xl", md: "2xl" }}
            bgGradient="linear(to-r, primary.400, accent.400)"
            bgClip="text"
            mb={{ base: 2, md: 4 }}
          >
            Choose Your Template
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }}>
            Select a professional template to get started with your resume
          </Text>
        </Box>

        <SimpleGrid 
          columns={{ base: 1, lg: 3 }} 
          spacing={{ base: 6, md: 8 }}
          px={{ base: 2, md: 0 }}
        >
          {templates.map((template) => (
            <Box
              key={template.id}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              overflow="hidden"
              transition="all 0.2s"
              _hover={{
                transform: 'translateY(-4px)',
                shadow: 'lg',
                bg: hoverBg,
              }}
            >
              <Box 
                height={{ base: "400px", md: "500px" }} 
                overflowY="auto"
                sx={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'gray.300',
                    borderRadius: '24px',
                  },
                }}
              >
                <TemplatePreview type={template.id as any} />
              </Box>
              
              <Box p={{ base: 4, md: 6 }}>
                <Heading size="md" mb={{ base: 1, md: 2 }}>
                  {template.name}
                </Heading>
                <Text 
                  mb={{ base: 3, md: 4 }}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  {template.description}
                </Text>
                <Button
                  colorScheme="primary"
                  onClick={() => navigate(`/builder?template=${template.id}`)}
                  w="full"
                  size={{ base: "md", md: "lg" }}
                >
                  Use Template
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Templates; 