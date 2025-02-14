import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { FaFeather, FaMagic, FaDownload, FaPalette } from 'react-icons/fa';
import Logo from '../components/common/Logo';

const Feature = ({ icon, title, description }: { icon: React.ElementType; title: string; description: string }) => {
  return (
    <VStack
      align="start"
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg"
      boxShadow="md"
      height="100%"
    >
      <Icon as={icon} boxSize={8} color="blue.500" mb={2} />
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>
        {description}
      </Text>
    </VStack>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box bg={bgColor} minH="calc(100vh - 72px)">
      <Container maxW="container.xl" py={20}>
        <VStack spacing={12} align="center">
          {/* Hero Section */}
          <VStack spacing={6} textAlign="center" maxW="800px">
            <Logo size="lg" />
            <Heading
              size="2xl"
              bgGradient="linear(to-r, blue.400, cyan.400)"
              bgClip="text"
            >
              Create Professional Resumes with AI
            </Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')}>
              Build stunning resumes effortlessly with our AI-powered platform.
              Choose from professional templates and get intelligent content suggestions.
            </Text>
            <HStack spacing={4} pt={4}>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="lg" colorScheme="blue">
                    Get Started
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button
                  size="lg"
                  colorScheme="blue"
                  onClick={() => navigate('/builder')}
                >
                  Create Resume
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => navigate('/templates')}
                >
                  Browse Templates
                </Button>
              </SignedIn>
            </HStack>
          </VStack>

          {/* Features Section */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
            <Feature
              icon={FaMagic}
              title="AI-Powered"
              description="Get intelligent suggestions for your resume content using advanced AI technology."
            />
            <Feature
              icon={FaPalette}
              title="Professional Templates"
              description="Choose from a variety of professionally designed templates to make your resume stand out."
            />
            <Feature
              icon={FaFeather}
              title="Easy Editing"
              description="Intuitive interface for quick and easy resume creation and editing."
            />
            <Feature
              icon={FaDownload}
              title="Export Options"
              description="Download your resume in multiple formats including PDF with perfect formatting."
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home; 