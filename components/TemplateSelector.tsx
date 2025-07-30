import React from 'react';
import type { TemplateName } from '../types';

interface TemplateSelectorProps {
    current: TemplateName;
    onSelect: (template: TemplateName) => void;
}

const templates: { name: TemplateName, label: string }[] = [
    { name: 'modern', label: 'Modern' },
    { name: 'executive', label: 'Executive' },
    { name: 'creative', label: 'Creative' },
    { name: 'classic', label: 'Classic' },
    { name: 'minimalist', label: 'Minimalist' },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ current, onSelect }) => {
    return (
        <div>
            <h4 className="text-sm font-semibold text-slate-600 mb-2">Template</h4>
            <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 custom-scrollbar">
                {templates.map(template => (
                    <button
                        key={template.name}
                        onClick={() => onSelect(template.name)}
                        className={`flex-shrink-0 w-28 border-2 rounded-lg p-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${current === template.name ? 'border-accent ring-2 ring-accent/50' : 'border-slate-300 hover:border-accent'}`}
                        aria-label={`Select ${template.label} template`}
                    >
                        <div className="h-20 bg-slate-100 rounded flex items-center justify-center overflow-hidden">
                           <TemplatePreview name={template.name} />
                        </div>
                        <p className={`mt-2 text-xs font-medium ${current === template.name ? 'text-accent' : 'text-slate-700'}`}>{template.label}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

const TemplatePreview: React.FC<{ name: TemplateName }> = ({ name }) => {
    const commonClasses = "bg-slate-300 rounded-sm";
    const lightClasses = "bg-slate-200 rounded-sm";
    const accentClasses = "bg-accent/50 rounded-sm";
    
    switch (name) {
        case 'modern':
            return (
                <div className="w-11/12 h-16 flex space-x-1">
                    <div className={`${accentClasses} w-1/3 h-full`}></div>
                    <div className="w-2/3 h-full space-y-1">
                        <div className={`${commonClasses} w-full h-2`}></div>
                        <div className={`${commonClasses} w-3/4 h-2`}></div>
                        <div className={`${lightClasses} w-full h-5 mt-2`}></div>
                        <div className={`${lightClasses} w-full h-5`}></div>
                    </div>
                </div>
            );
        case 'executive':
             return (
                <div className="w-11/12 h-16 flex space-x-1">
                    <div className="w-2/3 h-full space-y-1">
                        <div className={`${accentClasses} w-1/2 h-2`}></div>
                        <div className={`${commonClasses} w-3/4 h-1`}></div>
                        <div className={`${lightClasses} w-full h-5 mt-2`}></div>
                        <div className={`${lightClasses} w-full h-5`}></div>
                    </div>
                    <div className="w-1/3 h-full bg-slate-200 rounded-sm"></div>
                </div>
            );
        case 'creative':
            return (
                <div className="w-11/12 h-16 flex flex-col items-center space-y-1">
                    <div className={`${accentClasses} w-5 h-5 rounded-full`}></div>
                    <div className={`${commonClasses} w-1/2 h-2`}></div>
                    <div className={`${commonClasses} w-3/4 h-1`}></div>
                    <div className="w-full h-8 ${lightClasses} mt-1"></div>
                </div>
            )
        case 'minimalist':
            return (
                 <div className="w-11/12 h-16 flex flex-col space-y-1">
                    <div className={`${commonClasses} w-1/2 h-2`}></div>
                    <div className={`${commonClasses} w-3/4 h-1`}></div>
                    <div className={`${accentClasses} w-full h-px my-1`}></div>
                    <div className={`${lightClasses} w-full h-4 mt-1`}></div>
                    <div className={`${lightClasses} w-full h-4`}></div>
                </div>
            )
        case 'classic':
        default:
            return (
                <div className="w-11/12 h-16 flex flex-col space-y-1">
                    <div className={`${commonClasses} w-1/2 h-2 self-center`}></div>
                    <div className={`${commonClasses} w-3/4 h-1 self-center`}></div>
                    <div className={`${accentClasses} w-full h-2 mt-2`}></div>
                    <div className={`${lightClasses} w-full h-8`}></div>
                </div>
            );
    }
}
