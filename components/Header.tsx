import React from 'react';

const FileTextIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
);

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L9.5 8.5L4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md printable-hidden flex-shrink-0">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <FileTextIcon className="w-8 h-8 text-accent" />
                    <h1 className="text-2xl font-bold text-slate-800">AI Resume Studio</h1>
                </div>
                <div className="flex items-center space-x-2 text-accent">
                    <SparklesIcon className="w-5 h-5" />
                    <span className="font-semibold">Powered by Gemini</span>
                </div>
            </div>
        </header>
    );
};
