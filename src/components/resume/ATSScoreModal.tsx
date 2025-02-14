import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Progress,
  Heading,
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { ATSAnalysisResult } from '../../services/atsScoring';

interface ATSScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ATSAnalysisResult;
}

const ATSScoreModal: React.FC<ATSScoreModalProps> = ({
  isOpen,
  onClose,
  analysis,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const sectionBg = useColorModeValue('gray.50', 'gray.700');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>
          <HStack spacing={2}>
            <Text>ATS Score Analysis</Text>
            <Badge
              colorScheme={getScoreColor(analysis.score)}
              fontSize="lg"
              px={3}
              py={1}
              borderRadius="full"
            >
              {analysis.score}/100
            </Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            {/* Overall Score */}
            <Box>
              <Progress
                value={analysis.score}
                colorScheme={getScoreColor(analysis.score)}
                size="lg"
                borderRadius="full"
                mb={2}
              />
            </Box>

            {/* Keyword Optimization */}
            <Box p={4} bg={sectionBg} borderRadius="md">
              <Heading size="sm" mb={2}>
                Keyword Optimization
              </Heading>
              <Text>{analysis.keywordOptimization}</Text>
            </Box>

            {/* Format Review */}
            <Box p={4} bg={sectionBg} borderRadius="md">
              <Heading size="sm" mb={2}>
                Format Review
              </Heading>
              <Text>{analysis.formatReview}</Text>
            </Box>

            {/* Section Feedback */}
            <Box p={4} bg={sectionBg} borderRadius="md">
              <Heading size="sm" mb={4}>
                Section-by-Section Feedback
              </Heading>
              <VStack spacing={3} align="stretch">
                <Box>
                  <Text fontWeight="bold">Professional Summary</Text>
                  <Text fontSize="sm">{analysis.sectionFeedback.summary}</Text>
                </Box>
                <Divider />
                <Box>
                  <Text fontWeight="bold">Work Experience</Text>
                  <Text fontSize="sm">{analysis.sectionFeedback.experience}</Text>
                </Box>
                <Divider />
                <Box>
                  <Text fontWeight="bold">Skills</Text>
                  <Text fontSize="sm">{analysis.sectionFeedback.skills}</Text>
                </Box>
                <Divider />
                <Box>
                  <Text fontWeight="bold">Education</Text>
                  <Text fontSize="sm">{analysis.sectionFeedback.education}</Text>
                </Box>
              </VStack>
            </Box>

            {/* Improvements */}
            <Box p={4} bg={sectionBg} borderRadius="md">
              <Heading size="sm" mb={2}>
                Suggested Improvements
              </Heading>
              <List spacing={2}>
                {analysis.improvements.map((improvement, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FaInfoCircle} color="blue.500" />
                    {improvement}
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Missing Keywords */}
            <Box p={4} bg={sectionBg} borderRadius="md">
              <Heading size="sm" mb={2}>
                Missing Keywords
              </Heading>
              <List spacing={2}>
                {analysis.missingKeywords.map((keyword, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FaExclamationCircle} color="orange.500" />
                    {keyword}
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Formatting Issues */}
            <Box p={4} bg={sectionBg} borderRadius="md">
              <Heading size="sm" mb={2}>
                Formatting Issues
              </Heading>
              <List spacing={2}>
                {analysis.formattingIssues.length > 0 ? (
                  analysis.formattingIssues.map((issue, index) => (
                    <ListItem key={index}>
                      <ListIcon as={FaTimesCircle} color="red.500" />
                      {issue}
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    No formatting issues detected
                  </ListItem>
                )}
              </List>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ATSScoreModal; 