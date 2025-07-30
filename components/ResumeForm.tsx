import React, { useCallback, useState } from 'react';
import type { Education, ResumeData, WorkExperience } from '../types';
import { Accordion } from './Accordion';

interface ResumeFormProps {
  initialData: ResumeData;
  onFormChange: (data: ResumeData) => void;
  onOpenEnhanceModal: (field: 'professionalSummary' | 'workExperience', text: string, index?: number) => void;
  accentColor: string;
}

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L9.5 8.5L4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5z" />
        <title>Enhance with AI</title>
    </svg>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <input id={id} {...props} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm" />
  </div>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <textarea id={id} {...props} rows={5} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm" />
  </div>
);

export const ResumeForm: React.FC<ResumeFormProps> = ({ initialData, onFormChange, onOpenEnhanceModal }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = useCallback(<T,>(field: keyof ResumeData, value: T) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    onFormChange(newFormData);
  }, [formData, onFormChange]);

  const handleNestedChange = useCallback(<K extends keyof ResumeData>(section: K, index: number, field: any, value: any) => {
    const sectionData = formData[section] as any[];
    const updatedSection = [...sectionData];
    updatedSection[index] = { ...updatedSection[index], [field]: value };
    handleChange(section, updatedSection);
  }, [formData, handleChange]);

  const addExperience = () => {
    const newExperience: WorkExperience = { id: `work${Date.now()}`, jobTitle: '', company: '', startDate: '', endDate: '', description: '' };
    handleChange('workExperience', [...formData.workExperience, newExperience]);
  };
  
  const removeExperience = (index: number) => {
    const newExperiences = formData.workExperience.filter((_, i) => i !== index);
    handleChange('workExperience', newExperiences);
  };
  
  const addEducation = () => {
    const newEducation: Education = { id: `edu${Date.now()}`, degree: '', school: '', gradDate: '' };
    handleChange('education', [...formData.education, newEducation]);
  };
  
  const removeEducation = (index: number) => {
    const newEducations = formData.education.filter((_, i) => i !== index);
    handleChange('education', newEducations);
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('skills', e.target.value.split(',').map(skill => skill.trim()).filter(Boolean));
  };

  return (
    <div className="space-y-4">
      <Accordion title="Personal Details" defaultOpen={true}>
        <div className="grid grid-cols-1 gap-4">
          <Input label="Full Name" id="fullName" value={formData.fullName} onChange={e => handleChange('fullName', e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Email" id="email" type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} />
            <Input label="Phone Number" id="phoneNumber" value={formData.phoneNumber} onChange={e => handleChange('phoneNumber', e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="LinkedIn Profile" id="linkedIn" value={formData.linkedIn} onChange={e => handleChange('linkedIn', e.target.value)} />
            <Input label="GitHub Profile" id="github" value={formData.github} onChange={e => handleChange('github', e.target.value)} />
          </div>
          <Input label="Website / Portfolio" id="website" value={formData.website} onChange={e => handleChange('website', e.target.value)} />
        </div>
      </Accordion>

      <Accordion title="Professional Summary">
        <div className="relative">
          <Textarea label="Tell us about your professional background" id="professionalSummary" value={formData.professionalSummary} onChange={e => handleChange('professionalSummary', e.target.value)} />
           <button onClick={() => onOpenEnhanceModal('professionalSummary', formData.professionalSummary)} className="absolute top-0 right-0 p-2 text-accent/70 hover:text-accent transition-colors" aria-label="Enhance with AI">
             <SparklesIcon className="w-5 h-5" />
          </button>
        </div>
      </Accordion>
      
      <Accordion title="Skills">
        <Input label="Skills (comma-separated)" id="skills" value={formData.skills.join(', ')} onChange={handleSkillsChange} />
      </Accordion>

      <Accordion title="Work Experience">
        <div className="space-y-4">
          {formData.workExperience.map((exp, index) => (
            <div key={exp.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                 <h4 className="font-semibold text-md text-slate-700">Experience #{index + 1}</h4>
                 <button onClick={() => removeExperience(index)} className="text-red-500 hover:text-red-700 transition-colors"><TrashIcon className="w-5 h-5"/></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Job Title" value={exp.jobTitle} onChange={e => handleNestedChange('workExperience', index, 'jobTitle', e.target.value)} />
                <Input label="Company" value={exp.company} onChange={e => handleNestedChange('workExperience', index, 'company', e.target.value)} />
                <Input label="Start Date" value={exp.startDate} onChange={e => handleNestedChange('workExperience', index, 'startDate', e.target.value)} />
                <Input label="End Date" value={exp.endDate} onChange={e => handleNestedChange('workExperience', index, 'endDate', e.target.value)} />
              </div>
              <div className="relative mt-4">
                  <Textarea label="Description & Achievements" value={exp.description} onChange={e => handleNestedChange('workExperience', index, 'description', e.target.value)} />
                   <button onClick={() => onOpenEnhanceModal('workExperience', exp.description, index)} className="absolute top-0 right-0 p-2 text-accent/70 hover:text-accent transition-colors" aria-label="Enhance with AI">
                      <SparklesIcon className="w-5 h-5" />
                   </button>
              </div>
            </div>
          ))}
          <button onClick={addExperience} className="mt-2 flex items-center space-x-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
            <PlusIcon className="w-5 h-5" />
            <span>Add Experience</span>
          </button>
        </div>
      </Accordion>
      
      <Accordion title="Education">
        <div className="space-y-4">
          {formData.education.map((edu, index) => (
            <div key={edu.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <div className="flex justify-between items-center mb-4">
                 <h4 className="font-semibold text-md text-slate-700">Education #{index + 1}</h4>
                 <button onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-700 transition-colors"><TrashIcon className="w-5 h-5"/></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Degree / Certificate" value={edu.degree} onChange={e => handleNestedChange('education', index, 'degree', e.target.value)} />
                <Input label="School / University" value={edu.school} onChange={e => handleNestedChange('education', index, 'school', e.target.value)} />
              </div>
               <Input label="Graduation Date" value={edu.gradDate} onChange={e => handleNestedChange('education', index, 'gradDate', e.target.value)} className="mt-4" />
            </div>
          ))}
          <button onClick={addEducation} className="mt-2 flex items-center space-x-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
            <PlusIcon className="w-5 h-5" />
            <span>Add Education</span>
          </button>
        </div>
      </Accordion>
    </div>
  );
};