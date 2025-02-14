import {
  Box,
  Container,
  HStack,
  Button,
  useColorModeValue,
  Spacer,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../common/Logo';

const Header = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const NavContent = () => (
    <SignedIn>
      <Button variant="ghost" onClick={() => navigate('/templates')}>
        Templates
      </Button>
      <Button variant="ghost" onClick={() => navigate('/builder')}>
        Build Resume
      </Button>
    </SignedIn>
  );

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

          {/* Desktop Navigation */}
          <Box display={{ base: 'none', md: 'block' }}>
            <HStack spacing={4}>
              <NavContent />
            </HStack>
          </Box>

          <Spacer />

          {/* Mobile Menu Button */}
          <Box display={{ base: 'block', md: 'none' }}>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              variant="ghost"
              onClick={onOpen}
            />
          </Box>

          {/* Auth Buttons */}
          <Box display={{ base: 'none', md: 'block' }}>
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
          </Box>
        </HStack>

        {/* Mobile Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch" pt={4}>
                <NavContent />
                <Box pt={4}>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button width="full">Sign In</Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <Box display="flex" justifyContent="center" pt={4}>
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
                    </Box>
                  </SignedIn>
                </Box>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Container>
    </Box>
  );
};

export default Header;