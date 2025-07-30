import React, { useCallback, useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { AccentColorPicker } from './components/AccentColorPicker';
import { CoverLetterGenerator } from './components/CoverLetterGenerator';
import { Header } from './components/Header';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { TemplateSelector } from './components/TemplateSelector';
import { INITIAL_RESUME_DATA } from './constants';
import { enhanceResume } from './services/geminiService';
import type { ResumeData, TemplateName } from './types';

const DownloadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

type ActiveTab = 'resume' | 'cover-letter';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.fullName) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load data from local storage", e);
    }
    return INITIAL_RESUME_DATA;
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [template, setTemplate] = useState<TemplateName>('modern');
  const [accentColor, setAccentColor] = useState<string>('#4f46e5');
  const [activeTab, setActiveTab] = useState<ActiveTab>('resume');

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);
  
  useEffect(() => {
    document.body.style.setProperty('--accent-color', accentColor);
  }, [accentColor]);


  const handleFormChange = useCallback((newResumeData: ResumeData) => {
    setResumeData(newResumeData);
  }, []);

  const handleEnhanceResume = useCallback(async () => {
    setIsGenerating(true);
    toast.loading('AI is enhancing your resume...', { id: 'enhancing' });

    try {
      const enhancedData = await enhanceResume(resumeData);
      setResumeData(prevData => ({
        ...prevData,
        professionalSummary: enhancedData.professionalSummary,
        workExperience: prevData.workExperience.map((exp, index) => ({
          ...exp,
          description: enhancedData.workExperience[index]?.description || exp.description,
        })),
      }));
      toast.success('Resume enhanced successfully!', { id: 'enhancing' });
    } catch (error) {
      console.error("Failed to enhance resume:", error);
      const message = error instanceof Error ? error.message : 'Failed to enhance resume. Please try again.';
      toast.error(message, { id: 'enhancing' });
    } finally {
      setIsGenerating(false);
    }
  }, [resumeData]);

  const handlePrint = () => {
    window.print();
  };

  const TabButton: React.FC<{tab: ActiveTab, children: React.ReactNode}> = ({ tab, children }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === tab 
          ? 'bg-accent text-white' 
          : 'text-slate-600 hover:bg-slate-200'
      }`}
    >
      {children}
    </button>
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col h-screen font-sans text-slate-800">
        <Header />
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-4 p-4 overflow-hidden">
          {/* Left Panel: Controls */}
          <div className="lg:col-span-2 xl:col-span-1 bg-white rounded-lg shadow-lg flex flex-col h-full overflow-hidden printable-hidden">
             <div className="p-4 border-b border-slate-200">
                <TemplateSelector current={template} onSelect={setTemplate} />
                <AccentColorPicker currentColor={accentColor} onSelect={setAccentColor} />
             </div>
             <div className="p-4 border-b border-slate-200">
                <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
                    <TabButton tab="resume">Resume Editor</TabButton>
                    <TabButton tab="cover-letter">Cover Letter AI</TabButton>
                </div>
             </div>
             <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
                {activeTab === 'resume' ? (
                  <ResumeForm
                    initialData={resumeData}
                    onFormChange={handleFormChange}
                    onEnhance={handleEnhanceResume}
                    isGenerating={isGenerating}
                    accentColor={accentColor}
                  />
                ) : (
                  <CoverLetterGenerator resumeData={resumeData} accentColor={accentColor} />
                )}
             </div>
          </div>
          
          {/* Right Panel: Preview */}
          <div className="lg:col-span-3 xl:col-span-2 flex flex-col h-full overflow-hidden" id="resume-preview-wrapper">
            <div className="flex-shrink-0 flex justify-between items-center bg-white p-3 rounded-t-lg shadow-md printable-hidden">
              <h2 className="text-xl font-bold text-slate-700">Live Preview</h2>
              <button onClick={handlePrint} className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download as PDF</span>
              </button>
            </div>
            <div className="flex-grow bg-slate-200 p-4 lg:p-8 overflow-y-auto custom-scrollbar resume-preview-content">
                <div className="max-w-[210mm] mx-auto">
                    <ResumePreview data={resumeData} template={template} accentColor={accentColor} />
                </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;