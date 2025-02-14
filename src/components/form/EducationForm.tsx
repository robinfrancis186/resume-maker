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
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { updateEducation, addEducation, removeEducation } from '../../store/resumeSlice.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Education } from '../../types';

const EducationForm: React.FC = () => {
  const education = useTypedSelector((state) => state.resume.education);
  const dispatch = useDispatch();
  const toast = useToast();
  const [entries, setEntries] = useState<Education[]>(education);

  useEffect(() => {
    setEntries(education);
  }, [education]);

  const handleAddEntry = () => {
    const newEducation: Education = {
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    };
    dispatch(addEducation(newEducation));
  };

  const handleRemoveEntry = (index: number) => {
    dispatch(removeEducation(index));
  };

  const handleChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation: Education = {
      ...entries[index],
      [field]: value,
    };
    dispatch(updateEducation({ index, education: updatedEducation }));
  };

  return (
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
                value={entry.gpa || ''}
                onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                placeholder="Enter GPA (optional)"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                value={entry.description || ''}
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
    </VStack>
  );
};

export default EducationForm; 