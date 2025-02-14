import {
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';

const ResumeForm = ({ activeSection, setActiveSection }) => {
  const dispatch = useDispatch();
  const tabBg = useColorModeValue('white', 'gray.800');

  const sections = [
    { name: 'personal', label: 'Personal Info', component: PersonalInfoForm },
    { name: 'education', label: 'Education', component: EducationForm },
    { name: 'experience', label: 'Experience', component: ExperienceForm },
    { name: 'skills', label: 'Skills', component: SkillsForm },
    { name: 'projects', label: 'Projects', component: ProjectsForm },
  ];

  const handleTabChange = (index) => {
    setActiveSection(sections[index].name);
  };

  return (
    <VStack spacing={8} align="stretch">
      <Tabs
        isFitted
        variant="enclosed"
        index={sections.findIndex((s) => s.name === activeSection)}
        onChange={handleTabChange}
      >
        <TabList mb="1em">
          {sections.map((section) => (
            <Tab
              key={section.name}
              _selected={{ bg: tabBg, borderBottom: '3px solid', borderColor: 'purple.500' }}
            >
              {section.label}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {sections.map((section) => (
            <TabPanel key={section.name}>
              <section.component />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default ResumeForm; 