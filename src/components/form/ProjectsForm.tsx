import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Textarea,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { addProject, updateProject, removeProject } from '../../store/resumeSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Project } from '../../types/resume';

const ProjectsForm: React.FC = () => {
  const dispatch = useDispatch();
  const projects = useTypedSelector((state) => state.resume.projects);
  const toast = useToast();
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const project: Project = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      technologies: (formData.get('technologies') as string).split(',').map(t => t.trim()),
      link: formData.get('link') as string || undefined,
      github: formData.get('github') as string || undefined,
    };

    if (editIndex !== null) {
      dispatch(updateProject({ index: editIndex, project }));
      toast({
        title: 'Project updated',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      dispatch(addProject(project));
      toast({
        title: 'Project added',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }

    // Reset form
    e.currentTarget.reset();
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    const project = projects[index];
    const form = document.querySelector('form');
    if (form) {
      (form.elements.namedItem('name') as HTMLInputElement).value = project.name;
      (form.elements.namedItem('description') as HTMLTextAreaElement).value = project.description;
      (form.elements.namedItem('technologies') as HTMLInputElement).value = project.technologies.join(', ');
      if (project.link) {
        (form.elements.namedItem('link') as HTMLInputElement).value = project.link;
      }
      if (project.github) {
        (form.elements.namedItem('github') as HTMLInputElement).value = project.github;
      }
    }
  };

  const handleDelete = (index: number) => {
    dispatch(removeProject(index));
    toast({
      title: 'Project removed',
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
            <FormLabel>Project Name</FormLabel>
            <Input name="name" placeholder="Project name" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Project description"
              rows={3}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Technologies</FormLabel>
            <Input
              name="technologies"
              placeholder="React, Node.js, MongoDB"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Project URL</FormLabel>
            <Input name="link" type="url" placeholder="https://..." />
          </FormControl>

          <FormControl>
            <FormLabel>GitHub URL</FormLabel>
            <Input name="github" type="url" placeholder="https://github.com/..." />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            {editIndex !== null ? 'Update Project' : 'Add Project'}
          </Button>
        </VStack>
      </form>

      <VStack spacing={4} mt={4}>
        {projects.map((project, index) => (
          <HStack key={index} width="full" p={4} borderWidth={1} borderRadius="md">
            <VStack align="start" flex={1}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>Technologies: {project.technologies.join(', ')}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  Project Link
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>
              )}
            </VStack>
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete project"
              onClick={() => handleDelete(index)}
              colorScheme="red"
              variant="ghost"
            />
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default ProjectsForm; 