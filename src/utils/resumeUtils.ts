import { ResumeState } from '../types';

export function resumeToString(resume: ResumeState): string {
  const sections: string[] = [];

  // Personal Info
  sections.push('# PERSONAL INFORMATION');
  sections.push(`${resume.personalInfo.fullName}`);
  sections.push(`${resume.personalInfo.email} | ${resume.personalInfo.phone}`);
  sections.push(`${resume.personalInfo.location}`);
  if (resume.personalInfo.linkedin) sections.push(`LinkedIn: ${resume.personalInfo.linkedin}`);
  if (resume.personalInfo.github) sections.push(`GitHub: ${resume.personalInfo.github}`);
  if (resume.personalInfo.portfolio) sections.push(`Portfolio: ${resume.personalInfo.portfolio}`);

  // Professional Summary (if exists)
  if (resume.personalInfo.summary) {
    sections.push('\n# PROFESSIONAL SUMMARY');
    sections.push(resume.personalInfo.summary);
  }

  // Experience
  if (resume.experience.length > 0) {
    sections.push('\n# WORK EXPERIENCE');
    resume.experience.forEach(exp => {
      sections.push(`\n${exp.position} at ${exp.company}`);
      sections.push(`${exp.startDate} - ${exp.endDate || 'Present'}`);
      sections.push(exp.description.join('\n'));
    });
  }

  // Skills
  if (resume.skills.length > 0) {
    sections.push('\n# SKILLS');
    const skillsByCategory = resume.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill.name);
      return acc;
    }, {} as Record<string, string[]>);

    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      sections.push(`\n${category}:`);
      sections.push(skills.join(', '));
    });
  }

  // Education
  if (resume.education.length > 0) {
    sections.push('\n# EDUCATION');
    resume.education.forEach(edu => {
      sections.push(`\n${edu.degree}`);
      sections.push(`${edu.school}`);
      sections.push(`${edu.startDate} - ${edu.endDate || 'Present'}`);
      if (edu.gpa) sections.push(`GPA: ${edu.gpa}`);
    });
  }

  // Projects
  if (resume.projects.length > 0) {
    sections.push('\n# PROJECTS');
    resume.projects.forEach(project => {
      sections.push(`\n${project.name}`);
      if (project.link) sections.push(`URL: ${project.link}`);
      if (project.github) sections.push(`GitHub: ${project.github}`);
      sections.push(project.description);
      sections.push(`Technologies: ${project.technologies.join(', ')}`);
    });
  }

  // Certifications
  if (resume.certifications.length > 0) {
    sections.push('\n# CERTIFICATIONS');
    resume.certifications.forEach(cert => {
      sections.push(`\n${cert.name}`);
      if (cert.issuer) sections.push(`Issuer: ${cert.issuer}`);
      if (cert.date) sections.push(`Date: ${cert.date}`);
    });
  }

  return sections.join('\n');
} 