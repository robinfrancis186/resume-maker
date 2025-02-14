import React, { useState, useEffect } from 'react';
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
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { updateExperience, addExperience, removeExperience } from '../../store/resumeSlice.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Experience } from '../../types';

const ExperienceForm: React.FC = () => {
  const experience = useTypedSelector((state) => state.resume.experience);
  const dispatch = useDispatch();
  const toast = useToast();
  const [entries, setEntries] = useState<Experience[]>(experience);

  useEffect(() => {
    setEntries(experience);
  }, [experience]);

  const handleAddEntry = () => {
    const newExperience: Experience = {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: [],
    };
    dispatch(addExperience(newExperience));
  };

  const handleRemoveEntry = (index: number) => {
    dispatch(removeExperience(index));
  };

  const handleChange = (index: number, field: keyof Experience, value: string | string[]) => {
    const updatedExperience: Experience = {
      ...entries[index],
      [field]: field === 'description' && typeof value === 'string'
        ? value.split('\n').filter(line => line.trim() !== '')
        : value,
    };
    dispatch(updateExperience({ index, experience: updatedExperience }));
  };

  return (
    <VStack spacing={4} align="stretch">
      {entries.map((entry, index) => (
        <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <FormControl isRequired>
                <FormLabel>Company</FormLabel>
                <Input
                  value={entry.company}
                  onChange={(e) => handleChange(index, 'company', e.target.value)}
                  placeholder="Enter company name"
                />
              </FormControl>
              <IconButton
                aria-label="Remove experience"
                icon={<DeleteIcon />}
                onClick={() => handleRemoveEntry(index)}
                colorScheme="red"
              />
            </HStack>

            <FormControl isRequired>
              <FormLabel>Position</FormLabel>
              <Input
                value={entry.position}
                onChange={(e) => handleChange(index, 'position', e.target.value)}
                placeholder="Enter job title"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                value={entry.location}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                placeholder="Enter location"
              />
            </FormControl>

            <HStack>
              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="month"
                  value={entry.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="month"
                  value={entry.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={entry.description.join('\n')}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                placeholder="Enter job responsibilities (one per line)"
                minH="150px"
              />
            </FormControl>
          </VStack>
        </Box>
      ))}

      <Button onClick={handleAddEntry} colorScheme="blue">
        Add Experience
      </Button>
    </VStack>
  );
};

export default ExperienceForm; 