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
} from '@chakra-ui/react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import html2pdf from 'html2pdf.js';

const ResumePreview = () => {
  const resume = useSelector((state) => state.resume);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: 1,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
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
          <Heading size="xl">{resume.personalInfo.fullName}</Heading>
          <HStack spacing={4} wrap="wrap" justify="center">
            {resume.personalInfo.email && (
              <HStack>
                <FaEnvelope />
                <Text>{resume.personalInfo.email}</Text>
              </HStack>
            )}
            {resume.personalInfo.phone && (
              <HStack>
                <FaPhone />
                <Text>{resume.personalInfo.phone}</Text>
              </HStack>
            )}
            {resume.personalInfo.location && (
              <HStack>
                <FaMapMarkerAlt />
                <Text>{resume.personalInfo.location}</Text>
              </HStack>
            )}
          </HStack>
          <HStack spacing={4} wrap="wrap" justify="center">
            {resume.personalInfo.linkedin && (
              <Link href={resume.personalInfo.linkedin} isExternal>
                <HStack>
                  <FaLinkedin />
                  <Text>LinkedIn</Text>
                </HStack>
              </Link>
            )}
            {resume.personalInfo.github && (
              <Link href={resume.personalInfo.github} isExternal>
                <HStack>
                  <FaGithub />
                  <Text>GitHub</Text>
                </HStack>
              </Link>
            )}
            {resume.personalInfo.portfolio && (
              <Link href={resume.personalInfo.portfolio} isExternal>
                <HStack>
                  <FaGlobe />
                  <Text>Portfolio</Text>
                </HStack>
              </Link>
            )}
          </HStack>
        </VStack>

        {/* Experience Section */}
        {resume.experience.length > 0 && (
          <>
            <Heading size="md" mb={4}>Experience</Heading>
            <VStack spacing={4} align="stretch" mb={6}>
              {resume.experience.map((exp, index) => (
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
                  <Text whiteSpace="pre-line">{exp.description}</Text>
                </Box>
              ))}
            </VStack>
            <Divider mb={6} />
          </>
        )}

        {/* Education Section */}
        {resume.education.length > 0 && (
          <>
            <Heading size="md" mb={4}>Education</Heading>
            <VStack spacing={4} align="stretch" mb={6}>
              {resume.education.map((edu, index) => (
                <Box key={index}>
                  <HStack justify="space-between" mb={2}>
                    <VStack align="start" spacing={0}>
                      <Heading size="sm">{edu.school}</Heading>
                      <Text fontWeight="bold">{edu.degree}</Text>
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
        {resume.skills.length > 0 && (
          <>
            <Heading size="md" mb={4}>Skills</Heading>
            <VStack spacing={4} align="stretch" mb={6}>
              {Object.entries(
                resume.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill.name);
                  return acc;
                }, {})
              ).map(([category, skills]) => (
                <Box key={category}>
                  <Text fontWeight="bold" mb={2}>{category}</Text>
                  <HStack wrap="wrap" spacing={2}>
                    {skills.map((skill) => (
                      <Tag
                        key={skill}
                        size="md"
                        colorScheme="purple"
                        borderRadius="full"
                      >
                        {skill}
                      </Tag>
                    ))}
                  </HStack>
                </Box>
              ))}
            </VStack>
            <Divider mb={6} />
          </>
        )}

        {/* Projects Section */}
        {resume.projects.length > 0 && (
          <>
            <Heading size="md" mb={4}>Projects</Heading>
            <VStack spacing={4} align="stretch">
              {resume.projects.map((project, index) => (
                <Box key={index}>
                  <HStack justify="space-between" mb={2}>
                    <Heading size="sm">
                      {project.url ? (
                        <Link href={project.url} isExternal color="purple.500">
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
  );
};

export default ResumePreview; 