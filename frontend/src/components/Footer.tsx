import React from 'react';
import { Landmark } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-indigo-450 border border-slate-700">
            <Landmark className="w-4 h-4" />
          </div>
          <span className="text-white font-bold tracking-tight">
            Math in Action – Interactive Mathematics Explorer
          </span>
        </div>

        <p className="text-sm text-slate-400">
          A College Internal Assessment Project for the Subject: <strong>Basics of Mathematics in Real Life-IV</strong>
        </p>

        <div className="text-xs space-y-1 text-slate-500 font-mono">
          <p>T.Y.B.Sc. Data Science | SEM-V | Academic Year: 2026–2027</p>
          <p>Smt. Chandibai Himathmal Mansukhani College (Autonomous), Ulhasnagar</p>
        </div>

        <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-600">
          &copy; {new Date().getFullYear()} T.Y.B.Sc. Data Science. All Rights Reserved. Evaluated for internal assessment.
        </div>
      </div>
    </footer>
  );
};
