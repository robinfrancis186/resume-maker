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
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEducation } from '../../store/resumeSlice';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { useState } from 'react';

const EducationForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const education = useSelector((state) => state.resume.education);
  const [entries, setEntries] = useState(education.length > 0 ? education : [{}]);

  const handleAddEntry = () => {
    setEntries([...entries, {}]);
  };

  const handleRemoveEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
    dispatch(updateEducation(newEntries));
  };

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEducation(entries));
    toast({
      title: 'Education information updated',
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
              <Heading size="sm">Education #{index + 1}</Heading>
              <IconButton
                icon={<FaTrash />}
                colorScheme="red"
                variant="ghost"
                onClick={() => handleRemoveEntry(index)}
                aria-label="Remove education entry"
              />
            </HStack>

            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>School/University</FormLabel>
                <Input
                  value={entry.school || ''}
                  onChange={(e) => handleChange(index, 'school', e.target.value)}
                  placeholder="Harvard University"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Degree</FormLabel>
                <Input
                  value={entry.degree || ''}
                  onChange={(e) => handleChange(index, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
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
                <FormLabel>GPA</FormLabel>
                <Input
                  value={entry.gpa || ''}
                  onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                />
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
          Add Education
        </Button>

        <Button type="submit" colorScheme="purple">
          Save Education
        </Button>
      </VStack>
    </form>
  );
};

export default EducationForm; 