import React from 'react';
import { ArrowRight, Binary, CircleDot, Compass, Shuffle, Layers, Activity, CheckCircle } from 'lucide-react';

interface HomeProps {
  setActivePage: (page: string) => void;
  setUnitFilter: (unit: 'all' | 'unit1' | 'unit2') => void;
}

export const Home: React.FC<HomeProps> = ({ setActivePage, setUnitFilter }) => {
  const exploreModule = (moduleId: string) => {
    setActivePage(moduleId);
  };

  const exploreAllModules = () => {
    setUnitFilter('all');
    setActivePage('dashboard');
  };

  const modules = [
    {
      id: 'gcd',
      name: 'GCD Calculator',
      desc: 'Euclidean Algorithm division visualizer with complete step-by-step remainder breakdown.',
      unit: 'Unit I',
      tag: 'Number Theory',
      icon: Binary,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'congruence',
      name: 'Congruence Calculator',
      desc: 'Evaluate a ≡ b (mod m) with interactive remainder circle / clock-dial modular representations.',
      unit: 'Unit I',
      tag: 'Modular Arithmetic',
      icon: CircleDot,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'complex',
      name: 'Complex Number Explorer',
      desc: 'Perform vector additions, arithmetic, and cartesian-polar translations on an interactive complex plane.',
      unit: 'Unit I',
      tag: 'Algebra',
      icon: Compass,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'permutation',
      name: 'Permutation Calculator',
      desc: 'Determine permutations where order matters, displaying step-by-step factorial expansions and slots.',
      unit: 'Unit II',
      tag: 'Combinatorics',
      icon: Shuffle,
      color: 'from-teal-500 to-emerald-500',
    },
    {
      id: 'combination',
      name: 'Combination Calculator',
      desc: 'Calculate combinations where order does not matter, and compare outcomes directly with nPr.',
      unit: 'Unit II',
      tag: 'Combinatorics',
      icon: Layers,
      color: 'from-emerald-500 to-green-500',
    },
    {
      id: 'limit',
      name: 'Limit Calculator',
      desc: 'Compute left/right/two-sided limits using SymPy symbolic mathematics and an animated approaching graph.',
      unit: 'Unit II',
      tag: 'Calculus',
      icon: Activity,
      color: 'from-rose-500 to-orange-500',
    },
  ];

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6 pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          Smt. CHM College (Autonomous) &bull; T.Y.B.Sc. Data Science
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
          Math in Action <br />
          <span className="bg-gradient-to-r from-indigo-650 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Interactive Mathematics Explorer
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Explore mathematical concepts through calculations, step-by-step solutions, interactive visualizations, and real-world applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button
            onClick={exploreAllModules}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Explore Modules
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActivePage('concepts')}
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl font-bold transition-all shadow-sm hover:shadow cursor-pointer"
          >
            Review Concepts
          </button>
        </div>
      </div>

      {/* Six Modules Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Core Modules
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm max-w-xl mx-auto">
            Select one of the topics below to open its calculator, step-by-step solver, and interactive visualizer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((mod) => {
            const IconComponent = mod.icon;
            return (
              <div
                key={mod.id}
                className="bg-white dark:bg-slate-900 border border-slate-250/70 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {mod.unit}
                    </span>
                    <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400">
                      {mod.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 bg-gradient-to-tr ${mod.color} rounded-2xl flex items-center justify-center text-white shadow-md`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                      {mod.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {mod.desc}
                  </p>
                </div>

                <button
                  onClick={() => exploreModule(mod.id)}
                  className="w-full py-3 bg-slate-50 dark:bg-slate-850 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-800 dark:text-slate-200 hover:text-indigo-650 dark:hover:text-indigo-400 rounded-2xl font-bold border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  Explore Module
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why This Application Section */}
      <div className="bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Why This Application?
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm max-w-xl mx-auto">
            Engineered specifically to teach mathematics intuitively by linking mathematical theory to computational workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-905 dark:text-slate-100">Interactive Learning</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Rather than standard calculators, students adjust parameters dynamically and observe immediate updates.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-905 dark:text-slate-100">Step-by-Step Solutions</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Calculators list every algebraic substitution, division, and simplification step to clarify calculations.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-pink-50 dark:bg-pink-950/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-905 dark:text-slate-100">Visual Understanding</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Visualizing functions, modular wheels, complex planes, and combinatoric grids helps build geometric intuition.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-905 dark:text-slate-100">Real-Life Context</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Includes context on how number theory, complex numbers, permutations, and limits are applied in code, cryptography, and science.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-905 dark:text-slate-100">Error-Free Validation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Catches invalid entries like dividing by complex zeros, negative modulus, or non-calculable limit expressions instantly.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-905 dark:text-slate-100">Report-Friendly Displays</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Clean and high-contrast pages styled explicitly to capture sharp, well-aligned screenshots for printed project reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
