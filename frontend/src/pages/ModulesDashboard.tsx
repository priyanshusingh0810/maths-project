import React from 'react';
import { Binary, CircleDot, Compass, Shuffle, Layers, Activity, ArrowRight, LayoutGrid, BookOpen } from 'lucide-react';

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
    { label: 'Syllabus Units', value: '2', detail: 'Unit I & Unit II', color: 'var(--accent-primary)' },
    { label: 'Math Modules', value: '6', detail: 'Fully Functional', color: 'var(--accent-secondary)' },
    { label: 'Visualizations', value: '6', detail: 'Circles, Planes, Graphs', color: 'var(--accent-emerald)' },
    { label: 'Solution Steps', value: '∞', detail: 'With KaTeX LaTeX', color: 'var(--accent-amber)' },
  ];

  const unit1Modules = [
    {
      id: 'gcd',
      name: '1. GCD Calculator',
      subtitle: 'Euclidean Algorithm',
      desc: 'Calculate GCD of two numbers and visualize the division process step-by-step.',
      icon: Binary,
      gradient: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
      glow: 'var(--glow-primary)',
      pill: 'neon-pill-indigo',
    },
    {
      id: 'congruence',
      name: '2. Congruence Calculator',
      subtitle: 'Modular Arithmetic',
      desc: 'Check congruency status, calculate modulo remainders, and inspect a modular number-circle.',
      icon: CircleDot,
      gradient: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))',
      glow: 'var(--glow-secondary)',
      pill: 'neon-pill-indigo',
    },
    {
      id: 'complex',
      name: '3. Complex Number Explorer',
      subtitle: 'Coordinate Geometry & Vectors',
      desc: 'Perform complex arithmetic operations and plot numbers dynamically on the complex plane.',
      icon: Compass,
      gradient: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-primary))',
      glow: 'var(--glow-primary)',
      pill: 'neon-pill-indigo',
    },
  ];

  const unit2Modules = [
    {
      id: 'permutation',
      name: '4. Permutation Calculator',
      subtitle: 'Arrangements (Order Matters)',
      desc: 'Compute nPr values and visualize permutation slot arrangements.',
      icon: Shuffle,
      gradient: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))',
      glow: 'var(--glow-emerald)',
      pill: 'neon-pill-indigo',
    },
    {
      id: 'combination',
      name: '5. Combination Calculator',
      subtitle: 'Selections (Order Irrelevant)',
      desc: 'Compute nCr values and see selection groupings compared against permutations.',
      icon: Layers,
      gradient: 'linear-gradient(135deg, var(--accent-tertiary), var(--accent-primary))',
      glow: 'var(--glow-primary)',
      pill: 'neon-pill-indigo',
    },
    {
      id: 'limit',
      name: '6. Limit Calculator & Visualizer',
      subtitle: 'Calculus Foundations',
      desc: 'Solve left/right/two-sided limits of expressions using SymPy and visualize dynamic coordinates.',
      icon: Activity,
      gradient: 'linear-gradient(135deg, var(--accent-amber), var(--accent-tertiary))',
      glow: 'var(--glow-secondary)',
      pill: 'neon-pill-indigo',
    },
  ];

  const renderModuleCard = (m: typeof unit1Modules[0]) => {
    const IconComponent = m.icon;
    return (
      <div
        key={m.id}
        className="glass-card flex flex-col"
        style={{ padding: '24px' }}
      >
        <div className="flex items-start gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center icon-glow shrink-0"
            style={{
              background: m.gradient,
              boxShadow: `0 4px 12px ${m.glow}`,
            }}
          >
            <IconComponent className="w-5 h-5" style={{ color: '#ffffff' }} />
          </div>
          <div>
            <h3
              className="font-bold text-sm leading-tight mb-1"
              style={{ color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}
            >
              {m.name}
            </h3>
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-faint)' }}
            >
              {m.subtitle}
            </span>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed flex-1 mb-5"
          style={{ color: 'var(--text-muted)' }}
        >
          {m.desc}
        </p>

        <button
          onClick={() => setActivePage(m.id)}
          id={`dashboard-btn-${m.id}`}
          className="w-full btn-outline-glow text-sm flex items-center justify-center gap-2 group"
          style={{ padding: '10px', marginTop: 'auto' }}
        >
          Open Calculator
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    );
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">

      {/* Page Header */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 mb-3">
          <LayoutGrid className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: 'var(--accent-primary)' }}
          >
            Modules Dashboard
          </span>
        </div>
        <h1
          className="section-heading text-3xl sm:text-4xl mb-2"
        >
          All <span className="gradient-text-static">Calculators</span>
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Choose any module to open its interactive calculator, step-by-step solver, and visualizer.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up delay-100">
        {stats.map((s, idx) => (
          <div key={idx} className="stat-card">
            <span
              className="text-xs uppercase tracking-wider font-semibold block mb-2"
              style={{ color: 'var(--text-faint)' }}
            >
              {s.label}
            </span>
            <div
              className="text-2xl sm:text-3xl font-black mb-0.5"
              style={{ color: s.color, fontFamily: "'Inter', sans-serif" }}
            >
              {s.value}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {s.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center animate-fade-up delay-200">
        <div className="tab-switcher">
          <button
            onClick={() => setUnitFilter('all')}
            className={`tab-item ${unitFilter === 'all' ? 'active' : ''}`}
            id="filter-all"
          >
            <BookOpen className="inline w-3 h-3 mr-1" />
            All Modules
          </button>
          <button
            onClick={() => setUnitFilter('unit1')}
            className={`tab-item ${unitFilter === 'unit1' ? 'active' : ''}`}
            id="filter-unit1"
          >
            Unit I
          </button>
          <button
            onClick={() => setUnitFilter('unit2')}
            className={`tab-item ${unitFilter === 'unit2' ? 'active' : ''}`}
            id="filter-unit2"
          >
            Unit II
          </button>
        </div>
      </div>

      {/* Module Lists */}
      <div className="space-y-14">

        {/* Unit I */}
        {(unitFilter === 'all' || unitFilter === 'unit1') && (
          <div className="space-y-5 animate-fade-up delay-300">
            <div
              className="flex items-center gap-4 pb-4"
              style={{ borderBottom: '1px solid var(--border-default)' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
                style={{ background: 'var(--accent-primary)' }}
              >
                I
              </div>
              <div>
                <h2 className="section-heading text-lg font-bold">
                  Unit I — Number Theory & Complex Numbers
                </h2>
                <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
                  GCD · Modular Congruence · Complex Arithmetic
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {unit1Modules.map(renderModuleCard)}
            </div>
          </div>
        )}

        {/* Unit II */}
        {(unitFilter === 'all' || unitFilter === 'unit2') && (
          <div className="space-y-5 animate-fade-up delay-400">
            <div
              className="flex items-center gap-4 pb-4"
              style={{ borderBottom: '1px solid var(--border-default)' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
                style={{ background: 'var(--accent-emerald)' }}
              >
                II
              </div>
              <div>
                <h2 className="section-heading text-lg font-bold">
                  Unit II — Combinatorics & Calculus
                </h2>
                <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
                  Permutations · Combinations · Limits
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {unit2Modules.map(renderModuleCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
