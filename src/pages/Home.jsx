import { Box, Button, Container, Heading, Text, VStack, HStack, Image, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaRegFileAlt } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="container.xl" py={20}>
        <VStack spacing={8} textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, purple.400, purple.600)"
            bgClip="text"
            fontWeight="extrabold"
          >
            AI-Powered Resume Builder
          </Heading>
          
          <Text fontSize="xl" color={textColor} maxW="2xl">
            Create professional resumes in minutes with our AI-powered platform.
            Choose from modern templates and get real-time previews of your resume.
          </Text>

          <HStack spacing={4} pt={8}>
            <Button
              size="lg"
              colorScheme="purple"
              leftIcon={<FaRocket />}
              onClick={() => navigate('/builder')}
            >
              Create Resume
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorScheme="purple"
              leftIcon={<FaRegFileAlt />}
              onClick={() => navigate('/templates')}
            >
              View Templates
            </Button>
          </HStack>

          <Box mt={16}>
            <VStack spacing={8}>
              <Heading size="lg">Key Features</Heading>
              <HStack spacing={8} wrap="wrap" justify="center">
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    p={6}
                    bg="white"
                    rounded="xl"
                    shadow="md"
                    maxW="sm"
                    textAlign="left"
                  >
                    <feature.icon size="24px" color="purple.500" />
                    <Heading size="md" mt={4} mb={2}>
                      {feature.title}
                    </Heading>
                    <Text color={textColor}>{feature.description}</Text>
                  </Box>
                ))}
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

const features = [
  {
    title: 'AI-Powered Content',
    description: 'Let AI help you write professional descriptions and improve your content.',
    icon: FaRocket,
  },
  {
    title: 'Modern Templates',
    description: 'Choose from a variety of professionally designed templates.',
    icon: FaRegFileAlt,
  },
  // Add more features as needed
];

export default Home; 