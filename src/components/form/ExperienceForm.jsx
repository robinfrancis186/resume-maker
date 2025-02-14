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
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExperience } from '../../store/resumeSlice';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { useState } from 'react';

const ExperienceForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const experience = useSelector((state) => state.resume.experience);
  const [entries, setEntries] = useState(experience.length > 0 ? experience : [{}]);

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
                <FormLabel>Description</FormLabel>
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
          colorScheme="purple"
          variant="ghost"
        >
          Add Experience
        </Button>

        <Button type="submit" colorScheme="purple">
          Save Experience
        </Button>
      </VStack>
    </form>
  );
};

export default ExperienceForm; 