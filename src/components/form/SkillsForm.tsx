import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  useToast,
} from '@chakra-ui/react';
import { updateSkills } from '../../store/resumeSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Skill } from '../../types/resume';

interface SkillsByCategory {
  [key: string]: string[];
}

const SkillsForm: React.FC = () => {
  const skills = useTypedSelector((state) => state.resume.skills);
  const dispatch = useDispatch();
  const toast = useToast();

  const initialSkillsByCategory = skills.reduce<SkillsByCategory>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  const [category, setCategory] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skillsByCategory, setSkillsByCategory] = useState<SkillsByCategory>(initialSkillsByCategory);

  const handleAddSkill = (e: FormEvent) => {
    e.preventDefault();
    if (!category || !skillInput) return;

    const skills = skillInput.split(',').map(s => s.trim()).filter(s => s);
    if (skills.length === 0) return;

    setSkillsByCategory(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), ...skills],
    }));

    setSkillInput('');
  };

  const handleRemoveSkill = (category: string, skill: string) => {
    setSkillsByCategory(prev => ({
      ...prev,
      [category]: skillsByCategory[category].filter((s) => s !== skill),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedSkills: Skill[] = Object.entries(skillsByCategory).flatMap(
      ([category, skills]) =>
        skills.map((skill) => ({ category, name: skill }))
    );
    dispatch(updateSkills(updatedSkills));
    toast({
      title: 'Skills updated',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <Box as="form" onSubmit={handleAddSkill}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Skill Category</FormLabel>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Programming Languages, Tools, Soft Skills"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Skills (comma-separated)</FormLabel>
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Add Skills
            </Button>
          </VStack>
        </Box>

        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <Box key={category} borderWidth="1px" borderRadius="lg" p={4}>
            <FormLabel>{category}</FormLabel>
            <Wrap spacing={2}>
              {skills.map((skill) => (
                <WrapItem key={skill}>
                  <Tag size="lg" colorScheme="primary" borderRadius="full">
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

        <Button type="submit" colorScheme="green">
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default SkillsForm; 