import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  IconButton,
  Box,
  Heading,
  useToast,
  HStack,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExperience } from '../../store/resumeSlice';
import { FaTrash, FaPlus, FaMagic } from 'react-icons/fa';
import { useState } from 'react';
import AIContentGenerator from '../common/AIContentGenerator';

const ExperienceForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const experience = useSelector((state) => state.resume.experience);
  const [entries, setEntries] = useState(experience.length > 0 ? experience : [{}]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddEntry = () => {
    setEntries([...entries, {}]);
  };

  const handleRemoveEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
    dispatch(updateExperience(newEntries));
  };

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateExperience(entries));
    toast({
      title: 'Work experience updated',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleGenerateContent = (index) => {
    setSelectedIndex(index);
    onOpen();
  };

  const handleAIGenerated = (content) => {
    if (selectedIndex !== null) {
      handleChange(selectedIndex, 'description', content);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        {entries.map((entry, index) => (
          <Box
            key={index}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            position="relative"
          >
            <HStack justify="space-between" mb={4}>
              <Heading size="sm">Experience #{index + 1}</Heading>
              <IconButton
                icon={<FaTrash />}
                colorScheme="red"
                variant="ghost"
                onClick={() => handleRemoveEntry(index)}
                aria-label="Remove experience entry"
              />
            </HStack>

            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Company</FormLabel>
                <Input
                  value={entry.company || ''}
                  onChange={(e) => handleChange(index, 'company', e.target.value)}
                  placeholder="Google"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Position</FormLabel>
                <Input
                  value={entry.position || ''}
                  onChange={(e) => handleChange(index, 'position', e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </FormControl>

              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="month"
                    value={entry.startDate || ''}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <Input
                    type="month"
                    value={entry.endDate || ''}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  />
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  value={entry.location || ''}
                  onChange={(e) => handleChange(index, 'location', e.target.value)}
                  placeholder="Mountain View, CA"
                />
              </FormControl>

              <FormControl isRequired>
                <HStack justify="space-between" align="center">
                  <FormLabel mb={0}>Description</FormLabel>
                  <Button
                    size="sm"
                    leftIcon={<FaMagic />}
                    variant="outline"
                    onClick={() => handleGenerateContent(index)}
                  >
                    Generate with AI
                  </Button>
                </HStack>
                <Textarea
                  value={entry.description || ''}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="• Led a team of 5 engineers in developing a new feature
• Improved system performance by 50%
• Implemented CI/CD pipeline"
                  rows={5}
                />
              </FormControl>
            </VStack>
          </Box>
        ))}

        <Button
          leftIcon={<FaPlus />}
          onClick={handleAddEntry}
          variant="ghost"
        >
          Add Experience
        </Button>

        <Button type="submit">
          Save Experience
        </Button>
      </VStack>

      <AIContentGenerator
        isOpen={isOpen}
        onClose={onClose}
        onGenerated={handleAIGenerated}
        type="experience"
        placeholder="Describe your role, responsibilities, and achievements. For example: Led a team of software engineers at Google, working on the Chrome browser's performance optimization..."
      />
    </form>
  );
};

export default ExperienceForm; 