import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTemplate } from '../store/resumeSlice';

const Templates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'A clean and professional template with a modern design.',
      image: 'https://via.placeholder.com/400x500',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'A minimalist template that focuses on content.',
      image: 'https://via.placeholder.com/400x500',
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'A creative template for designers and artists.',
      image: 'https://via.placeholder.com/400x500',
    },
    // Add more templates as needed
  ];

  const handleSelectTemplate = (templateId) => {
    dispatch(setTemplate(templateId));
    navigate('/builder');
  };

  return (
    <Box bg={bgColor} minH="100vh" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={8} mb={12}>
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, purple.400, purple.600)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Choose Your Template
          </Heading>
          <Text fontSize="xl" textAlign="center" maxW="2xl">
            Select from our professionally designed templates to create your perfect resume.
            Each template is fully customizable to match your style.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {templates.map((template) => (
            <VStack
              key={template.id}
              bg={cardBg}
              p={6}
              borderRadius="lg"
              spacing={4}
              boxShadow="lg"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-4px)' }}
            >
              <Box
                borderRadius="md"
                overflow="hidden"
                boxShadow="md"
                width="100%"
              >
                <Image
                  src={template.image}
                  alt={template.name}
                  width="100%"
                  height="auto"
                />
              </Box>
              <Heading size="md">{template.name}</Heading>
              <Text textAlign="center" color="gray.500">
                {template.description}
              </Text>
              <Button
                colorScheme="purple"
                size="lg"
                width="full"
                onClick={() => handleSelectTemplate(template.id)}
              >
                Use Template
              </Button>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Templates; 