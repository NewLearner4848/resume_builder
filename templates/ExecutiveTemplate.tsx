import React from 'react';
import type { ResumeData } from '../types';

const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C6.477 18 2 13.523 2 8V5a1 1 0 011-1h.001z" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l-1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;

interface TemplateProps {
  data: ResumeData;
  accentColor: string;
}

const renderDescription = (description: string) => {
    return description.split('\n').map((line, index) => {
        if (!line.trim()) return null;
        return <li key={index} className="text-slate-700 mb-1">{line.replace(/^- /, '')}</li>
    });
};

const MainSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
        <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-3">{title}</h2>
        {children}
    </section>
);

const SidebarSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
     <section className="mb-6">
        <h3 className="font-serif text-md md:text-lg font-bold text-[--accent-color] uppercase tracking-wider">{title}</h3>
        <div className="w-1/4 border-b-2 border-[--accent-color] my-2"></div>
        {children}
    </section>
);

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data, accentColor }) => {
  const { fullName, email, phoneNumber, linkedIn, github, website, professionalSummary, skills, workExperience, education } = data;
  
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-lg border border-slate-200 font-sans" style={{ '--accent-color': accentColor } as React.CSSProperties}>
        <header className="p-6 md:p-8 lg:p-10 bg-slate-50 border-b-4 border-[--accent-color] rounded-t-lg">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">{fullName}</h1>
            <h2 className="font-sans text-lg md:text-xl text-slate-600 font-medium mt-1">{workExperience[0]?.jobTitle}</h2>
        </header>
        <div className="flex flex-col md:flex-row">
             {/* Main Content */}
            <main className="w-full md:w-2/3 p-6 md:p-8 lg:p-10">
                <MainSection title="Summary">
                    <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{professionalSummary}</p>
                </MainSection>
                {workExperience && workExperience.length > 0 && (
                <MainSection title="Experience">
                    {workExperience.map(exp => (
                    <div key={exp.id} className="mb-5 last:mb-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <h3 className="text-md md:text-lg font-bold text-slate-800">{exp.jobTitle}</h3>
                        <p className="text-xs sm:text-sm font-medium text-slate-500">{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <h4 className="text-sm md:text-md font-semibold text-slate-600 mb-2">{exp.company}</h4>
                        <ul className="pl-4 text-sm sm:text-base space-y-1 list-disc list-outside">{renderDescription(exp.description)}</ul>
                    </div>
                    ))}
                </MainSection>
                )}
            </main>
             {/* Sidebar */}
            <aside className="w-full md:w-1/3 p-6 md:p-8 lg:p-10 bg-slate-50 border-t-2 md:border-t-0 md:border-l-2 border-slate-200">
                <SidebarSection title="Contact">
                    <div className="space-y-3 text-sm">
                        <a href={`mailto:${email}`} className="flex items-center gap-3 text-slate-800 hover:text-[--accent-color]"><MailIcon/> <span className="break-all">{email}</span></a>
                        <a href={`tel:${phoneNumber}`} className="flex items-center gap-3 text-slate-800 hover:text-[--accent-color]"><PhoneIcon/> <span className="break-all">{phoneNumber}</span></a>
                        {website && <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-800 hover:text-[--accent-color]"><LinkIcon/> <span className="break-all">{website}</span></a>}
                        {linkedIn && <a href={`https://${linkedIn}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-800 hover:text-[--accent-color]"><LinkedInIcon/> <span className="break-all">{linkedIn}</span></a>}
                        {github && <a href={`https://${github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-800 hover:text-[--accent-color]"><GithubIcon/> <span className="break-all">{github}</span></a>}
                    </div>
                </SidebarSection>
                 {skills && skills.length > 0 && (
                    <SidebarSection title="Skills">
                        <ul className="text-sm space-y-1">
                            {skills.map((skill, index) => (
                                <li key={index} className="text-slate-800">{skill}</li>
                            ))}
                        </ul>
                    </SidebarSection>
                )}
                 {education && education.length > 0 && (
                    <SidebarSection title="Education">
                        {education.map(edu => (
                            <div key={edu.id} className="mb-3 last:mb-0 text-sm">
                                <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                                <p className="text-slate-600">{edu.school}</p>
                                <p className="text-slate-500 text-xs">{edu.gradDate}</p>
                            </div>
                        ))}
                    </SidebarSection>
                )}
            </aside>
        </div>
    </div>
  );
};