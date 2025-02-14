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
import { setSelectedTemplate } from '../store/store';

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with a modern touch',
    image: '/templates/modern.png',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume layout that stands the test of time',
    image: '/templates/classic.png',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Stand out with a unique and creative design',
    image: '/templates/creative.png',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content',
    image: '/templates/minimal.png',
  },
];

const Templates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleSelectTemplate = (templateId: string) => {
    dispatch(setSelectedTemplate(templateId));
    navigate('/builder');
  };

  return (
    <Box bg={bgColor} minH="calc(100vh - 72px)" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={8} mb={12}>
          <Heading
            size="2xl"
            bgGradient="linear(to-r, blue.400, cyan.400)"
            bgClip="text"
          >
            Choose Your Template
          </Heading>
          <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')} textAlign="center">
            Select from our professionally designed templates to create your perfect resume
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {templates.map((template) => (
            <Box
              key={template.id}
              bg={cardBg}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-4px)' }}
            >
              <Image
                src={template.image}
                alt={template.name}
                w="full"
                h="300px"
                objectFit="cover"
              />
              <VStack p={6} align="start" spacing={3}>
                <Heading size="md">{template.name}</Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                  {template.description}
                </Text>
                <Button
                  colorScheme="blue"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  Use Template
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Templates; 