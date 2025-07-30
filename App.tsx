import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { AIEnhanceModal } from './components/AIEnhanceModal';
import { CoverLetterGenerator } from './components/CoverLetterGenerator';
import { DesignControlsModal } from './components/DesignControlsModal';
import { Header } from './components/Header';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { INITIAL_RESUME_DATA } from './constants';
import type { ResumeData, TemplateName } from './types';

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
);
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
);
const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const ArrowPathIcon: React.FC<{className?: string}> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.18-3.185m-3.181 0l-3.182-3.182m0 0a8.25 8.25 0 00-11.664 0l-3.18 3.185" /></svg>);
const PaintBrushIcon: React.FC<{className?: string}> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.47 2.118v-.084c-.308-.115-.614-.246-.923-.385a.75.75 0 01-.266-1.033 3 3 0 00.01-2.924.75.75 0 01.59-1.256c.242.062.477.14.702.242.226.1.446.208.666.321.442.223.901.433 1.372.626a4.5 4.5 0 002.82-2.315.75.75 0 011.185-.175 3 3 0 004.29-2.585.75.75 0 01.44-.862c.18-.06.368-.112.56-.157.19-.046.383-.086.58-.12.27-.048.544-.088.82-.119.28-.03.565-.052.85-.065.29-.012.58-.016.87-.012a.75.75 0 01.75.75c0 .247-.004.49-.013.73-.008.24-.02.48-.037.718-.017.24-.038.478-.064.71-.027.23-.058.457-.095.68-.036.22-.08.437-.13.65-.05.21-.106.417-.168.62-.06.2-.127.396-.2.587-.07.19-.147.373-.23.55a.75.75 0 01-1.06-.82c.066-.12.134-.237.202-.352.068-.114.135-.227.2-.336.066-.109.13-.216.19-.32.06-.103.118-.204.17-.302.05-.1.097-.197.14-.29.044-.094.085-.185.123-.272.038-.087.073-.17.106-.252.033-.082.063-.16.09-.236.028-.078.053-.153.075-.225.023-.075.043-.147.06-.217.018-.07.034-.137.048-.202a.75.75 0 00-.75-.75c-.255 0-.51.005-.765.014a5.22 5.22 0 00-1.15.116.75.75 0 01-.84-.71c0-.414.336-.75.75-.75.247 0 .493.004.735.012a5.955 5.955 0 011.25.13.75.75 0 01.63.84c-.01.28-.024.558-.043.832-.018.273-.04.545-.067.812-.027.268-.057.532-.09.79-.033.26-.07.514-.11.76-.04.24-.084.476-.132.705-.05.23-.102.454-.16.67-.057.216-.12.427-.186.63-.067.2-.137.395-.21.583-.074.19-.15.37-.23.545a.75.75 0 01-1.055.03c-1.202-.996-2.5-1.74-3.89-2.25.07-.12.134-.24.195-.357a3 3 0 00-5.78-1.128z" /></svg>);
const DocumentTextIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);
const CodeBracketIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 12" />
    </svg>
);


