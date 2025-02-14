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
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { updateEducation } from '../../store/resumeSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Education } from '../../types/resume';

interface EducationEntry extends Education {}

const EducationForm: React.FC = () => {
  const education = useTypedSelector((state) => state.resume.education);
  const dispatch = useDispatch();
  const toast = useToast();
  const [entries, setEntries] = useState<EducationEntry[]>(education);

  const handleAddEntry = () => {
    setEntries([
      ...entries,
      {
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: ''
      },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleChange = (index: number, field: keyof EducationEntry, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      [field]: value,
    };
    setEntries(newEntries);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateEducation(entries));
    toast({
      title: 'Education updated',
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
                  <FormLabel>School</FormLabel>
                  <Input
                    value={entry.school}
                    onChange={(e) => handleChange(index, 'school', e.target.value)}
                    placeholder="Enter school name"
                  />
                </FormControl>
                <IconButton
                  aria-label="Remove education"
                  icon={<DeleteIcon />}
                  onClick={() => handleRemoveEntry(index)}
                  colorScheme="red"
                />
              </HStack>

              <FormControl isRequired>
                <FormLabel>Degree</FormLabel>
                <Input
                  value={entry.degree}
                  onChange={(e) => handleChange(index, 'degree', e.target.value)}
                  placeholder="Enter degree"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Field of Study</FormLabel>
                <Input
                  value={entry.fieldOfStudy}
                  onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
                  placeholder="Enter field of study"
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

              <FormControl>
                <FormLabel>GPA</FormLabel>
                <Input
                  value={entry.gpa}
                  onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                  placeholder="Enter GPA (optional)"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  value={entry.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="Enter additional details (optional)"
                />
              </FormControl>
            </VStack>
          </Box>
        ))}

        <Button onClick={handleAddEntry} colorScheme="blue">
          Add Education
        </Button>

        <Button type="submit" colorScheme="green">
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default EducationForm; 