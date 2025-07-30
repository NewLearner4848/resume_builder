export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  gradDate: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phoneNumber: string;
  linkedIn: string;
  github: string;
  website: string;
  professionalSummary: string;
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
}

export type TemplateName = 'classic' | 'modern' | 'executive' | 'creative' | 'minimalist';