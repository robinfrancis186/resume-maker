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
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSkills } from '../../store/resumeSlice';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';

const SkillsForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const skills = useSelector((state) => state.resume.skills);
  const [skillInput, setSkillInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [skillsByCategory, setSkillsByCategory] = useState(
    skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill.name);
      return acc;
    }, {}) || { 'Technical Skills': [] }
  );

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && categoryInput.trim()) {
      const category = categoryInput.trim();
      const newSkills = {
        ...skillsByCategory,
        [category]: [...(skillsByCategory[category] || []), skillInput.trim()],
      };
      setSkillsByCategory(newSkills);
      setSkillInput('');

      // Convert to array format for Redux store
      const skillsArray = Object.entries(newSkills).flatMap(([category, skills]) =>
        skills.map((skill) => ({ category, name: skill }))
      );
      dispatch(updateSkills(skillsArray));

      toast({
        title: 'Skill added',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const handleRemoveSkill = (category, skill) => {
    const newSkills = {
      ...skillsByCategory,
      [category]: skillsByCategory[category].filter((s) => s !== skill),
    };
    
    // Remove category if empty
    if (newSkills[category].length === 0) {
      delete newSkills[category];
    }
    
    setSkillsByCategory(newSkills);

    // Convert to array format for Redux store
    const skillsArray = Object.entries(newSkills).flatMap(([category, skills]) =>
      skills.map((skill) => ({ category, name: skill }))
    );
    dispatch(updateSkills(skillsArray));
  };

  return (
    <VStack spacing={6} align="stretch">
      <form onSubmit={handleAddSkill}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Input
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="e.g., Technical Skills, Soft Skills, Languages"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Skill</FormLabel>
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="e.g., React.js, Project Management, Spanish"
            />
          </FormControl>

          <Button
            type="submit"
            leftIcon={<FaPlus />}
            colorScheme="purple"
            width="full"
          >
            Add Skill
          </Button>
        </VStack>
      </form>

      <VStack spacing={4} align="stretch" mt={6}>
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <Box key={category} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="sm" mb={4}>
              {category}
            </Heading>
            <Wrap spacing={2}>
              {skills.map((skill) => (
                <WrapItem key={skill}>
                  <Tag
                    size="lg"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="purple"
                  >
                    <TagLabel>{skill}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleRemoveSkill(category, skill)}
                    />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default SkillsForm; 