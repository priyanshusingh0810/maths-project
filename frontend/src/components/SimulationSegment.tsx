import React from 'react';
import { Activity } from 'lucide-react';

interface SimulationSegmentProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const SimulationSegment: React.FC<SimulationSegmentProps> = ({ 
  title = "Simulation Environment", 
  description,
  children 
}) => {
  return (
    <div className="glass-card flex flex-col overflow-hidden animate-fade-up">
      {/* Simulation Header */}
      <div className="bg-slate-900/50 dark:bg-slate-950/50 border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4 flex items-center gap-3 backdrop-blur-md">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
          <Activity className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">
            {title}
          </h3>
          {description && (
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">
              {description}
            </p>
          )}
        </div>
        <div className="ml-auto flex gap-1.5">
          {/* Decorative Window Controls */}
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700/50"></div>
        </div>
      </div>
      
      {/* Simulation Body */}
      <div className="p-6 relative bg-slate-50/50 dark:bg-[#060913]/60 flex items-center justify-center w-full min-h-[250px]">
        {/* Subtle background grid inside simulation */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(108,99,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Render actual visualizer content */}
        <div className="relative z-10 w-full max-w-full overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
