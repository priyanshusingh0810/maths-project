import React from 'react';
import { Binary, CircleDot, Compass, Shuffle, Layers, Activity, ArrowRight, LayoutGrid, BookOpen } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface ModulesDashboardProps {
  setActivePage: (page: string) => void;
  unitFilter: 'all' | 'unit1' | 'unit2';
  setUnitFilter: (unit: 'all' | 'unit1' | 'unit2') => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export const ModulesDashboard: React.FC<ModulesDashboardProps> = ({
  setActivePage,
  unitFilter,
  setUnitFilter,
}) => {
  const stats = [
    { label: 'Syllabus Units', value: '2', detail: 'Unit I & Unit II', color: 'var(--accent-primary)', glow: 'var(--glow-primary)' },
    { label: 'Math Modules', value: '6', detail: 'Fully Functional', color: 'var(--accent-secondary)', glow: 'var(--glow-secondary)' },
    { label: 'Visualizations', value: '6', detail: 'Circles, Planes, Graphs', color: 'var(--accent-emerald)', glow: 'var(--glow-emerald)' },
    { label: 'Solution Steps', value: '∞', detail: 'With KaTeX LaTeX', color: 'var(--accent-amber)', glow: 'var(--glow-amber)' },
  ];

  const unit1Modules = [
    {
      id: 'gcd',
      name: '1. GCD Calculator',
      subtitle: 'Euclidean Algorithm',
      desc: 'Calculate GCD of two numbers and visualize the division process step-by-step.',
      icon: Binary,
      color: 'var(--accent-primary)',
      glow: 'var(--glow-primary)',
    },
    {
      id: 'congruence',
      name: '2. Congruence Calculator',
      subtitle: 'Modular Arithmetic',
      desc: 'Check congruency status, calculate modulo remainders, and inspect a modular number-circle.',
      icon: CircleDot,
      color: 'var(--accent-secondary)',
      glow: 'var(--glow-secondary)',
    },
    {
      id: 'complex',
      name: '3. Complex Number Explorer',
      subtitle: 'Coordinate Geometry & Vectors',
      desc: 'Perform complex arithmetic operations and plot numbers dynamically on the complex plane.',
      icon: Compass,
      color: 'var(--accent-tertiary)',
      glow: 'var(--glow-tertiary)',
    },
  ];

  const unit2Modules = [
    {
      id: 'permutation',
      name: '4. Permutation Calculator',
      subtitle: 'Arrangements (Order Matters)',
      desc: 'Compute nPr values and visualize permutation slot arrangements.',
      icon: Shuffle,
      color: 'var(--accent-emerald)',
      glow: 'var(--glow-emerald)',
    },
    {
      id: 'combination',
      name: '5. Combination Calculator',
      subtitle: 'Selections (Order Irrelevant)',
      desc: 'Compute nCr values and see selection groupings compared against permutations.',
      icon: Layers,
      color: 'var(--accent-cyan)',
      glow: 'var(--glow-cyan)',
    },
    {
      id: 'limit',
      name: '6. Limit Calculator & Visualizer',
      subtitle: 'Calculus Foundations',
      desc: 'Solve left/right/two-sided limits of expressions using SymPy and visualize dynamic coordinates.',
      icon: Activity,
      color: 'var(--accent-amber)',
      glow: 'var(--glow-amber)',
    },
  ];

  const renderModuleCard = (m: typeof unit1Modules[0]) => {
    const IconComponent = m.icon;
    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.02 }}
        key={m.id}
        className="mouse-glow-container glass-card flex flex-col p-6 cursor-pointer group"
        onClick={() => setActivePage(m.id)}
      >
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-[var(--border-default)] group-hover:border-[var(--border-glow)] transition-all duration-300 bg-[var(--bg-secondary)]"
            style={{ boxShadow: `0 0 20px ${m.glow}` }}
          >
            <IconComponent className="w-6 h-6" style={{ color: m.color }} />
          </div>
          <div>
            <h3 className="font-extrabold text-lg leading-tight mb-1 text-[var(--text-primary)]">
              {m.name}
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-faint)] group-hover:text-[var(--text-muted)] transition-colors">
              {m.subtitle}
            </span>
          </div>
        </div>

        <p className="text-sm leading-relaxed flex-1 mb-6 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
          {m.desc}
        </p>

        <div className="mt-auto flex items-center justify-between text-sm font-bold" style={{ color: m.color }}>
          <span>Open Calculator</span>
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300"
            style={{ backgroundColor: m.glow }}
          >
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">

      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-[var(--glow-primary)] border border-[var(--border-glow)]">
          <LayoutGrid className="w-4 h-4 text-[var(--accent-primary)]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)]">
            Modules Dashboard
          </span>
        </div>
        <h1 className="section-heading text-4xl sm:text-5xl mb-4">
          All <span className="gradient-text">Calculators</span>
        </h1>
        <p className="text-base text-[var(--text-muted)]">
          Choose any module to open its interactive calculator, step-by-step solver, and visualizer.
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((s, idx) => (
          <motion.div variants={itemVariants} key={idx} className="glass-card p-6 text-center group">
            <span className="text-xs uppercase tracking-wider font-bold block mb-3 text-[var(--text-faint)]">
              {s.label}
            </span>
            <div 
              className="text-3xl sm:text-4xl font-black mb-1 transition-transform duration-300 group-hover:scale-110"
              style={{ color: s.color, textShadow: `0 0 20px ${s.glow}` }}
            >
              {s.value}
            </div>
            <div className="text-xs font-medium text-[var(--text-muted)]">
              {s.detail}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Tabs */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center"
      >
        <div className="tab-switcher">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUnitFilter('all')}
            className={`tab-item relative ${unitFilter === 'all' ? 'text-white' : ''}`}
          >
            {unitFilter === 'all' && (
              <motion.div layoutId="filter-pill" className="absolute inset-0 bg-[var(--accent-primary)] rounded-lg shadow-[var(--shadow-glow)] -z-10" />
            )}
            <BookOpen className="inline w-4 h-4 mr-2 -mt-0.5" />
            All Modules
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUnitFilter('unit1')}
            className={`tab-item relative ${unitFilter === 'unit1' ? 'text-white' : ''}`}
          >
            {unitFilter === 'unit1' && (
              <motion.div layoutId="filter-pill" className="absolute inset-0 bg-[var(--accent-primary)] rounded-lg shadow-[var(--shadow-glow)] -z-10" />
            )}
            Unit I
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUnitFilter('unit2')}
            className={`tab-item relative ${unitFilter === 'unit2' ? 'text-white' : ''}`}
          >
            {unitFilter === 'unit2' && (
              <motion.div layoutId="filter-pill" className="absolute inset-0 bg-[var(--accent-primary)] rounded-lg shadow-[var(--shadow-glow)] -z-10" />
            )}
            Unit II
          </motion.button>
        </div>
      </motion.div>

      {/* Module Lists */}
      <div className="space-y-20">
        <AnimatePresence mode="popLayout">
          {/* Unit I */}
          {(unitFilter === 'all' || unitFilter === 'unit1') && (
            <motion.div 
              key="unit1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 pb-4 border-b border-[var(--border-default)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white bg-[var(--accent-primary)] shadow-[var(--shadow-glow)]">
                  I
                </div>
                <div>
                  <h2 className="section-heading text-2xl font-bold text-[var(--text-primary)]">
                    Number Theory & Complex Numbers
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] font-medium">
                    GCD · Modular Congruence · Complex Arithmetic
                  </p>
                </div>
              </div>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {unit1Modules.map(renderModuleCard)}
              </motion.div>
            </motion.div>
          )}

          {/* Unit II */}
          {(unitFilter === 'all' || unitFilter === 'unit2') && (
            <motion.div 
              key="unit2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 pb-4 border-b border-[var(--border-default)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white bg-[var(--accent-emerald)] shadow-[0_0_20px_var(--glow-emerald)]">
                  II
                </div>
                <div>
                  <h2 className="section-heading text-2xl font-bold text-[var(--text-primary)]">
                    Combinatorics & Calculus
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] font-medium">
                    Permutations · Combinations · Limits
                  </p>
                </div>
              </div>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {unit2Modules.map(renderModuleCard)}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
