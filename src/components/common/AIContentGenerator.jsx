import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  VStack,
  useToast,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { generateContent } from '../../services/gemini';
import { FaMagic } from 'react-icons/fa';

const AIContentGenerator = ({ isOpen, onClose, onGenerated, type, placeholder }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Please enter a prompt',
        status: 'warning',
        duration: 2000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const content = await generateContent(prompt, type);
      onGenerated(content);
      onClose();
      toast({
        title: 'Content generated successfully',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error generating content',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="brand.smoke">
        <ModalHeader color="brand.wine">AI Content Generator</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} pb={6}>
            <Text>
              Describe your role, project, or background, and let AI help you create professional content.
            </Text>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={placeholder}
              rows={6}
              disabled={isLoading}
            />
            <Button
              leftIcon={isLoading ? <Spinner size="sm" /> : <FaMagic />}
              onClick={handleGenerate}
              isLoading={isLoading}
              width="full"
            >
              Generate Content
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AIContentGenerator; 