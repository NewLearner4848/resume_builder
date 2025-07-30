import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { generateCoverLetter } from '../services/geminiService';
import type { ResumeData } from '../types';

interface CoverLetterGeneratorProps {
    resumeData: ResumeData;
    accentColor: string;
}

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L9.5 8.5L4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5z" />
    </svg>
);

const ClipboardIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a2 2 0 012-2h6a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
    </svg>
);


export const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({ resumeData, accentColor }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [generatedLetter, setGeneratedLetter] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!jobDescription.trim()) {
            toast.error("Please paste a job description first.");
            return;
        }
        setIsGenerating(true);
        setGeneratedLetter('');
        toast.loading('AI is writing your cover letter...', { id: 'cover-letter' });
        try {
            const letter = await generateCoverLetter(resumeData, jobDescription);
            setGeneratedLetter(letter);
            toast.success('Cover letter generated!', { id: 'cover-letter' });
        } catch (error) {
            console.error(error);
            toast.error('Failed to generate cover letter.', { id: 'cover-letter' });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        if (!generatedLetter) return;
        navigator.clipboard.writeText(generatedLetter);
        toast.success("Copied to clipboard!");
    }

    const buttonStyle = {
        backgroundColor: accentColor,
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Cover Letter AI</h3>
                <p className="text-sm text-slate-500 mb-4">Paste a job description below, and the AI will write a tailored cover letter based on your resume.</p>

                <div>
                    <label htmlFor="jobDescription" className="block text-sm font-medium text-slate-600 mb-1">Job Description</label>
                    <textarea
                        id="jobDescription"
                        rows={8}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
                        placeholder="Paste the full job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        disabled={isGenerating}
                    />
                </div>
                 <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    style={buttonStyle}
                    className="w-full mt-4 flex justify-center items-center space-x-3 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-opacity-70 disabled:cursor-not-allowed transition-all"
                >
                    {isGenerating ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <SparklesIcon className="w-5 h-5"/>
                    )}
                    <span>{isGenerating ? 'Generating...' : 'Generate Cover Letter'}</span>
                </button>
            </div>
            
            {(generatedLetter || isGenerating) && (
                 <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Generated Letter</h3>
                        <button onClick={handleCopy} className="flex items-center space-x-2 text-sm text-slate-500 hover:text-accent disabled:opacity-50" disabled={!generatedLetter}>
                            <ClipboardIcon className="w-4 h-4"/>
                            <span>Copy</span>
                        </button>
                    </div>
                    {isGenerating && !generatedLetter && (
                        <div className="space-y-2 animate-pulse">
                            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                            <div className="h-4 bg-slate-200 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                        </div>
                    )}
                    {generatedLetter && (
                         <textarea
                            id="generatedLetter"
                            rows={15}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm bg-slate-50"
                            value={generatedLetter}
                            onChange={(e) => setGeneratedLetter(e.target.value)}
                        />
                    )}
                 </div>
            )}
        </div>
    );
};
