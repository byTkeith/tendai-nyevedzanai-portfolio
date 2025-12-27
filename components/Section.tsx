
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, className = "" }) => {
  return (
    <section id={id} className={`py-20 px-6 max-w-7xl mx-auto ${className}`}>
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-blue-500 mr-2">#</span>{title}
        </h2>
        <div className="h-[1px] bg-gray-800 flex-grow hidden md:block"></div>
      </div>
      {children}
    </section>
  );
};
