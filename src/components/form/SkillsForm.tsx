import React, { useState } from 'react';
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
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { addSkill, updateSkill, removeSkill } from '../../store/resumeSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Skill } from '../../types/resume';

const SkillsForm: React.FC = () => {
  const skills = useTypedSelector((state) => state.resume.skills);
  const dispatch = useDispatch();
  const toast = useToast();
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skill: Skill = {
      category: formData.get('category') as string,
      name: formData.get('name') as string,
    };

    if (editIndex !== null) {
      dispatch(updateSkill({ index: editIndex, skill }));
      toast({
        title: 'Skill updated',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      dispatch(addSkill(skill));
      toast({
        title: 'Skill added',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }

    // Reset form
    e.currentTarget.reset();
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    dispatch(removeSkill(index));
    toast({
      title: 'Skill removed',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Input name="category" placeholder="e.g., Programming Languages, Tools, Soft Skills" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Skill Name</FormLabel>
            <Input name="name" placeholder="e.g., JavaScript, React, Leadership" />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            {editIndex !== null ? 'Update Skill' : 'Add Skill'}
          </Button>
        </VStack>
      </form>

      <VStack spacing={4} mt={4}>
        {Object.entries(
          skills.reduce<Record<string, string[]>>((acc, skill) => {
            if (!acc[skill.category]) {
              acc[skill.category] = [];
            }
            acc[skill.category].push(skill.name);
            return acc;
          }, {})
        ).map(([category, skillNames]) => (
          <Box key={category} width="full">
            <FormLabel>{category}</FormLabel>
            <Wrap spacing={2}>
              {skillNames.map((name) => {
                const index = skills.findIndex(
                  (s) => s.category === category && s.name === name
                );
                return (
                  <WrapItem key={`${category}-${name}`}>
                    <Tag size="lg" colorScheme="blue" borderRadius="full">
                      <TagLabel>{name}</TagLabel>
                      <TagCloseButton onClick={() => handleDelete(index)} />
                    </Tag>
                  </WrapItem>
                );
              })}
            </Wrap>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default SkillsForm; 