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
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { updateExperience, addExperience } from '../../store/resumeSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Experience } from '../../types/resume';

interface ExperienceEntry extends Experience {}

const ExperienceForm: React.FC = () => {
  const experience = useTypedSelector((state) => state.resume.experience);
  const dispatch = useDispatch();
  const toast = useToast();
  const [entries, setEntries] = useState<ExperienceEntry[]>(experience);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddEntry = () => {
    setEntries([
      ...entries,
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: []
      },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleChange = (index: number, field: keyof ExperienceEntry, value: string | string[]) => {
    const newEntries = [...entries];
    if (field === 'description' && typeof value === 'string') {
      newEntries[index] = {
        ...newEntries[index],
        description: value.split('\n').filter(line => line.trim() !== '')
      };
    } else {
      newEntries[index] = {
        ...newEntries[index],
        [field]: value,
      };
    }
    setEntries(newEntries);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const experience: Experience = {
      company: formData.get('company') as string,
      position: formData.get('position') as string,
      location: formData.get('location') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string || '',
      description: (formData.get('description') as string).split('\n').filter(line => line.trim() !== ''),
    };

    if (editIndex !== null) {
      dispatch(updateExperience({ index: editIndex, experience }));
      toast({
        title: 'Experience updated',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      dispatch(addExperience(experience));
      toast({
        title: 'Experience added',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    
    // Reset form
    e.currentTarget.reset();
    setEditIndex(null);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
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

        <Button type="submit" colorScheme="green">
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default ExperienceForm; 