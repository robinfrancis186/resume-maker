import {
  Box,
  Container,
  HStack,
  Button,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';

const Header = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="header"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      py={4}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="container.xl">
        <HStack spacing={4}>
          <Button variant="ghost" onClick={() => navigate('/')} p={2}>
            <Logo size="sm" />
          </Button>
          <SignedIn>
            <Button variant="ghost" onClick={() => navigate('/templates')}>
              Templates
            </Button>
            <Button variant="ghost" onClick={() => navigate('/builder')}>
              Build Resume
            </Button>
          </SignedIn>
          <Spacer />
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    width: '2.5rem',
                    height: '2.5rem',
                  },
                },
              }}
            />
          </SignedIn>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;