import React from 'react';

interface AccentColorPickerProps {
    currentColor: string;
    onSelect: (color: string) => void;
}

const colors = [
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Sky', value: '#0ea5e9' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Slate', value: '#475569' },
];

export const AccentColorPicker: React.FC<AccentColorPickerProps> = ({ currentColor, onSelect }) => {
    return (
        <div className="mt-4">
            <h4 className="text-sm font-semibold text-slate-600 mb-2">Accent Color</h4>
            <div className="flex space-x-3">
                {colors.map(color => (
                    <button
                        key={color.name}
                        onClick={() => onSelect(color.value)}
                        className={`w-7 h-7 rounded-full transition-all focus:outline-none ring-offset-2 ring-offset-white ${currentColor === color.value ? 'ring-2' : ''}`}
                        style={{ backgroundColor: color.value, '--tw-ring-color': color.value }}
                        aria-label={`Select ${color.name} color`}
                    />
                ))}
            </div>
        </div>
    );
};
