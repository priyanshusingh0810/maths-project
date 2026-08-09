import React from 'react';
import { Lightbulb, Cpu, Shield, Globe, TrendingUp, Zap, HelpCircle } from 'lucide-react';

interface ApplicationItem {
  title: string;
  description: string;
}

interface RealLifeApplicationsProps {
  applications: ApplicationItem[];
}

export const RealLifeApplications: React.FC<RealLifeApplicationsProps> = ({ applications }) => {
  // Array of icon components to cycle through
  const icons = [Cpu, Shield, Globe, TrendingUp, Zap, Lightbulb];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b pb-2 border-slate-200 dark:border-slate-800">
        <Lightbulb className="w-5 h-5 text-amber-500 animate-pulse" />
        Where is this used in Real Life?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {applications.map((app, index) => {
          const IconComponent = icons[index % icons.length] || HelpCircle;
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-200 mb-4">
                <IconComponent className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-850 dark:text-slate-100 text-base mb-2">
                {app.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {app.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
