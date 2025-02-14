import React, { useCallback, useState } from 'react';
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
  Progress,
  Image,
  SimpleGrid,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCloudUploadAlt, FaFileUpload, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { parseResume } from '../../services/resumeParser';
import { importResume } from '../../store/resumeSlice.ts';

interface UploadedFile {
  file: File;
  preview: string;
}

const ResumeUpload: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);

    for (const file of acceptedFiles) {
      setIsProcessing(true);
      setUploadProgress(0);
      
      try {
        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(interval);
              return prev;
            }
            return prev + 10;
          });
        }, 200);

        const resumeData = await parseResume(file);
        dispatch(importResume(resumeData));
        
        clearInterval(interval);
        setUploadProgress(100);
        
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
        setUploadProgress(0);
      }
    }
  }, [dispatch, toast]);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/json': ['.json'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxSize: 200 * 1024 * 1024, // 200MB
    disabled: isProcessing,
  });

  React.useEffect(() => {
    return () => {
      // Cleanup previews
      uploadedFiles.forEach(file => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [uploadedFiles]);

  return (
    <VStack spacing={4} width="100%" py={8}>
      <Text fontSize="xl" fontWeight="bold">
        Upload your resume or any work-related data.{' '}
        <Link color="blue.400" href="#templates">
          Recommended templates
        </Link>
      </Text>

      <Box
        {...getRootProps()}
        width="100%"
        p={10}
        border="2px dashed"
        borderColor={isDragActive ? 'blue.400' : borderColor}
        borderRadius="lg"
        bg={bgColor}
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
                Processing your file...
              </Text>
              <Progress
                width="100%"
                value={uploadProgress}
                size="sm"
                colorScheme="blue"
                hasStripe
                isAnimated
              />
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
                Supports PDF, JSON, PNG, JPG • Max 200MB
              </Text>
            </>
          )}
        </VStack>
      </Box>

      {uploadedFiles.length > 0 && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} width="100%">
          {uploadedFiles.map((file, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              position="relative"
            >
              {file.file.type.startsWith('image/') ? (
                <Image
                  src={file.preview}
                  alt={file.file.name}
                  width="100%"
                  height="150px"
                  objectFit="cover"
                />
              ) : (
                <Box
                  height="150px"
                  bg="gray.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text>{file.file.name}</Text>
                </Box>
              )}
              <IconButton
                aria-label="Remove file"
                icon={<FaTrash />}
                size="sm"
                position="absolute"
                top={2}
                right={2}
                colorScheme="red"
                onClick={() => removeFile(index)}
              />
            </Box>
          ))}
        </SimpleGrid>
      )}

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