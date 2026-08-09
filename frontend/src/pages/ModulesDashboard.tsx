import React from 'react';
import { Binary, CircleDot, Compass, Shuffle, Layers, Activity, ArrowRight, LayoutGrid, BookOpen, Sparkles } from 'lucide-react';

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
    { label: 'Syllabus Units', value: '2', detail: 'Unit I & Unit II', color: '#6C63FF' },
    { label: 'Math Modules', value: '6', detail: 'Fully Functional', color: '#A855F7' },
    { label: 'Visualizations', value: '6', detail: 'Circles, Planes, Graphs', color: '#10B981' },
    { label: 'Solution Steps', value: '∞', detail: 'With KaTeX LaTeX', color: '#F59E0B' },
  ];

  const unit1Modules = [
    {
      id: 'gcd',
      name: '1. GCD Calculator',
      subtitle: 'Euclidean Algorithm',
      desc: 'Calculate GCD of two numbers and visualize the division process step-by-step.',
      icon: Binary,
      gradient: 'linear-gradient(135deg, #3B82F6, #6C63FF)',
      glow: 'rgba(108,99,255,0.35)',
      pill: 'neon-pill-indigo',
    },
    {
      id: 'congruence',
      name: '2. Congruence Calculator',
      subtitle: 'Modular Arithmetic',
      desc: 'Check congruency status, calculate modulo remainders, and inspect a modular number-circle.',
      icon: CircleDot,
      gradient: 'linear-gradient(135deg, #6C63FF, #A855F7)',
      glow: 'rgba(168,85,247,0.35)',
      pill: 'neon-pill-purple',
    },
    {
      id: 'complex',
      name: '3. Complex Number Explorer',
      subtitle: 'Coordinate Geometry & Vectors',
      desc: 'Perform complex arithmetic operations and plot numbers dynamically on the complex plane.',
      icon: Compass,
      gradient: 'linear-gradient(135deg, #A855F7, #EC4899)',
      glow: 'rgba(236,72,153,0.35)',
      pill: 'neon-pill-rose',
    },
  ];

  const unit2Modules = [
    {
      id: 'permutation',
      name: '4. Permutation Calculator',
      subtitle: 'Arrangements (Order Matters)',
      desc: 'Compute nPr values and visualize permutation slot arrangements.',
      icon: Shuffle,
      gradient: 'linear-gradient(135deg, #14B8A6, #10B981)',
      glow: 'rgba(16,185,129,0.35)',
      pill: 'neon-pill-teal',
    },
    {
      id: 'combination',
      name: '5. Combination Calculator',
      subtitle: 'Selections (Order Irrelevant)',
      desc: 'Compute nCr values and see selection groupings compared against permutations.',
      icon: Layers,
      gradient: 'linear-gradient(135deg, #10B981, #06B6D4)',
      glow: 'rgba(6,182,212,0.35)',
      pill: 'neon-pill-emerald',
    },
    {
      id: 'limit',
      name: '6. Limit Calculator & Visualizer',
      subtitle: 'Calculus Foundations',
      desc: 'Solve left/right/two-sided limits of expressions using SymPy and visualize dynamic coordinates.',
      icon: Activity,
      gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
      glow: 'rgba(239,68,68,0.35)',
      pill: 'neon-pill-amber',
    },
  ];

  const renderModuleCard = (m: typeof unit1Modules[0]) => {
    const IconComponent = m.icon;
    return (
      <div
        key={m.id}
        className="glass-card flex flex-col"
        style={{ padding: '28px' }}
      >
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center icon-glow shrink-0"
            style={{
              background: m.gradient,
              boxShadow: `0 8px 24px ${m.glow}`,
            }}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3
              className="font-bold text-base leading-tight"
              style={{
                color: 'rgba(241,245,249,0.95)',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {m.name}
            </h3>
            <span className={`neon-pill ${m.pill} mt-1 inline-flex text-[10px]`}>
              {m.subtitle}
            </span>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed flex-1 mb-6"
          style={{ color: 'rgba(100,116,139,0.9)' }}
        >
          {m.desc}
        </p>

        <button
          onClick={() => setActivePage(m.id)}
          id={`dashboard-btn-${m.id}`}
          className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 group"
          style={{
            background: 'rgba(108,99,255,0.12)',
            border: '1px solid rgba(108,99,255,0.25)',
            color: '#a5b4fc',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'linear-gradient(135deg, rgba(108,99,255,0.35), rgba(168,85,247,0.2))';
            el.style.borderColor = 'rgba(108,99,255,0.6)';
            el.style.color = 'white';
            el.style.boxShadow = `0 8px 24px ${m.glow}`;
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'rgba(108,99,255,0.12)';
            el.style.borderColor = 'rgba(108,99,255,0.25)';
            el.style.color = '#a5b4fc';
            el.style.boxShadow = 'none';
          }}
        >
          Open Calculator
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    );
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

      {/* Page Header */}
      <div className="text-center space-y-3 animate-fade-up">
        <span className="neon-pill neon-pill-indigo">
          <LayoutGrid className="w-3 h-3" />
          Modules Dashboard
        </span>
        <h1
          className="section-heading text-4xl sm:text-5xl font-black mt-3"
          style={{ color: 'rgba(241,245,249,0.95)' }}
        >
          All <span className="gradient-text-static">Calculators</span>
        </h1>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'rgba(100,116,139,0.9)' }}>
          Choose any module to open its interactive calculator, step-by-step solver, and visualizer.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up delay-100">
        {stats.map((s, idx) => (
          <div key={idx} className="stat-card text-center lg:text-left">
            <span
              className="text-xs uppercase tracking-wider font-bold block mb-2"
              style={{ color: 'rgba(100,116,139,0.7)' }}
            >
              {s.label}
            </span>
            <div
              className="section-heading text-2xl sm:text-3xl font-black"
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div
              className="text-xs mt-1 font-medium"
              style={{ color: 'rgba(100,116,139,0.7)' }}
            >
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
          <div className="space-y-6 animate-fade-up delay-300">
            <div className="flex items-center gap-4">
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(90deg, rgba(108,99,255,0.6), transparent)' }}
              />
              <div className="flex items-center gap-3">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black"
                  style={{
                    background: 'linear-gradient(135deg, #6C63FF, #A855F7)',
                    color: 'white',
                  }}
                >
                  I
                </span>
                <div>
                  <h2
                    className="section-heading text-xl font-extrabold"
                    style={{ color: 'rgba(241,245,249,0.95)' }}
                  >
                    UNIT I — Number Theory & Complex Numbers
                  </h2>
                  <p className="text-xs" style={{ color: 'rgba(100,116,139,0.7)' }}>
                    GCD · Modular Congruence · Complex Arithmetic
                  </p>
                </div>
              </div>
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.3))' }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {unit1Modules.map(renderModuleCard)}
            </div>
          </div>
        )}

        {/* Unit II */}
        {(unitFilter === 'all' || unitFilter === 'unit2') && (
          <div className="space-y-6 animate-fade-up delay-400">
            <div className="flex items-center gap-4">
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(90deg, rgba(16,185,129,0.6), transparent)' }}
              />
              <div className="flex items-center gap-3">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black"
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                    color: 'white',
                  }}
                >
                  II
                </span>
                <div>
                  <h2
                    className="section-heading text-xl font-extrabold"
                    style={{ color: 'rgba(241,245,249,0.95)' }}
                  >
                    UNIT II — Combinatorics & Calculus
                  </h2>
                  <p className="text-xs" style={{ color: 'rgba(100,116,139,0.7)' }}>
                    Permutations · Combinations · Limits
                  </p>
                </div>
              </div>
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3))' }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {unit2Modules.map(renderModuleCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
