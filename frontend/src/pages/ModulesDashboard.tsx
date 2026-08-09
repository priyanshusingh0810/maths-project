import React from 'react';
import { Binary, CircleDot, Compass, Shuffle, Layers, Activity, Eye } from 'lucide-react';

interface ModulesDashboardProps {
  setActivePage: (page: string) => void;
  unitFilter: 'all' | 'unit1' | 'unit2';
  setUnitFilter: (unit: 'all' | 'unit1' | 'unit2') => void;
}

export const ModulesDashboard: React.FC<ModulesDashboardProps> = ({
  setActivePage,
  unitFilter,
  setUnitFilter,
}) => {
  const stats = [
    { label: 'Syllabus Units', value: '2 Units', detail: 'Unit I & Unit II' },
    { label: 'Math Modules', value: '6 Modules', detail: 'Fully Functional' },
    { label: 'Visualizations', value: '6 Interactive', detail: 'Circles, Planes, Graphs' },
    { label: 'Solutions', value: 'Step-by-Step', detail: 'With KaTeX LaTeX' },
  ];

  const unit1Modules = [
    {
      id: 'gcd',
      name: '1. GCD Calculator',
      subtitle: 'Euclidean Algorithm',
      desc: 'Calculate GCD of two numbers and visualize the division process step-by-step.',
      icon: Binary,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50',
    },
    {
      id: 'congruence',
      name: '2. Congruence Calculator',
      subtitle: 'Modular Arithmetic',
      desc: 'Check congruency status, calculate modulo remainders, and inspect a modular number-circle.',
      icon: CircleDot,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/50',
    },
    {
      id: 'complex',
      name: '3. Complex Number Explorer',
      subtitle: 'Coordinate Geometry & Vectors',
      desc: 'Perform complex arithmetic operations and plot numbers dynamically on the complex plane.',
      icon: Compass,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/50',
    },
  ];

  const unit2Modules = [
    {
      id: 'permutation',
      name: '4. Permutation Calculator',
      subtitle: 'Arrangements (Order Matters)',
      desc: 'Compute nPr values and visualize permutation slot arrangements.',
      icon: Shuffle,
      color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-900/50',
    },
    {
      id: 'combination',
      name: '5. Combination Calculator',
      subtitle: 'Selections (Order Irrelevant)',
      desc: 'Compute nCr values and see the clear selection groupings comparison against permutations.',
      icon: Layers,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50',
    },
    {
      id: 'limit',
      name: '6. Limit Calculator & Visualizer',
      subtitle: 'Calculus Foundations',
      desc: 'Solve left/right/two-sided limits of expressions using SymPy and visualize dynamic coordinates.',
      icon: Activity,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50',
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Dashboard Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm text-center lg:text-left space-y-1"
          >
            <span className="text-xs text-slate-500 dark:text-slate-450 uppercase tracking-wider font-semibold">
              {s.label}
            </span>
            <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {s.value}
            </div>
            <div className="text-xs text-slate-655 dark:text-slate-400 font-medium">
              {s.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center border-b border-slate-200 dark:border-slate-800 pb-px">
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setUnitFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              unitFilter === 'all'
                ? 'bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-655 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Modules
          </button>
          <button
            onClick={() => setUnitFilter('unit1')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              unitFilter === 'unit1'
                ? 'bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-655 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Unit I (Number Theory & Complex)
          </button>
          <button
            onClick={() => setUnitFilter('unit2')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              unitFilter === 'unit2'
                ? 'bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-655 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Unit II (Combinatorics & Calculus)
          </button>
        </div>
      </div>

      {/* Modules Lists */}
      <div className="space-y-12">
        {/* Unit I Modules */}
        {(unitFilter === 'all' || unitFilter === 'unit1') && (
          <div className="space-y-6">
            <div className="border-l-4 border-indigo-500 pl-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-850 dark:text-slate-105">
                UNIT I — Number Theory &amp; Complex Numbers
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Mandatory mathematical calculators and explorers mapping to Unit I syllabus concepts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {unit1Modules.map((m) => {
                const IconComponent = m.icon;
                return (
                  <div
                    key={m.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${m.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                          {m.name}
                        </h3>
                        <span className="text-[10px] text-slate-550 dark:text-slate-400 uppercase tracking-widest font-bold">
                          {m.subtitle}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => setActivePage(m.id)}
                      className="mt-6 w-full py-3 bg-indigo-50/50 hover:bg-indigo-500 dark:bg-slate-850 dark:hover:bg-indigo-650 text-indigo-700 dark:text-indigo-400 hover:text-white dark:hover:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      Open Calculator
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Unit II Modules */}
        {(unitFilter === 'all' || unitFilter === 'unit2') && (
          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500 pl-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-850 dark:text-slate-105">
                UNIT II — Combinatorics &amp; Calculus
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Mandatory mathematical calculators and explorers mapping to Unit II syllabus concepts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {unit2Modules.map((m) => {
                const IconComponent = m.icon;
                return (
                  <div
                    key={m.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${m.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                          {m.name}
                        </h3>
                        <span className="text-[10px] text-slate-550 dark:text-slate-400 uppercase tracking-widest font-bold">
                          {m.subtitle}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => setActivePage(m.id)}
                      className="mt-6 w-full py-3 bg-indigo-50/50 hover:bg-indigo-500 dark:bg-slate-850 dark:hover:bg-indigo-650 text-indigo-700 dark:text-indigo-400 hover:text-white dark:hover:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      Open Calculator
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
