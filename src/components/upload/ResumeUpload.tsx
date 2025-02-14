import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  VStack,
  Text,
  Icon,
  Button,
  useToast,
  Link,
  HStack,
  Spinner,
} from '@chakra-ui/react';
import { FaCloudUploadAlt, FaFileUpload } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { parseResume } from '../../services/resumeParser';
import { importResume } from '../../store/resumeSlice';

const ResumeUpload: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const resumeData = await parseResume(file);
      dispatch(importResume(resumeData));
      
      toast({
        title: 'Resume uploaded successfully',
        description: 'Your resume content has been extracted and is ready for formatting.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to process resume',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  }, [dispatch, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/json': ['.json'],
    },
    maxSize: 200 * 1024 * 1024, // 200MB
    maxFiles: 1,
    disabled: isProcessing,
  });

  return (
    <VStack spacing={4} width="100%" py={8}>
      <Text fontSize="xl" fontWeight="bold">
        Upload your resume or any work-related data(PDF, JSON).{' '}
        <Link color="blue.400" href="#templates">
          Recommended templates
        </Link>
      </Text>

      <Box
        {...getRootProps()}
        width="100%"
        p={10}
        border="2px dashed"
        borderColor={isDragActive ? 'blue.400' : 'gray.300'}
        borderRadius="lg"
        bg={isDragActive ? 'blue.50' : 'gray.50'}
        _dark={{
          bg: isDragActive ? 'blue.900' : 'gray.700',
          borderColor: isDragActive ? 'blue.400' : 'gray.600',
        }}
        transition="all 0.2s"
        cursor={isProcessing ? 'wait' : 'pointer'}
        _hover={{
          borderColor: 'blue.400',
        }}
        opacity={isProcessing ? 0.7 : 1}
      >
        <input {...getInputProps()} disabled={isProcessing} />
        <VStack spacing={4}>
          {isProcessing ? (
            <>
              <Spinner size="xl" color="blue.400" />
              <Text fontSize="lg" textAlign="center">
                Processing your resume...
              </Text>
            </>
          ) : (
            <>
              <Icon
                as={isDragActive ? FaFileUpload : FaCloudUploadAlt}
                w={12}
                h={12}
                color={isDragActive ? 'blue.400' : 'gray.400'}
              />
              <Text fontSize="lg" textAlign="center">
                {isDragActive
                  ? 'Drop your file here'
                  : 'Drag and drop file here'}
              </Text>
              <Text color="gray.500" fontSize="sm">
                Limit 200MB per file • JSON, PDF
              </Text>
            </>
          )}
        </VStack>
      </Box>

      <HStack>
        <Button
          leftIcon={<FaFileUpload />}
          onClick={() => document.querySelector('input')?.click()}
          colorScheme="blue"
          size="lg"
          isDisabled={isProcessing}
        >
          Browse files
        </Button>
      </HStack>
    </VStack>
  );
};

export default ResumeUpload; 