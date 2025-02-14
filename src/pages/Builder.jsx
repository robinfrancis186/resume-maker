import { Box, Grid, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ResumeForm from '../components/form/ResumeForm';
import ResumePreview from '../components/resume/ResumePreview';

const Builder = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const [activeSection, setActiveSection] = useState('personal');
  const resumeData = useSelector((state) => state.resume);

  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
      gap={0}
      minH="100vh"
      bg={bgColor}
    >
      {/* Form Section */}
      <Box
        p={8}
        overflowY="auto"
        maxH="100vh"
        borderRight="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <ResumeForm
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </Box>

      {/* Preview Section */}
      <Box p={8} overflowY="auto" maxH="100vh">
        <ResumePreview data={resumeData} />
      </Box>
    </Grid>
  );
};

export default Builder; 