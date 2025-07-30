
import type { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  fullName: 'Olivia Chen',
  email: 'olivia.chen@email.com',
  phoneNumber: '123-456-7890',
  linkedIn: 'linkedin.com/in/oliviachen',
  github: 'github.com/oliviachen',
  website: 'oliviachen.dev',
  professionalSummary: `Seasoned Full-Stack Developer with over 8 years of experience in designing, developing, and deploying scalable web applications. Proficient in JavaScript, React, Node.js, and cloud technologies. Passionate about creating intuitive user experiences and solving complex problems. I led a team to improve application performance by 30%.`,
  skills: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'AWS', 'Docker', 'CI/CD', 'Agile Methodologies'],
  workExperience: [
    {
      id: 'work1',
      jobTitle: 'Senior Software Engineer',
      company: 'Innovate Solutions Inc.',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: `- Led the development of a new customer-facing analytics dashboard using React and D3.js.\n- Mentored junior engineers and conducted code reviews to maintain code quality.\n- Worked on a project to migrate our main application from a monolith to microservices.\n- Improved API response times by optimizing database queries.`
    },
    {
      id: 'work2',
      jobTitle: 'Software Engineer',
      company: 'Tech Forward LLC',
      startDate: 'Jun 2016',
      endDate: 'Dec 2019',
      description: '- Developed and maintained features for a large-scale e-commerce platform.\n- Wrote unit and integration tests to ensure application reliability.\n- Collaborated with product managers and designers to translate requirements into technical solutions.'
    }
  ],
  education: [
    {
      id: 'edu1',
      degree: 'B.S. in Computer Science',
      school: 'University of Technology',
      gradDate: 'May 2016'
    }
  ]
};
