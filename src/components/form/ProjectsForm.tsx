import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  IconButton,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { updateProjects } from '../../store/resumeSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Project } from '../../types/resume';

interface ProjectEntry extends Project {}

const ProjectsForm: React.FC = () => {
  const projects = useTypedSelector((state) => state.resume.projects);
  const dispatch = useDispatch();
  const toast = useToast();
  const [entries, setEntries] = useState<ProjectEntry[]>(projects);

  const handleAddEntry = () => {
    setEntries([
      ...entries,
      {
        name: '',
        description: '',
        technologies: [],
        link: '',
        github: ''
      },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleChange = (index: number, field: keyof ProjectEntry, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      [field]: value,
    };
    setEntries(newEntries);
  };

  const handleAddTechnology = (index: number, tech: string) => {
    if (!tech.trim()) return;
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      technologies: [...(newEntries[index].technologies || []), tech.trim()],
    };
    setEntries(newEntries);
  };

  const handleRemoveTechnology = (index: number, tech: string) => {
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      technologies: newEntries[index].technologies.filter((t) => t !== tech),
    };
    setEntries(newEntries);
  };

  const handleSubmit = (e: FormEvent) => {
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
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        {entries.map((entry, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <FormControl isRequired>
                  <FormLabel>Project Name</FormLabel>
                  <Input
                    value={entry.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    placeholder="Enter project name"
                  />
                </FormControl>
                <IconButton
                  aria-label="Remove project"
                  icon={<DeleteIcon />}
                  onClick={() => handleRemoveEntry(index)}
                  colorScheme="red"
                />
              </HStack>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={entry.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="Enter project description"
                  minH="150px"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Technologies</FormLabel>
                <HStack>
                  <Input
                    placeholder="Add technology"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTechnology(index, (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                </HStack>
                <Wrap spacing={2} mt={2}>
                  {entry.technologies?.map((tech) => (
                    <WrapItem key={tech}>
                      <Tag size="md" colorScheme="primary" borderRadius="full">
                        <TagLabel>{tech}</TagLabel>
                        <TagCloseButton
                          onClick={() => handleRemoveTechnology(index, tech)}
                        />
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              </FormControl>

              <FormControl>
                <FormLabel>Live Demo URL</FormLabel>
                <Input
                  value={entry.link}
                  onChange={(e) => handleChange(index, 'link', e.target.value)}
                  placeholder="https://example.com"
                  type="url"
                />
              </FormControl>

              <FormControl>
                <FormLabel>GitHub URL</FormLabel>
                <Input
                  value={entry.github}
                  onChange={(e) => handleChange(index, 'github', e.target.value)}
                  placeholder="https://github.com/username/repo"
                  type="url"
                />
              </FormControl>
            </VStack>
          </Box>
        ))}

        <Button onClick={handleAddEntry} colorScheme="blue">
          Add Project
        </Button>

        <Button type="submit" colorScheme="green">
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default ProjectsForm; 