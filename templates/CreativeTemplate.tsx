import React from 'react';
import type { ResumeData } from '../types';

const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C6.477 18 2 13.523 2 8V5a1 1 0 011-1h.001z" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l-1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>;

interface TemplateProps {
  data: ResumeData;
  accentColor: string;
}

const renderDescription = (description: string) => {
    return description.split('\n').map((line, index) => {
        if (!line.trim()) return null;
        return <li key={index} className="text-slate-600 mb-2">{line.replace(/^- /, '')}</li>
    });
};

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[--accent-color] pb-2 text-center">{title}</h2>
        <div className="mt-4">{children}</div>
    </section>
)

export const CreativeTemplate: React.FC<TemplateProps> = ({ data, accentColor }) => {
  const { fullName, email, phoneNumber, website, professionalSummary, skills, workExperience, education } = data;
  const accentColorLight = `${accentColor}20`;
  
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-lg border border-slate-200 font-sans p-6 md:p-8 lg:p-12" style={{ '--accent-color': accentColor, '--accent-color-light': accentColorLight } as React.CSSProperties}>
        <header className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[--accent-color-light] mx-auto flex items-center justify-center">
                <span className="text-3xl sm:text-4xl font-bold text-[--accent-color]">{fullName.charAt(0)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight mt-4">{fullName}</h1>
            <h2 className="text-md sm:text-lg text-slate-500 font-medium mt-1">{workExperience[0]?.jobTitle}</h2>
            <div className="mt-4 flex justify-center items-center flex-wrap flex-col sm:flex-row gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600">
                <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-[--accent-color]"><MailIcon/> {email}</a>
                <a href={`tel:${phoneNumber}`} className="flex items-center gap-2 hover:text-[--accent-color]"><PhoneIcon/> {phoneNumber}</a>
                {website && <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[--accent-color]"><LinkIcon/> {website}</a>}
            </div>
        </header>
        
        <main>
            <Section title="About Me">
                <p className="text-slate-700 leading-relaxed text-center max-w-2xl mx-auto text-sm sm:text-base">{professionalSummary}</p>
            </Section>

            {skills && skills.length > 0 && (
                <Section title="Skills">
                    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                    {skills.map((skill, index) => (
                        <span key={index} className="bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium px-3 py-2 sm:px-4 rounded-full">{skill}</span>
                    ))}
                    </div>
                </Section>
            )}

            {workExperience && workExperience.length > 0 && (
                <Section title="Experience">
                     <div className="relative border-l-2 border-[--accent-color-light] ml-4 lg:ml-auto lg:mr-auto max-w-2xl">
                        {workExperience.map(exp => (
                            <div key={exp.id} className="mb-8 last:mb-0 pl-8 relative">
                                <div className="absolute -left-[11px] top-1 w-5 h-5 bg-white border-2 border-[--accent-color] rounded-full"></div>
                                <p className="text-xs sm:text-sm font-medium text-slate-500">{exp.startDate} - {exp.endDate}</p>
                                <h3 className="text-md sm:text-lg font-bold text-slate-800 mt-1">{exp.jobTitle}</h3>
                                <h4 className="text-sm sm:text-md font-semibold text-slate-600 mb-2">{exp.company}</h4>
                                <ul className="text-sm space-y-1 list-disc list-outside ml-4">{renderDescription(exp.description)}</ul>
                            </div>
                        ))}
                     </div>
                </Section>
            )}

            {education && education.length > 0 && (
                <Section title="Education">
                    {education.map(edu => (
                        <div key={edu.id} className="text-center mb-2 last:mb-0">
                            <h3 className="text-md sm:text-lg font-bold text-slate-800">{edu.degree}</h3>
                            <p className="text-sm sm:text-md text-slate-600">{edu.school} &middot; {edu.gradDate}</p>
                        </div>
                    ))}
                </Section>
            )}

        </main>
    </div>
  );
};