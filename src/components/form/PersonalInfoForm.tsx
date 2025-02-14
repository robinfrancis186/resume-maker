import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { updatePersonalInfo } from '../../store/resumeSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { PersonalInfo } from '../../types/resume';

const PersonalInfoForm: React.FC = () => {
  const personalInfo = useTypedSelector((state) => state.resume.personalInfo);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: PersonalInfo = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      portfolio: formData.get('portfolio') as string,
      linkedin: formData.get('linkedin') as string,
      github: formData.get('github') as string,
    };
    dispatch(updatePersonalInfo(data));
    toast({
      title: 'Personal information updated',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            name="fullName"
            defaultValue={personalInfo.fullName}
            placeholder="John Doe"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            defaultValue={personalInfo.email}
            placeholder="john@example.com"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            type="tel"
            defaultValue={personalInfo.phone}
            placeholder="(555) 123-4567"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            defaultValue={personalInfo.location}
            placeholder="San Francisco, CA"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Portfolio Website</FormLabel>
          <Input
            name="portfolio"
            type="url"
            defaultValue={personalInfo.portfolio}
            placeholder="https://portfolio.com"
          />
        </FormControl>

        <FormControl>
          <FormLabel>LinkedIn Profile</FormLabel>
          <Input
            name="linkedin"
            type="url"
            defaultValue={personalInfo.linkedin}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </FormControl>

        <FormControl>
          <FormLabel>GitHub Profile</FormLabel>
          <Input
            name="github"
            type="url"
            defaultValue={personalInfo.github}
            placeholder="https://github.com/johndoe"
          />
        </FormControl>

        <Button type="submit" colorScheme="green">
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default PersonalInfoForm; 