import React from 'react';
import type { ResumeData, TemplateName } from '../types';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ExecutiveTemplate } from '../templates/ExecutiveTemplate';
import { CreativeTemplate } from '../templates/CreativeTemplate';
import { MinimalistTemplate } from '../templates/MinimalistTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateName;
  accentColor: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template, accentColor }) => {
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
