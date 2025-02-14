import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { generateContent } from '../../services/gemini';
import { AIContentGeneratorProps } from '../../types';

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ isOpen, onClose, onGenerated, type, placeholder }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const generatedContent = await generateContent(content);
      onGenerated(generatedContent);
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Generate {type} Content</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            size="sm"
            rows={6}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleGenerate} isLoading={isLoading}>
            Generate
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AIContentGenerator; 