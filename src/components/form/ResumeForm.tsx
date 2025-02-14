import React from 'react';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import ProjectsForm from './ProjectsForm';
import SkillsForm from './SkillsForm';
import { ResumeSection } from '../../types/resume';

interface ResumeFormProps {
  activeSection: ResumeSection;
  setActiveSection: (section: ResumeSection) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ activeSection, setActiveSection }) => {
  const handleTabChange = (index: number) => {
    const sections: ResumeSection[] = ['personal', 'education', 'experience', 'projects', 'skills'];
    setActiveSection(sections[index]);
  };

  const getTabIndex = () => {
    const sections: ResumeSection[] = ['personal', 'education', 'experience', 'projects', 'skills'];
    return sections.indexOf(activeSection);
  };

  return (
    <Box>
      <Tabs
        index={getTabIndex()}
        onChange={handleTabChange}
        variant="enclosed"
        colorScheme="primary"
      >
        <TabList>
          <Tab>Personal Info</Tab>
          <Tab>Education</Tab>
          <Tab>Experience</Tab>
          <Tab>Projects</Tab>
          <Tab>Skills</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PersonalInfoForm />
          </TabPanel>
          <TabPanel>
            <EducationForm />
          </TabPanel>
          <TabPanel>
            <ExperienceForm />
          </TabPanel>
          <TabPanel>
            <ProjectsForm />
          </TabPanel>
          <TabPanel>
            <SkillsForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ResumeForm; 