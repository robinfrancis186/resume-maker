import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  HStack,
  Link,
  Tag,
  Divider,
  Button,
  useColorModeValue,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe, FaRobot } from 'react-icons/fa';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import html2pdf from 'html2pdf.js';
import { ResumeState } from '../../types';
import { analyzeResume, ATSAnalysisResult } from '../../services/atsScoring';
import { resumeToString } from '../../utils/resumeUtils';
import ATSScoreModal from './ATSScoreModal';
import ModernTemplate from './ModernTemplate';
import CreativeTemplate from './CreativeTemplate';
import ClassicTemplate from './ClassicTemplate';

interface ResumePreviewProps {
  data: ResumeState;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showATSScore, setShowATSScore] = useState(false);
  const [atsAnalysis, setATSAnalysis] = useState<ATSAnalysisResult | null>(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const toast = useToast();

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    const opt = {
      margin: 1,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
    
    toast({
      title: 'Resume Downloaded',
      description: 'Your resume has been downloaded as a PDF.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleATSAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      const resumeText = resumeToString(data);
      const analysis = await analyzeResume(resumeText);
      setATSAnalysis(analysis);
      setShowATSScore(true);
    } catch (error) {
      toast({
        title: 'Analysis Failed',
        description: error instanceof Error ? error.message : 'Failed to analyze resume',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderTemplate = () => {
    switch (data.selectedTemplate) {
      case 'modern':
        return <ModernTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      case 'classic':
        return <ClassicTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  return (
    <Box position="relative">
      <HStack position="absolute" top={4} right={4} spacing={2} zIndex={1}>
        <Button
          leftIcon={<Icon as={FaRobot} />}
          colorScheme="blue"
          onClick={handleATSAnalysis}
          isLoading={isAnalyzing}
          loadingText="Analyzing..."
        >
          ATS Score
        </Button>
      </HStack>

      <VStack spacing={4} align="stretch">
        <Button
          colorScheme="purple"
          onClick={handleDownloadPDF}
          mb={4}
        >
          Download PDF
        </Button>

        <Box
          id="resume-preview"
          bg={bgColor}
          p={8}
          borderRadius="md"
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow="lg"
        >
          {/* Header Section */}
          <VStack spacing={2} align="center" mb={6}>
            <Heading size="xl">{data.personalInfo.fullName}</Heading>
            <HStack spacing={4} wrap="wrap" justify="center">
              {data.personalInfo.email && (
                <HStack>
                  <FaEnvelope />
                  <Text>{data.personalInfo.email}</Text>
                </HStack>
              )}
              {data.personalInfo.phone && (
                <HStack>
                  <FaPhone />
                  <Text>{data.personalInfo.phone}</Text>
                </HStack>
              )}
              {data.personalInfo.location && (
                <HStack>
                  <FaMapMarkerAlt />
                  <Text>{data.personalInfo.location}</Text>
                </HStack>
              )}
            </HStack>
            <HStack spacing={4} wrap="wrap" justify="center">
              {data.personalInfo.linkedin && (
                <Link href={data.personalInfo.linkedin} isExternal>
                  <HStack>
                    <FaLinkedin />
                    <Text>LinkedIn</Text>
                  </HStack>
                </Link>
              )}
              {data.personalInfo.github && (
                <Link href={data.personalInfo.github} isExternal>
                  <HStack>
                    <FaGithub />
                    <Text>GitHub</Text>
                  </HStack>
                </Link>
              )}
              {data.personalInfo.portfolio && (
                <Link href={data.personalInfo.portfolio} isExternal>
                  <HStack>
                    <FaGlobe />
                    <Text>Portfolio</Text>
                  </HStack>
                </Link>
              )}
            </HStack>
          </VStack>

          {/* Experience Section */}
          {data.experience.length > 0 && (
            <>
              <Heading size="md" mb={4}>Experience</Heading>
              <VStack spacing={4} align="stretch" mb={6}>
                {data.experience.map((exp, index) => (
                  <Box key={index}>
                    <HStack justify="space-between" mb={2}>
                      <VStack align="start" spacing={0}>
                        <Heading size="sm">{exp.position}</Heading>
                        <Text fontWeight="bold">{exp.company}</Text>
                      </VStack>
                      <VStack align="end" spacing={0}>
                        <Text>{exp.location}</Text>
                        <Text>
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </Text>
                      </VStack>
                    </HStack>
                    <Text whiteSpace="pre-line">{exp.description.join('\n')}</Text>
                  </Box>
                ))}
              </VStack>
              <Divider mb={6} />
            </>
          )}

          {/* Education Section */}
          {data.education.length > 0 && (
            <>
              <Heading size="md" mb={4}>Education</Heading>
              <VStack spacing={4} align="stretch" mb={6}>
                {data.education.map((edu, index) => (
                  <Box key={index}>
                    <HStack justify="space-between" mb={2}>
                      <VStack align="start" spacing={0}>
                        <Heading size="sm">{edu.school}</Heading>
                        <Text fontWeight="bold">{edu.degree} in {edu.fieldOfStudy}</Text>
                      </VStack>
                      <VStack align="end" spacing={0}>
                        <Text>
                          {edu.startDate} - {edu.endDate || 'Present'}
                        </Text>
                        {edu.gpa && <Text>GPA: {edu.gpa}</Text>}
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
              <Divider mb={6} />
            </>
          )}

          {/* Skills Section */}
          {data.skills.length > 0 && (
            <Box mb={6}>
              <Heading size="md" mb={4}>Skills</Heading>
              {Object.entries(
                data.skills.reduce<Record<string, string[]>>((acc, skill) => {
                  if (!acc[skill.category]) {
                    acc[skill.category] = [];
                  }
                  acc[skill.category].push(skill.name);
                  return acc;
                }, {})
              ).map(([category, skills]) => (
                <Box key={category} mb={4}>
                  <Heading size="sm" mb={2}>
                    {category}
                  </Heading>
                  <HStack wrap="wrap" spacing={2}>
                    {skills.map((skill) => (
                      <Tag key={skill} colorScheme="blue" size="md">
                        {skill}
                      </Tag>
                    ))}
                  </HStack>
                </Box>
              ))}
            </Box>
          )}

          {/* Projects Section */}
          {data.projects.length > 0 && (
            <>
              <Heading size="md" mb={4}>Projects</Heading>
              <VStack spacing={4} align="stretch">
                {data.projects.map((project, index) => (
                  <Box key={index}>
                    <HStack justify="space-between" mb={2}>
                      <Heading size="sm">
                        {project.link ? (
                          <Link href={project.link} isExternal color="purple.500">
                            {project.name}
                          </Link>
                        ) : (
                          project.name
                        )}
                      </Heading>
                    </HStack>
                    <Text whiteSpace="pre-line" mb={2}>{project.description}</Text>
                    {project.technologies?.length > 0 && (
                      <HStack wrap="wrap" spacing={2}>
                        {project.technologies.map((tech) => (
                          <Tag
                            key={tech}
                            size="sm"
                            colorScheme="purple"
                            variant="outline"
                          >
                            {tech}
                          </Tag>
                        ))}
                      </HStack>
                    )}
                  </Box>
                ))}
              </VStack>
            </>
          )}
        </Box>
      </VStack>

      {atsAnalysis && (
        <ATSScoreModal
          isOpen={showATSScore}
          onClose={() => setShowATSScore(false)}
          analysis={atsAnalysis}
        />
      )}
    </Box>
  );
};

export default ResumePreview; 