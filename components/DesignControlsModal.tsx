import React from 'react';
import type { TemplateName } from '../types';
import { AccentColorPicker } from './AccentColorPicker';
import { TemplateSelector } from './TemplateSelector';

interface DesignControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplate: TemplateName;
  onSelectTemplate: (template: TemplateName) => void;
  currentColor: string;
  onSelectColor: (color: string) => void;
}

const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const DesignControlsModal: React.FC<DesignControlsModalProps> = ({
  isOpen,
  onClose,
  currentTemplate,
  onSelectTemplate,
  currentColor,
  onSelectColor,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 printable-hidden" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-slate-200 flex-shrink-0 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Customize Design</h2>
          <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-100">
             <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="p-4 sm:p-6 flex-grow overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            <TemplateSelector current={currentTemplate} onSelect={onSelectTemplate} />
            <AccentColorPicker currentColor={currentColor} onSelect={onSelectColor} />
          </div>
        </main>

        <footer className="p-4 bg-slate-50 border-t border-slate-200 flex-shrink-0 flex justify-end items-center space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-white bg-accent rounded-md hover:brightness-95"
          >
            Done
          </button>
        </footer>
      </div>
    </div>
  );
};
