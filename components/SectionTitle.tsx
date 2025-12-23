import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, align = 'center' }) => {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 tracking-tight font-display relative inline-block">
        {title}
        {/* Subtle decorative dot */}
        <span className="absolute -top-2 -right-4 w-3 h-3 bg-brand-500 rounded-full"></span>
      </h2>
      
      {subtitle && (
        <p className="text-navy-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      
      {/* Modern Gradient Line */}
      <div className={`h-1.5 w-24 bg-gradient-to-r from-brand-500 to-brand-300 mt-6 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
};