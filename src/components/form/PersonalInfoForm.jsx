import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo } from '../../store/resumeSlice';

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const personalInfo = useSelector((state) => state.resume.personalInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    dispatch(updatePersonalInfo(data));
    toast({
      title: 'Personal information updated',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            name="fullName"
            placeholder="John Doe"
            defaultValue={personalInfo.fullName}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="john@example.com"
            defaultValue={personalInfo.email}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            placeholder="+1 (234) 567-8900"
            defaultValue={personalInfo.phone}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            placeholder="City, Country"
            defaultValue={personalInfo.location}
          />
        </FormControl>

        <FormControl>
          <FormLabel>LinkedIn</FormLabel>
          <Input
            name="linkedin"
            placeholder="linkedin.com/in/johndoe"
            defaultValue={personalInfo.linkedin}
          />
        </FormControl>

        <FormControl>
          <FormLabel>GitHub</FormLabel>
          <Input
            name="github"
            placeholder="github.com/johndoe"
            defaultValue={personalInfo.github}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Portfolio Website</FormLabel>
          <Input
            name="portfolio"
            placeholder="johndoe.com"
            defaultValue={personalInfo.portfolio}
          />
        </FormControl>

        <Button type="submit" colorScheme="purple" mt={4}>
          Save Personal Info
        </Button>
      </VStack>
    </form>
  );
};

export default PersonalInfoForm; 