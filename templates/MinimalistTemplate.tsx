import React from 'react';
import type { ResumeData } from '../types';

interface TemplateProps {
  data: ResumeData;
  accentColor: string;
}

const renderDescription = (description: string) => {
    return description.split('\n').map((line, index) => {
        if (!line.trim()) return null;
        return <li key={index} className="text-slate-600 mb-2 leading-relaxed">{line.replace(/^- /, '')}</li>
    });
};

const Section: React.FC<{ title: string; children: React.ReactNode; isFirst?: boolean }> = ({ title, children, isFirst = false }) => (
    <section className={isFirst ? "mt-6" : "mt-8 sm:mt-10"}>
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-500 pb-2 mb-4">{title}</h2>
        {children}
    </section>
);

export const MinimalistTemplate: React.FC<TemplateProps> = ({ data, accentColor }) => {
  const { fullName, email, phoneNumber, linkedIn, github, website, professionalSummary, skills, workExperience, education } = data;
  
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-lg border border-slate-200 font-sans p-6 sm:p-10 lg:p-14" style={{ '--accent-color': accentColor } as React.CSSProperties}>
        <header className="text-left mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">{fullName}</h1>
            <div className="w-16 border-b-2 my-4" style={{ borderColor: accentColor }}></div>
            <div className="mt-4 flex items-center flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 font-medium">
                <a href={`mailto:${email}`} className="hover:text-[--accent-color] break-all">{email}</a>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <a href={`tel:${phoneNumber}`} className="hover:text-[--accent-color]">{phoneNumber}</a>
                <span className="text-slate-300 hidden sm:inline">|</span>
                {linkedIn && <a href={`https://${linkedIn}`} target="_blank" rel="noopener noreferrer" className="hover:text-[--accent-color]">LinkedIn</a>}
                {github && <><span className="text-slate-300 hidden sm:inline">|</span><a href={`https://${github}`} target="_blank" rel="noopener noreferrer" className="hover:text-[--accent-color]">GitHub</a></>}
                {website && <><span className="text-slate-300 hidden sm:inline">|</span><a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="hover:text-[--accent-color]">Website</a></>}
            </div>
        </header>
        
        <main>
            <p className="text-slate-700 leading-relaxed text-md sm:text-lg">{professionalSummary}</p>

            {workExperience && workExperience.length > 0 && (
                <Section title="Experience" isFirst>
                     {workExperience.map(exp => (
                        <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2 mb-6 last:mb-0">
                           <div className="md:col-span-1 text-xs sm:text-sm text-slate-500 font-medium">
                             <p>{exp.startDate} - {exp.endDate}</p>
                           </div>
                           <div className="md:col-span-3">
                                <h3 className="text-md sm:text-lg font-bold text-slate-800">{exp.jobTitle}</h3>
                                <h4 className="text-sm sm:text-md font-semibold text-slate-600 mb-3">{exp.company}</h4>
                                <ul className="text-sm space-y-1 list-disc list-outside ml-4">{renderDescription(exp.description)}</ul>
                           </div>
                        </div>
                    ))}
                </Section>
            )}

            {skills && skills.length > 0 && (
                <Section title="Skills">
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1"></div>
                        <div className="md:col-span-3">
                            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{skills.join(', ')}</p>
                        </div>
                     </div>
                </Section>
            )}

            {education && education.length > 0 && (
                 <Section title="Education">
                     {education.map(edu => (
                        <div key={edu.id} className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1 mb-2 last:mb-0">
                           <div className="md:col-span-1 text-xs sm:text-sm text-slate-500 font-medium">
                                <p>{edu.gradDate}</p>
                           </div>
                           <div className="md:col-span-3">
                                <h3 className="text-md sm:text-lg font-bold text-slate-800">{edu.degree}</h3>
                                <p className="text-sm sm:text-md text-slate-600">{edu.school}</p>
                           </div>
                        </div>
                    ))}
                </Section>
            )}
        </main>
    </div>
  );
};