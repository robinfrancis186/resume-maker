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
  Heading,
  Divider,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FaCloudUploadAlt, FaFileUpload, FaArrowRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { parseResume } from '../../services/resumeParser';
import { importResume } from '../../store/resumeSlice.ts';
import { useNavigate } from 'react-router-dom';

const ResumeUpload: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; // Only process the first file
    if (!file) return;

    setUploadedFile(file);
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
        title: 'Resume parsed successfully',
        description: 'Your resume content has been extracted. Choose a template to continue.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Navigate to template selection after successful upload
      navigate('/templates');
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
  }, [dispatch, toast, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/json': ['.json'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 1,
    disabled: isProcessing,
  });

  return (
    <VStack spacing={8} width="100%" py={8} px={4}>
      <VStack spacing={2} textAlign="center" maxW="600px">
        <Heading size="xl">Create Your Professional Resume</Heading>
        <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.300' }}>
          Upload your existing resume and let our AI transform it into a professionally formatted document
        </Text>
      </VStack>

      <Box
        maxW="600px"
        w="100%"
        p={8}
        borderRadius="xl"
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="xl"
      >
        <VStack spacing={6}>
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Text>
              Upload your existing resume in PDF, DOC, or DOCX format. We'll extract the content and let you choose from our professional templates.
            </Text>
          </Alert>

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
                    Analyzing your resume...
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
                      ? 'Drop your resume here'
                      : 'Drag and drop your resume here'}
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    Supports PDF, DOC, DOCX • Max 10MB
                  </Text>
                </>
              )}
            </VStack>
          </Box>

          <Divider />

          <HStack width="100%" justify="center">
            <Button
              leftIcon={<FaFileUpload />}
              onClick={() => document.querySelector('input')?.click()}
              colorScheme="blue"
              size="lg"
              isDisabled={isProcessing}
            >
              Browse Files
            </Button>
            {uploadedFile && !isProcessing && (
              <Button
                rightIcon={<FaArrowRight />}
                colorScheme="green"
                size="lg"
                onClick={() => navigate('/templates')}
              >
                Choose Template
              </Button>
            )}
          </HStack>
        </VStack>
      </Box>

      <VStack spacing={2} maxW="600px" textAlign="center">
        <Text fontSize="sm" color="gray.500">
          By uploading your resume, you agree to our{' '}
          <Link color="blue.400" href="/terms">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link color="blue.400" href="/privacy">
            Privacy Policy
          </Link>
        </Text>
      </VStack>
    </VStack>
  );
};

export default ResumeUpload; 