type ActiveTab = 'resume' | 'cover-letter';
type AIEnhanceModalState = { isOpen: boolean; field?: 'professionalSummary' | 'workExperience'; originalText?: string; index?: number; };

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.fullName) return parsed;
      }
    } catch (e) {
      console.error("Failed to load data from local storage", e);
    }
    return INITIAL_RESUME_DATA;
  });

  const [template, setTemplate] = useState<TemplateName>('modern');
  const [accentColor, setAccentColor] = useState<string>('#4f46e5');
  const [activeTab, setActiveTab] = useState<ActiveTab>('resume');
  const [aiModalState, setAiModalState] = useState<AIEnhanceModalState>({ isOpen: false });
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfHtmlContent, setPdfHtmlContent] = useState('');
  const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const downloadButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);
  
  useEffect(() => {
    document.body.style.setProperty('--accent-color', accentColor);
  }, [accentColor]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (downloadButtonRef.current && !downloadButtonRef.current.contains(event.target as Node)) {
            setIsDownloadOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFormChange = useCallback((newResumeData: ResumeData) => setResumeData(newResumeData), []);
  const openEnhanceModal = useCallback((field: 'professionalSummary' | 'workExperience', originalText: string, index?: number) => setAiModalState({ isOpen: true, field, originalText, index }), []);
  const closeEnhanceModal = useCallback(() => setAiModalState({ isOpen: false }), []);

  const handleApplyEnhancement = useCallback((enhancedText: string) => {
    if (!aiModalState.field) return;
    if (aiModalState.field === 'professionalSummary') {
      setResumeData(prev => ({ ...prev, professionalSummary: enhancedText }));
    } else if (aiModalState.field === 'workExperience' && aiModalState.index !== undefined) {
      setResumeData(prev => {
        const newWorkExperience = [...prev.workExperience];
        newWorkExperience[aiModalState.index] = { ...newWorkExperience[aiModalState.index], description: enhancedText };
        return { ...prev, workExperience: newWorkExperience };
      });
    }
    toast.success('Resume updated!');
  }, [aiModalState]);

  const handleDownloadPdf = () => {
    setIsDownloadOpen(false);
    if (!resumePreviewRef.current) {
      toast.error("Preview not available.");
      return;
    }
    const toastId = toast.loading("Preparing PDF preview...");

    try {
        const tailwindConfigScript = `
        tailwind.config = {
          theme: {
            extend: {
              fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Roboto Slab', 'serif'],
              },
              colors: {
                 accent: 'var(--accent-color)'
              }
            },
          },
        }`;

        const resumeHtml = resumePreviewRef.current.innerHTML;

        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${resumeData.fullName}'s Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet">
  <script>${tailwindConfigScript}</script>
  <style>
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      background-color: white;
    }
    @page {
      size: A4;
      margin: 0;
    }
  </style>
</head>
<body style="--accent-color: ${accentColor};">
  ${resumeHtml}
</body>
</html>`;

        setPdfHtmlContent(fullHtml);
        setIsPdfModalOpen(true);
        toast.success("Preview ready!", { id: toastId });
    } catch (error) {
        console.error("Error preparing PDF:", error);
        toast.error("Could not prepare PDF preview.", { id: toastId });
    }
  };
  
  const handleDownloadHtml = () => {
    setIsDownloadOpen(false);
    if (!resumePreviewRef.current) {
      toast.error("Preview not available.");
      return;
    }
    const toastId = toast.loading("Generating .html file...");
    try {
        const tailwindConfigScript = `
        tailwind.config = {
          theme: {
            extend: {
              fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Roboto Slab', 'serif'],
              },
              colors: {
                 accent: 'var(--accent-color)'
              }
            },
          },
        }
      `;

      // Construct a full, self-contained HTML document string
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${resumeData.fullName}'s Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet">
  <script>${tailwindConfigScript}</script>
  <style>
    body { 
      background-color: #f1f5f9; /* bg-slate-100 equivalent */
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 2rem;
      min-height: 100vh;
    }
  </style>
</head>
<body style="--accent-color: ${accentColor};">
  ${resumePreviewRef.current.innerHTML}
</body>
</html>`;

      const blob = new Blob([fullHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Download started!", { id: toastId });
    } catch (error) {
      console.error("Error generating HTML:", error);
      toast.error("Could not generate .html file.", { id: toastId });
    }
  };

  const handleReset = () => {
      if (window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
          setResumeData(INITIAL_RESUME_DATA);
          toast.success("Form has been reset.");
      }
  };

  const TabButton: React.FC<{tab: ActiveTab, children: React.ReactNode}> = ({ tab, children }) => (
    <button onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab ? 'bg-accent text-white' : 'text-slate-600 hover:bg-slate-200'}`}>{children}</button>
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AIEnhanceModal isOpen={aiModalState.isOpen} onClose={closeEnhanceModal} originalText={aiModalState.originalText || ''} onApply={handleApplyEnhancement} sectionTitle={ aiModalState.field === 'professionalSummary' ? 'Professional Summary' : `Work Experience #${(aiModalState.index ?? 0) + 1}` } />
      <DesignControlsModal isOpen={isDesignModalOpen} onClose={() => setIsDesignModalOpen(false)} currentTemplate={template} onSelectTemplate={setTemplate} currentColor={accentColor} onSelectColor={setAccentColor} />
      <PdfPreviewModal isOpen={isPdfModalOpen} onClose={() => setIsPdfModalOpen(false)} htmlContent={pdfHtmlContent} title={`${resumeData.fullName}'s Resume`} />
      
      <div className="flex flex-col h-screen font-sans text-slate-800">
        <Header />
        <main className="flex-grow flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
          {/* Left Panel: Controls */}
          <div className={`${showPreviewOnMobile ? 'hidden' : 'flex'} lg:flex flex-col lg:w-2/5 h-full overflow-hidden`}>
            <div className="bg-white rounded-lg shadow-lg flex flex-col flex-grow h-full overflow-hidden">
              <div className="p-4 border-b border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Controls</h3>
                    <button onClick={handleReset} className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"><ArrowPathIcon className="w-4 h-4" /><span>Reset Form</span></button>
                  </div>
                  <button onClick={() => setIsDesignModalOpen(true)} className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"><PaintBrushIcon className="w-5 h-5 text-accent" /><span>Customize Design</span></button>
              </div>
              <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg"><TabButton tab="resume">Resume Editor</TabButton><TabButton tab="cover-letter">Cover Letter AI</TabButton></div>
              </div>
              <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
                  {activeTab === 'resume' ? <ResumeForm initialData={resumeData} onFormChange={handleFormChange} onOpenEnhanceModal={openEnhanceModal} accentColor={accentColor} /> : <CoverLetterGenerator resumeData={resumeData} accentColor={accentColor} />}
              </div>
            </div>
             <div className="p-4 lg:hidden bg-white rounded-b-lg border-t border-slate-200 flex-shrink-0">
                <button onClick={() => setShowPreviewOnMobile(true)} className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-accent text-white rounded-md shadow-sm text-sm font-medium hover:brightness-95 transition-colors">
                    <EyeIcon className="w-5 h-5" />
                    <span>Preview Resume</span>
                </button>
            </div>
          </div>
          
          {/* Right Panel: Preview */}
          <div className={`${showPreviewOnMobile ? 'flex' : 'hidden'} lg:flex flex-col lg:w-3/5 h-full overflow-hidden`}>
            <div className="flex-shrink-0 flex justify-between items-center bg-white p-3 rounded-t-lg shadow-md">
                <div className="flex items-center space-x-2">
                     <button onClick={() => setShowPreviewOnMobile(false)} className="p-2 rounded-full hover:bg-slate-100 lg:hidden"><ArrowLeftIcon className="w-5 h-5"/></button>
                     <h2 className="text-lg md:text-xl font-bold text-slate-700">Live Preview</h2>
                </div>
                <div className="relative" ref={downloadButtonRef}>
                    <button onClick={() => setIsDownloadOpen(!isDownloadOpen)} className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
                        <span>Download</span>
                        <ChevronDownIcon className="w-4 h-4"/>
                    </button>
                    {isDownloadOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg border border-slate-200 z-10">
                            <button onClick={handleDownloadPdf} className="w-full text-left flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                <DocumentTextIcon className="w-5 h-5 text-red-600"/>
                                <span>Save as PDF</span>
                            </button>
                            <button onClick={handleDownloadHtml} className="w-full text-left flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                <CodeBracketIcon className="w-5 h-5 text-green-600"/>
                                <span>Save as HTML</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-grow bg-slate-200 p-2 sm:p-4 lg:p-8 overflow-y-auto custom-scrollbar">
                <ResumePreview ref={resumePreviewRef} data={resumeData} template={template} accentColor={accentColor} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;