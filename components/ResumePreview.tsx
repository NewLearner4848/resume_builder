import { forwardRef } from 'react';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { CreativeTemplate } from '../templates/CreativeTemplate';
import { ExecutiveTemplate } from '../templates/ExecutiveTemplate';
import { MinimalistTemplate } from '../templates/MinimalistTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import type { ResumeData, TemplateName } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateName;
  accentColor: string;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, template, accentColor }, ref) => {
    
    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <ModernTemplate data={data} accentColor={accentColor} />;
            case 'executive':
                return <ExecutiveTemplate data={data} accentColor={accentColor} />;
            case 'creative':
                return <CreativeTemplate data={data} accentColor={accentColor} />;
            case 'minimalist':
                return <MinimalistTemplate data={data} accentColor={accentColor} />;
            case 'classic':
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />;
        }
    };

    return (
        <div ref={ref}>
            {renderTemplate()}
        </div>
    )
});