import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { enhanceTextSection } from '../services/geminiService';

interface AIEnhanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  onApply: (enhancedText: string) => void;
  sectionTitle: string;
}

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L9.5 8.5L4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5z" />
    </svg>
);

export const AIEnhanceModal: React.FC<AIEnhanceModalProps> = ({ isOpen, onClose, originalText, onApply, sectionTitle }) => {
  const [userGuidance, setUserGuidance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setGeneratedText('');
      setUserGuidance('');
      setError('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    setGeneratedText('');
    toast.loading('AI is generating suggestions...', { id: 'modal-enhancing' });
    try {
      const result = await enhanceTextSection(originalText, userGuidance, sectionTitle);
      setGeneratedText(result);
      toast.success('Suggestion generated!', { id: 'modal-enhancing' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(message);
      toast.error(message, { id: 'modal-enhancing' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleApply = () => {
    onApply(generatedText);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 printable-hidden" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Enhance "{sectionTitle}"</h2>
          <p className="text-sm text-slate-500">Let AI improve your resume section. Provide guidance for better results.</p>
        </header>
        
        <main className="p-4 flex-grow overflow-y-auto">
          <div className="mb-4">
            <label htmlFor="user-guidance" className="block text-sm font-medium text-slate-600 mb-1">
              Guidance for AI (Optional)
            </label>
            <input
              id="user-guidance"
              type="text"
              value={userGuidance}
              onChange={(e) => setUserGuidance(e.target.value)}
              placeholder="e.g., 'Make it more technical' or 'Focus on leadership'"
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
            />
             <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="mt-2 w-full sm:w-auto flex justify-center items-center space-x-2 px-4 py-2 bg-accent text-white rounded-md text-sm font-medium hover:brightness-95 disabled:bg-accent/70 disabled:cursor-not-allowed"
            >
                <SparklesIcon className="w-4 h-4" />
                <span>{isLoading ? 'Generating...' : 'Generate Suggestion'}</span>
             </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="font-semibold text-slate-700 mb-2">Your Original Text</h3>
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3 text-sm text-slate-600 h-64 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                {originalText}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 mb-2">AI Suggestion</h3>
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3 text-sm text-slate-800 h-64 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                {isLoading && <div className="animate-pulse space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-4/6"></div>
                </div>}
                {!isLoading && error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && generatedText}
              </div>
            </div>
          </div>
        </main>

        <footer className="p-4 bg-slate-50 border-t border-slate-200 flex-shrink-0 flex justify-end items-center space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100">
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!generatedText || isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:brightness-95 disabled:bg-accent/70 disabled:cursor-not-allowed"
          >
            Apply Changes
          </button>
        </footer>
      </div>
    </div>
  );
};