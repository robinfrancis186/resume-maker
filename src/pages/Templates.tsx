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
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional format with a timeless design. Ideal for experienced professionals across industries.',
      image: '/templates/classic.png',
    },
    {
      id: 'clean-modern',
      name: 'Clean Modern',
      description: 'Contemporary design with a focus on clarity and visual hierarchy. Great for tech and creative professionals.',
      image: '/templates/clean-modern.png',
    },
    {
      id: 'entry-level',
      name: 'Entry Level',
      description: 'Perfect for students and recent graduates. Clean and professional layout that highlights education and skills.',
      image: '/templates/entry-level.png',
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
          <Text 
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
            _dark={{ color: 'gray.400' }}
            maxW="800px"
            mx="auto"
          >
            Select from our professionally designed templates to create your perfect resume. 
            Each template is fully customizable to match your style.
          </Text>
        </Box>

        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3 }} 
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
              bg="white"
              _dark={{ bg: 'gray.800' }}
              _hover={{
                transform: 'translateY(-4px)',
                shadow: 'lg',
                borderColor: 'primary.500',
              }}
            >
              <Box 
                position="relative"
                height="400px"
                bg="gray.100"
                _dark={{ bg: 'gray.700' }}
              >
                <Image
                  src={template.image}
                  alt={template.name}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  fallback={
                    <Box
                      width="100%"
                      height="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="gray.100"
                      _dark={{ bg: 'gray.700' }}
                    >
                      <Text color="gray.500">Loading preview...</Text>
                    </Box>
                  }
                />
              </Box>
              
              <Box p={{ base: 4, md: 6 }}>
                <Heading 
                  size="lg" 
                  mb={2}
                  color="gray.800"
                  _dark={{ color: 'white' }}
                >
                  {template.name}
                </Heading>
                <Text 
                  mb={4}
                  color="gray.600"
                  _dark={{ color: 'gray.400' }}
                >
                  {template.description}
                </Text>
                <Button
                  colorScheme="primary"
                  onClick={() => navigate(`/builder?template=${template.id}`)}
                  w="full"
                  size="lg"
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