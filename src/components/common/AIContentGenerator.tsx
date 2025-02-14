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
  VStack,
  Text,
  Select,
  FormControl,
  FormLabel,
  Tooltip,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { FaLightbulb, FaInfoCircle } from 'react-icons/fa';
import { generateContent } from '../../services/gemini';

interface AIContentGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (content: string) => void;
  type: 'experience' | 'project' | 'summary' | 'skills' | 'education' | 'achievements';
  placeholder: string;
}

const SECTION_INFO = {
  experience: {
    title: 'Work Experience',
    tooltip: 'Describe your role, responsibilities, and key achievements',
    example: 'Senior Software Engineer at Tech Corp, leading a team of 5 developers...',
  },
  project: {
    title: 'Project Details',
    tooltip: 'Describe the project, technologies used, and your contribution',
    example: 'Built a full-stack e-commerce platform using React, Node.js, and MongoDB...',
  },
  summary: {
    title: 'Professional Summary',
    tooltip: 'Provide an overview of your background and key qualifications',
    example: '5 years of experience in full-stack development with expertise in React...',
  },
  skills: {
    title: 'Skills',
    tooltip: 'List your technical skills, tools, and technologies',
    example: 'Full-stack development, React, Node.js, AWS, Agile methodologies...',
  },
  education: {
    title: 'Education',
    tooltip: 'Describe your educational background and relevant coursework',
    example: 'B.S. in Computer Science with focus on software engineering...',
  },
  achievements: {
    title: 'Achievement',
    tooltip: 'Describe a specific accomplishment or milestone',
    example: 'Reduced application load time by 40% through optimization...',
  },
};

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({
  isOpen,
  onClose,
  onGenerated,
  type,
  placeholder,
}) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const toast = useToast();

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const generatedContent = await generateContent(content, type);
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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack spacing={2}>
            <Icon as={FaLightbulb} color="yellow.400" />
            <Text>Generate {SECTION_INFO[type].title} Content</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <HStack spacing={2} mb={2}>
                <FormLabel mb={0}>Input</FormLabel>
                <Tooltip label={SECTION_INFO[type].tooltip} placement="top">
                  <Icon as={FaInfoCircle} color="gray.500" />
                </Tooltip>
              </HStack>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={SECTION_INFO[type].example}
                size="sm"
                rows={6}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleGenerate}
            isLoading={isLoading}
            leftIcon={<FaLightbulb />}
          >
            Generate Content
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AIContentGenerator; 