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
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjects } from '../../store/resumeSlice';
import { FaTrash, FaPlus, FaMagic } from 'react-icons/fa';
import { useState } from 'react';
import AIContentGenerator from '../common/AIContentGenerator';

const ProjectsForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const projects = useSelector((state) => state.resume.projects);
  const [entries, setEntries] = useState(projects.length > 0 ? projects : [{}]);
  const [currentTech, setCurrentTech] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddEntry = () => {
    setEntries([...entries, { technologies: [] }]);
  };

  const handleRemoveEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
    dispatch(updateProjects(newEntries));
  };

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const handleAddTechnology = (index, tech) => {
    if (tech.trim()) {
      const newEntries = [...entries];
      const technologies = newEntries[index].technologies || [];
      newEntries[index] = {
        ...newEntries[index],
        technologies: [...technologies, tech.trim()],
      };
      setEntries(newEntries);
      setCurrentTech('');
    }
  };

  const handleRemoveTechnology = (index, tech) => {
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      technologies: newEntries[index].technologies.filter((t) => t !== tech),
    };
    setEntries(newEntries);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProjects(entries));
    toast({
      title: 'Projects updated',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
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
              <Heading size="sm">Project #{index + 1}</Heading>
              <IconButton
                icon={<FaTrash />}
                colorScheme="red"
                variant="ghost"
                onClick={() => handleRemoveEntry(index)}
                aria-label="Remove project entry"
              />
            </HStack>

            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Project Name</FormLabel>
                <Input
                  value={entry.name || ''}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  placeholder="E-commerce Platform"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Project URL</FormLabel>
                <Input
                  value={entry.url || ''}
                  onChange={(e) => handleChange(index, 'url', e.target.value)}
                  placeholder="https://github.com/username/project"
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
                  placeholder="• Developed a full-stack e-commerce platform
• Implemented secure payment processing
• Integrated inventory management system"
                  rows={4}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Technologies Used</FormLabel>
                <HStack>
                  <Input
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    placeholder="React, Node.js, MongoDB"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTechnology(index, currentTech);
                      }
                    }}
                  />
                  <IconButton
                    icon={<FaPlus />}
                    colorScheme="purple"
                    onClick={() => handleAddTechnology(index, currentTech)}
                    aria-label="Add technology"
                  />
                </HStack>
                <Wrap spacing={2} mt={2}>
                  {entry.technologies?.map((tech) => (
                    <WrapItem key={tech}>
                      <Tag
                        size="md"
                        borderRadius="full"
                        variant="solid"
                        colorScheme="purple"
                      >
                        <TagLabel>{tech}</TagLabel>
                        <TagCloseButton
                          onClick={() => handleRemoveTechnology(index, tech)}
                        />
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              </FormControl>
            </VStack>
          </Box>
        ))}

        <Button
          leftIcon={<FaPlus />}
          onClick={handleAddEntry}
          colorScheme="purple"
          variant="ghost"
        >
          Add Project
        </Button>

        <Button type="submit" colorScheme="purple">
          Save Projects
        </Button>
      </VStack>

      <AIContentGenerator
        isOpen={isOpen}
        onClose={onClose}
        onGenerated={handleAIGenerated}
        type="project"
        placeholder="Describe your project, its features, technologies used, and impact. For example: Built a full-stack e-commerce platform using React and Node.js, implementing secure payment processing..."
      />
    </form>
  );
};

export default ProjectsForm; 