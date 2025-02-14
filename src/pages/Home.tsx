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
  Stack,
} from '@chakra-ui/react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { FaFeather, FaMagic, FaDownload, FaPalette } from 'react-icons/fa';
import Logo from '../components/common/Logo';

const Feature = ({ icon, title, description }: { icon: React.ElementType; title: string; description: string }) => {
  return (
    <VStack
      align="start"
      p={{ base: 4, md: 6 }}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg"
      boxShadow="md"
      height="100%"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.100', 'gray.700')}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
        borderColor: useColorModeValue('primary.100', 'primary.700'),
      }}
    >
      <Icon as={icon} boxSize={6} color="primary.500" mb={2} />
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text fontSize={{ base: 'sm', md: 'md' }}>
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
      <Container maxW="container.xl" py={{ base: 8, md: 20 }} px={{ base: 4, md: 8 }}>
        <VStack spacing={{ base: 8, md: 12 }} align="center">
          {/* Hero Section */}
          <VStack spacing={{ base: 4, md: 6 }} textAlign="center" maxW="800px">
            <Logo size="lg" />
            <Heading
              size={{ base: 'xl', md: '2xl' }}
              bgGradient="linear(to-r, primary.400, accent.400)"
              bgClip="text"
              px={{ base: 4, md: 0 }}
            >
              Create Professional Resumes with AI
            </Heading>
            <Text 
              fontSize={{ base: 'md', md: 'xl' }}
              px={{ base: 4, md: 0 }}
            >
              Build stunning resumes effortlessly with our AI-powered platform.
              Choose from professional templates and get intelligent content suggestions.
            </Text>
            <Stack 
              direction={{ base: 'column', sm: 'row' }} 
              spacing={4} 
              pt={4}
              w={{ base: 'full', sm: 'auto' }}
            >
              <SignedOut>
                <SignInButton mode="modal">
                  <Button 
                    size="lg" 
                    colorScheme="primary"
                    w={{ base: 'full', sm: 'auto' }}
                  >
                    Get Started
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button
                  size="lg"
                  colorScheme="primary"
                  onClick={() => navigate('/builder')}
                  w={{ base: 'full', sm: 'auto' }}
                >
                  Create Resume
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="primary"
                  onClick={() => navigate('/templates')}
                  w={{ base: 'full', sm: 'auto' }}
                >
                  Browse Templates
                </Button>
              </SignedIn>
            </Stack>
          </VStack>

          {/* Features Section */}
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 4 }} 
            spacing={{ base: 4, md: 8 }} 
            w="full"
            px={{ base: 4, md: 0 }}
          >
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