import React from 'react';
import {
  SimpleGrid,
  Box,
  VStack,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setTemplate } from '../../store/resumeSlice.ts';
import ImagePreview from '../common/ImagePreview';

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  image: string;
}

const templates: TemplateOption[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional format with a timeless design. Ideal for experienced professionals across industries.',
    image: '/images/templates/classic-preview.png',
  },
  {
    id: 'modern',
    name: 'Clean Modern',
    description: 'Contemporary design with a focus on clarity and visual hierarchy. Great for tech and creative professionals.',
    image: '/images/templates/modern-preview.png',
  },
  {
    id: 'entry',
    name: 'Entry Level',
    description: 'Perfect for students and recent graduates. Clean and professional layout that highlights education and skills.',
    image: '/images/templates/entry-preview.png',
  },
];

const TemplateSelection: React.FC = () => {
  const dispatch = useDispatch();
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgColor = useColorModeValue('white', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.600');

  const handleTemplateSelect = (templateId: string) => {
    dispatch(setTemplate(templateId));
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} p={4}>
      {templates.map((template) => (
        <Box
          key={template.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          borderColor={borderColor}
          bg={bgColor}
          _hover={{ bg: hoverBg }}
          transition="all 0.2s"
        >
          <ImagePreview
            src={template.image}
            alt={`${template.name} template preview`}
            width="100%"
            height="250px"
          />
          <VStack p={6} spacing={3} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">
              {template.name}
            </Text>
            <Text color="gray.600" _dark={{ color: 'gray.300' }}>
              {template.description}
            </Text>
            <Button
              colorScheme="blue"
              onClick={() => handleTemplateSelect(template.id)}
              size="lg"
              width="100%"
            >
              Use Template
            </Button>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default TemplateSelection; 